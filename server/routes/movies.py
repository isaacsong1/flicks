from . import session, Resource
from models.movie import Movie
from schemas.movie_schema import MovieSchema
from app_setup import db

movies_schema = MovieSchema(many=True, session=db.session)

# Get all movies 
class Movies(Resource):
    def get(self):
        movies = movies_schema.dump(Movie.query)
        return movies, 200