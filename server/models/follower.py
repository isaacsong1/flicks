from sqlalchemy.orm import validates
from app_setup import db
from models.user import User

class Follower(db.Model):
    __tablename__ = 'followers'

    # Columns for followers Table
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    following_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)

    # Relationships
    follower = db.relationship('User', back_populates='followers', foreign_keys=[follower_id])
    following = db.relationship('User', back_populates='followings', foreign_keys=[following_id])
    
    # Validations
    @validates('follower_id')
    def validate_followerid(self, _, value):
        if value and db.session.get(User, value):
            return value
        else:
            raise ValueError('User ID must be from a valid user')
        
    @validates('following_id')
    def validate_followingid(self, _, value):
        if value and db.session.get(User, value):
            return value
        else:
            raise ValueError('User ID must be from a valid user')

    # repr
    def __repr__(self):
        return f'<Follower #{self.follower_id} Following #{self.following_id} >'