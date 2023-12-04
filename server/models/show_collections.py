from sqlalchemy.orm import validates
from app_setup import db
from sqlalchemy.ext.hybrid import hybrid_property
from app_setup import bcrypt
from sqlalchemy.ext.associationproxy import association_proxy

class ShowCollection(db.model):
    __tablename__ = 'show_collections'

    # Columns for show_collections Table


    # Relationships

    
    # Associations


    # Validations


    # Password hashing


    # repr
    def __repr__(self):
        return f'<ShowCollection #{self.id} >'