from .. import request, session, Resource, make_response
from models.user import User
from schemas.user_schema import UserSchema
from app_setup import db
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    set_access_cookies,
    set_refresh_cookies,
)

user_schema = UserSchema(session=db.session)

class Login(Resource):
    def post(self):
        try:
            # Get email and password
            data = request.json
            # Query db by user email
            user = User.query.filter_by(email=data.get("email")).first()
            # If user exists and authenticate
            if user and user.authenticate(data.get("password")):
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
            return {'error': 'Invalid Credentials'}, 403
        except Exception as e:
            return {'error': "Invalid Credentials"}, 403