from .. import Resource
from schemas.user_schema import UserSchema
from app_setup import db
from flask_jwt_extended import (
    jwt_required,
    current_user
)

user_schema = UserSchema(session=db.session)

class CurrentUser(Resource):
    @jwt_required()
    def get(self):
        return user_schema.dump(current_user), 200