from . import session, Resource
from models.movie import Movie
from schemas.movie_schema import MovieSchema
from app_setup import db

movie_schema = MovieSchema(session=db.session)

# Get one movie
class MovieById(Resource):
    def get(self, id):
        if movie := db.session.get(Movie, id):
            # movie_schema = MovieSchema()
            return movie_schema.dump(movie), 200
        return {'error': 'Could not find that movie'}, 404