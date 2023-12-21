from .. import request, session, Resource, make_response
from flask import jsonify
from models.user import User
from models.movie_collection import MovieCollection
from models.show_collection import ShowCollection
from schemas.user_schema import UserSchema
from schemas.movie_coll_schema import MovieCollectionSchema
from schemas.show_coll_schema import ShowCollectionSchema
from app_setup import db
from google.auth.transport import requests
from google.oauth2 import id_token
import secrets
import time
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    set_access_cookies,
    set_refresh_cookies,
)
import os

user_schema = UserSchema(session=db.session)
movie_collection_schema = MovieCollectionSchema(session=db.session)
show_collection_schema = ShowCollectionSchema(session=db.session)

def generate_password(length):
    # Generate random password using secrets
    password = secrets.token_hex(length // 2)
    return password[:length]

CLIENT_ID = os.environ.get('G_CLIENT_ID')

class GoogleAuth(Resource):
    def post(self):
        try:
            # Get user data
            data = request.json
            token = data.get('id_token')
            if not id_token:
                return {'error': 'ID Token is missing'}, 400
            # Verify token and get information
            id_info = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID, clock_skew_in_seconds=1)
            # See if user information exists
            user = User.query.filter(User.email == id_info.get('email')).first()
            if user:
                try:
                    jwt = create_access_token(identity=user.id)
                    # Manually set refresh token
                    refresh_token = create_refresh_token(identity=user.id)
                    # Serialize the user
                    serialized_user = user_schema.dump(user)
                    # Prepackage the response
                    response = make_response(serialized_user, 200)
                    # Set both cookies on the response - will be sent along with every request until unset
                    set_access_cookies(response, jwt)
                    set_refresh_cookies(response, refresh_token)
                    return response
                except Exception as e:
                    return {'error': 'Invalid credentials'}, 401
            else:
                try:
                    # Get user input data
                    data = {
                        "username": id_info.get('given_name', ''), 
                        'email': id_info.get('email')
                    }
                    # Validate user information
                    user_schema.validate(data)
                    # Create new user schema
                    new_user = user_schema.load(data)
                    # Hash password
                    new_user.password_hash = generate_password(12)
                    db.session.add(new_user)
                    db.session.commit()
                    # Start JWT
                    jwt = create_access_token(identity=new_user.id)
                    # Manually set refresh token
                    refresh_token = create_refresh_token(identity=new_user.id)
                    # Serialize the user
                    serialized_user = user_schema.dump(new_user)
                    # Prepackage the response
                    response = make_response(serialized_user, 201)
                    # Set both cookies on the response - will be sent with every request until unset
                    set_access_cookies(response, jwt)
                    set_refresh_cookies(response, refresh_token)
                    return response
                except Exception as e:
                    db.session.rollback()
                    return {'error': str(e)}, 400
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 405