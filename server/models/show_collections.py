from sqlalchemy.orm import validates
from app_setup import db
from sqlalchemy.ext.hybrid import hybrid_property
from app_setup import bcrypt
from sqlalchemy.ext.associationproxy import association_proxy

class ShowCollection(db.model):
    __tablename__ = 'show_collections'

    # Columns for show_collections Table
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, required=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    show_id = db.Column(db.Integer, db.ForeignKey('shows.id'))

    # Relationships

    
    # Associations


    # Validations


    # Password hashing


    # repr
    def __repr__(self):
        return f'<ShowCollection #{self.id} >'