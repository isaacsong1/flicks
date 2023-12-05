from sqlalchemy.orm import validates
from app_setup import db
from sqlalchemy.ext.hybrid import hybrid_property
from app_setup import bcrypt
from sqlalchemy.ext.associationproxy import association_proxy

class Movie(db.model):
    __tablename__ = 'movies'

    # Columns for movies Table
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    rating = db.Column(db.String)
    duration = db.Column(db.String)
    director = db.Column(db.String)
    genres = db.Column(db.String)
    summary = db.Column(db.String)

    # Relationships
    movie_collections = db.relationship('MovieCollection', back_populates='movie', cascade='all, delete-orphan')
    
    # Associations
    users = association_proxy('movie_collections', 'user')

    # Validations


    # repr
    def __repr__(self):
        return f'<Movie #{self.id} {self.title} >'