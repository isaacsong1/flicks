from sqlalchemy.orm import validates
from app_setup import db
from sqlalchemy.ext.hybrid import hybrid_property
from app_setup import bcrypt
from sqlalchemy.ext.associationproxy import association_proxy

class Followers(db.model):
    __tablename__ = 'followers'

    # Columns for followers Table
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    following_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)

    # Relationships
    follower = db.relationship('User', back_populates='followers', foreign_keys=[follower_id])
    following = db.relationship('User', back_populates='followings', foreign_keys=[following_id])
    
    # Validations


    # repr
    def __repr__(self):
        return f'<Follower #{self.id} >'