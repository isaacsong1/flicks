from marshmallow import fields, validate, validates, ValidationError
from models.follower import Follower
from app_setup import ma
from schemas.user_schema import UserSchema

class FollowerSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Follower
        load_instance = True
        fields = ['follower_id', 'following_id', 'follower.username', 'following.username']

    # user = fields.Nested(UserSchema)