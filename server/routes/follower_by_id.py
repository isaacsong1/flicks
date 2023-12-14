from . import session, Resource
from models.follower import Follower
from schemas.follower_schema import FollowerSchema
from sqlalchemy.sql import and_, or_
from app_setup import db

followers_schema = FollowerSchema(session=db.session)

# Get all followers
class FollowerById(Resource):
    def post(self, user_id, following_id):
        try:
            data = {
                "follower_id": user_id,
                "following_id": following_id
            }
            followers_schema.validate(data)
            new_following = followers_schema.load(data)
            db.session.add(new_following)
            db.session.commit()
            serialized_following = followers_schema.dump(new_following)
            return serialized_following, 201
        except Exception as e:
            db.session.rollback()
            return {'error': 'User could not be followed'}

    def delete(self, user_id, following_id):
        if unfollow := Follower.query.filter(and_(Follower.follower_id == user_id, Follower.following_id == following_id)).first():
            try: 
                import ipdb; ipdb.set_trace()
                db.session.delete(unfollow)
                db.session.commit()
                return {'message': f'User {following_id} has been unfollowed'}
            except Exception as e:
                db.session.rollback()
                return {'error': 'User could not be unfollowed'}
        return {'error': 'Could not find the user you are following'}