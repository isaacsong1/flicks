from . import request, session, Resource
from models.movie_collection import MovieCollection
from schemas.movie_coll_schema import MovieCollectionSchema
from app_setup import db

movie_collection_schema = MovieCollectionSchema(session=db.session)
movie_collections_schema = MovieCollectionSchema(many=True, session=db.session)

# Get all collections, Post new collection
class MovieCollections(Resource):
    def get(self):
        movie_collections = movie_collections_schema.dump(MovieCollection.query)
        return movie_collections, 200

    def post(self):
        try:
            # Get user input data
            data = request.json
            # Validate show collection information
            movie_collection_schema.validate(data)
            # Create new collection (deserialize)
            new_movie_collection = movie_collection_schema.load(data)
            db.session.add(new_movie_collection)
            db.session.commit()
            # Serialize new movie collection
            serialized_movie_collection = movie_collection_schema.dump(new_movie_collection)
            return serialized_movie_collection, 201
        except Exception as e:
            db.session.delete(new_movie_collection)
            db.session.commit()
            return {'error': f'MovieColls post error, {str(e)}'}, 400