from . import request, session, Resource
from models.show_collection import ShowCollection
from schemas.show_coll_schema import ShowCollectionSchema
from app_setup import db

show_collection_schema = ShowCollectionSchema(many=True, session=db.session)

# Get a collection, Update collection, Delete collection
class ShowCollectionByUser(Resource):
    def get(self, id):
        if show_collection := ShowCollection.query.filter(ShowCollection.user_id == id):
            return show_collection_schema.dump(show_collection), 200
        return {'error': 'Could not find that show collection for that user'}, 404
