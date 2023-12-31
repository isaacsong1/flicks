from . import session, Resource
from models.user import User
from schemas.user_schema import UserSchema
from app_setup import db

users_schema = UserSchema(many=True, session=db.session)

# Get all users
class Users(Resource):
    def get(self):
        users = users_schema.dump(User.query)
        return users, 200