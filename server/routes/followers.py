from . import session, Resource
from models.follower import Follower
from schemas.follower_schema import FollowerSchema
from app_setup import db

followers_schema = FollowerSchema(many=True, session=db.session)

# Get all followers
class Followers(Resource):
    def get(self):
        followers = followers_schema.dump(Follower.query)
        return followers, 200