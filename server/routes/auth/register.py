from .. import request, session, Resource
from flask import jsonify
from models.user import User
from models.movie_collection import MovieCollection
from models.show_collection import ShowCollection
from schemas.user_schema import UserSchema
from schemas.movie_coll_schema import MovieCollectionSchema
from schemas.show_coll_schema import ShowCollectionSchema
from app_setup import db
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    set_access_cookies,
    set_refresh_cookies,
)

user_schema = UserSchema(session=db.session)
movie_collection_schema = MovieCollectionSchema(session=db.session)
show_collection_schema = ShowCollectionSchema(session=db.session)

class Register(Resource):
    def post(self):
        try:
            # Get user input data
            data = {
                "username": request.json.get('username'), 
                'email': request.json.get('email')
            }
            # Validate user information
            user_schema.validate(data)
            # Create new user schema
            new_user = user_schema.load(data)
            # Hash password
            new_user.password_hash = request.json.get('password')
            db.session.add(new_user)
            db.session.commit()
            # Create 'main' collection for movies and shows
            if new_user.id:
                main_mc = MovieCollection(name='main', user_id=new_user.id)
                main_sc = ShowCollection(name='main', user_id=new_user.id)
                db.session.add_all([main_mc, main_sc])
            db.session.commit()
            # Start JWT
            jwt = create_access_token(identity=new_user.id)
            # Manually set refresh token
            refresh_token = create_refresh_token(identity=new_user.id)
            # Serialize the user
            serialized_user = user_schema.dump(new_user)
            # Prepackage the response
            response = jsonify(serialized_user, 201)
            # Set both cookies on the response - will be sent with every request until unset
            set_access_cookies(response, jwt)
            set_refresh_cookies(response, refresh_token)
            return response
            # Add user id to cookies
            # session['user_id'] = new_user.id
            # serialized_user = user_schema.dump(new_user)
            # return serialized_user, 201
        except Exception as e:
            # db.session.delete(new_user)
            db.session.rollback()
            db.session.commit()
            return {'error': str(e)}, 400
