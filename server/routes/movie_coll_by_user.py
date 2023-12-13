from . import request, session, Resource
from sqlalchemy.sql import and_, or_
from models.movie_collection import MovieCollection
from schemas.movie_coll_schema import MovieCollectionSchema
from app_setup import db

movie_collection_schema = MovieCollectionSchema(many=True, session=db.session)

# Get a collection, Update collection, Delete collection
class MovieCollectionByUser(Resource):
    def get(self, id):
        if movie_collection := MovieCollection.query.filter(MovieCollection.user_id == id):
            return movie_collection_schema.dump(movie_collection), 200
