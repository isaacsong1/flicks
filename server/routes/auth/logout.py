from .. import session, Resource
from models.user import User
from app_setup import db

class Logout(Resource):
    def delete(self):
        # If there is a user in session
        if session.get("user_id"):
            # Remove user in session
            del session["user_id"]
            return {}, 204
        return {'error': "Unauthorized"}, 401