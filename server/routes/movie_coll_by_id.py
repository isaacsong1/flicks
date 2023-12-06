from . import request,session, Resource
from models.movie_collection import MovieCollection
from schemas.movie_coll_schema import MovieCollectionSchema
from app_setup import db

movie_collection_schema = MovieCollectionSchema(session=db.session)

# Get a collection, Update collection, Delete collection
class MovieCollectionById(Resource):
    def get(self, id):
        if movie_collection := db.session.get(MovieCollection, id):
            return movie_collection_schema.dump(movie_collection), 200
        return {'error': 'Could not find that movie collection'}, 404

    def patch(self, id):
        if movie_collection := db.session.get(MovieCollection, id):
            try:
                # Get user input data
                data = request.json
                # Validate movie collection information
                movie_collection_schema.validate(data)
                # Deserialize data and allow for partial updates
                updated_movie_collection = movie_collection_schema.load(
                    data, instance=movie_collection, partial=True
                )
                db.session.commit()
                # Serialize data and package JSON response
                return movie_collection_schema.dump(updated_movie_collection), 200
            except Exception as e:
                db.session.rollback()
                return {'error': f'MovieCollById Patch error, {str(e)}'}, 400
        return {'error': 'Could not find movie collection'}, 404

    def delete(self, id):
        if movie_collection := db.session.get(MovieCollection, id):
            try:
                db.session.delkete(movie_collection)
                db.session.commit()
                return {'message': f'Movie collection #{id} has been deleted'}, 200
            except Exception as e:
                db.session.rollback()
                return {'error': f'MovieCollById Delete error, {str(e)}'}, 400
        return {'error': 'Could not find movie collection'}, 404