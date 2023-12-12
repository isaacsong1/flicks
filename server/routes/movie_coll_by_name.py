from . import request, session, Resource
from sqlalchemy.sql import and_, or_
from models.movie_collection import MovieCollection
from schemas.movie_coll_schema import MovieCollectionSchema
from app_setup import db

movie_collection_schema = MovieCollectionSchema(many=True, session=db.session)

# Get a collection, Update collection, Delete collection
class MovieCollectionByName(Resource):
    def get(self, id, name):
        if movie_collection := MovieCollection.query.filter(and_(MovieCollection.user_id == id, MovieCollection.name == name)):
            return movie_collection_schema.dump(movie_collection), 200
        
    def patch(self, id, name):
        if movie_collection := MovieCollection.query.filter(and_(MovieCollection.user_id == id, MovieCollection.name == name)):
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
                return {'error': f'MovieCollByName Patch error, {str(e)}'}, 400
        return {'error': 'Could not find movie collection with that name'}, 404

    def delete(self, name):
        if movie_collection := MovieCollection.query.filter(and_(MovieCollection.user_id == id, MovieCollection.name == name)):
            try:
                db.session.delete(movie_collection)
                db.session.commit()
                return {'message': f'Movie collection {name} has been deleted'}, 200
            except Exception as e:
                db.session.rollback()
                return {'error': f'MovieCollByName Delete error, {str(e)}'}, 400
        return {'error': 'Could not find movie collection with that name'}, 404