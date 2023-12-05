from sqlalchemy.orm import validates
from app_setup import db
from sqlalchemy.ext.hybrid import hybrid_property
from app_setup import bcrypt
from sqlalchemy.ext.associationproxy import association_proxy

class MovieCollection(db.model):
    __tablename__ = 'movie_collections'

    # Columns for movie_collections Table
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, required=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'))

    # Relationships

    
    # Associations


    # Validations


    # Password hashing


    # repr
    def __repr__(self):
        return f'<MovieCollection #{self.id} >'