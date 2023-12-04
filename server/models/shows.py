from sqlalchemy.orm import validates
from app_setup import db
from sqlalchemy.ext.hybrid import hybrid_property
from app_setup import bcrypt
from sqlalchemy.ext.associationproxy import association_proxy

class Show(db.model):
    __tablename__ = 'shows'

    # Columns for shows Table


    # Relationships

    
    # Associations


    # Validations


    # Password hashing


    # repr
    def __repr__(self):
        return f'<Show #{self.id} {self.title} >'