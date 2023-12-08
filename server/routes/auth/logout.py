from .. import session, Resource, make_response
from models.user import User
from app_setup import db
from flask_jwt_extended import (
    unset_access_cookies,
    unset_refresh_cookies,
)

class Logout(Resource):
    def delete(self):
        # If there is a user in session
        # if session.get("user_id"):
        #     # Remove user in session
        #     del session["user_id"]
        #     return {}, 204
        response = make_response({}, 204)
        unset_access_cookies(response)
        unset_refresh_cookies(response)
        return response