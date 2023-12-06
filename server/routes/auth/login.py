from .. import request, session, Resource
from models.user import User
from schemas.user_schema import UserSchema
from app_setup import db

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
                session['user_id'] = user.id
                return user_schema.dump(user), 200
            return {'error': 'Invalid Credentials'}, 403
        except Exception as e:
            return {'error': "Invalid Credentials"}, 403