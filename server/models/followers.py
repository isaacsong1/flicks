from sqlalchemy.orm import validates
from app_setup import db
from sqlalchemy.ext.hybrid import hybrid_property
from app_setup import bcrypt
from sqlalchemy.ext.associationproxy import association_proxy

class Followers(db.model):
    __tablename__ = 'followers'

    # Columns for followers Table


    # Relationships

    
    # Associations


    # Validations


    # Password hashing


    # repr
    def __repr__(self):
        return f'<Follower #{self.id} >'