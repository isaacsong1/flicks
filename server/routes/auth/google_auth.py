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

CLIENT_ID = os.environ.get('G_CLIENT_ID')

class GoogleAuth(Resource):
    def post(self):
        try:
            # import ipdb; ipdb.set_trace()
            # Get user data
            data = request.json
            token = data.get('id_token')
            if not id_token:
                return {'error': 'ID Token is missing'}, 400

        except Exception as e:
            db.session.rollback()
            db.session.commit()
            return {'error': str(e)}, 400