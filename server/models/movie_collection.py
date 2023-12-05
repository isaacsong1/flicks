from sqlalchemy.orm import validates
from app_setup import db
from models.user import User
from models.movie import Movie

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
    @validates('name')
    def validate_name(self, _, value):
        if not isinstance(value, str):
            raise TypeError(f'Name of movie collection must be a string')
        elif len(value) < 3 or len(value) > 20:
            raise ValueError(f'Name of movie collection must be between 3 and 20 characters')
        return value

    @validates('user_id')
    def validate_userid(self, _, value):
        if value and db.session.get(User, value):
            return value
        else:
            raise ValueError('User ID must be from a valid user')
    
    @validates('movie_id')
    def validate_movieid(self, _, value):
        if value and db.session.get(Movie, value):
            return value
        else:
            raise ValueError('Movie ID must be from a valid movie')

    # repr
    def __repr__(self):
        return f'<MovieCollection #{self.id} >'