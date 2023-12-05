from sqlalchemy.orm import validates
from app_setup import db
from sqlalchemy.ext.hybrid import hybrid_property
from app_setup import bcrypt
from sqlalchemy.ext.associationproxy import association_proxy

class Movie(db.Model):
    __tablename__ = 'movies'

    # Columns for movies Table
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    image = db.Column(db.String)
    rating = db.Column(db.String)
    director = db.Column(db.String)
    genres = db.Column(db.String)
    summary = db.Column(db.String)

    # Relationships
    movie_collections = db.relationship('MovieCollection', back_populates='movie', cascade='all, delete-orphan')
    
    # Associations
    users = association_proxy('movie_collections', 'user')

    # Validations
    @validates('title', 'image')
    def validate_title(self, key, value):
        if not isinstance(value, str):
            if key == 'title':
                raise TypeError(f'Title must be a string')
            else:
                raise TypeError(f'Image must be a string')
        return value
    
    @validates('rating')
    def validate_rating(self, _, value):
        if not isinstance(value, float):
            raise TypeError(f'Rating must be a float')
        return value

    # repr
    def __repr__(self):
        return f'<Movie #{self.id} {self.title} >'