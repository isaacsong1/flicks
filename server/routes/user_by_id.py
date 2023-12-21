from . import request, Resource, make_response
from models.user import User
from schemas.user_schema import UserSchema
from app_setup import db
from flask_jwt_extended import (
    unset_access_cookies,
    unset_refresh_cookies,
)


user_schema = UserSchema(session=db.session)

# View Profile / Edit Profile / Delete Profile
class UserById(Resource):
    def get(self, id):
        if id and (user := db.session.get(User, id)):
            return user_schema.dump(user), 200
        return {'error': 'Could not find that user'}, 404

    def patch(self, id):
        if user := db.session.get(User, id):
            try:
                data = request.json
                # Validate data
                user_schema.validate(data)
                # Deserialize data and allow for partial updates
                updated_user = user_schema.load(data, instance=user, partial=True)
                db.session.commit()
                # Serialize the data and package your JSON response
                return user_schema.dump(updated_user), 200
            except Exception as e:
                db.session.rollback()
                return {'error': str(e)}, 400
        return {'error': 'User not found'}, 404

    def delete(self, id):
        if user := db.session.get(User, id):
            try:
                db.session.delete(user)
                db.session.commit()
                response = make_response({}, 204)
                unset_access_cookies(response)
                unset_refresh_cookies(response)
                return {'message': f'User {id} has been deleted'}, 200
            except Exception as e:
                db.session.rollback()
                return {'error': str(e)}, 400
        return {'error': 'Could not find user'}, 404