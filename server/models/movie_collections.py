from sqlalchemy.orm import validates
from app_setup import db
from sqlalchemy.ext.hybrid import hybrid_property
from app_setup import bcrypt
from sqlalchemy.ext.associationproxy import association_proxy

class MovieCollection(db.Model):
    __tablename__ = 'movie_collections'

    # Columns for movie_collections Table
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'))

    # Relationships
    user = db.relationship('User', back_populates='movie_collections')
    movie = db.relationship('Movie', back_populates='movie_collections')

    # Validations


    # repr
    def __repr__(self):
        return f'<MovieCollection #{self.id} >'