from . import request, Resource
from models.show_collection import ShowCollection
from schemas.show_coll_schema import ShowCollectionSchema
from app_setup import db

show_collection_schema = ShowCollectionSchema(session=db.session)
show_collections_schema = ShowCollectionSchema(many=True, session=db.session)

# Get all collections, Post new collection
class ShowCollections(Resource):
    def get(self):
        show_collections = show_collections_schema.dump(ShowCollection.query)
        return show_collections, 200

    def post(self):
        try:
            # Get user input data
            data = request.json
            # Validate show collection information
            show_collection_schema.validate(data)
            # Create new collection (deserialize)
            new_show_collection = show_collection_schema.load(data)
            db.session.add(new_show_collection)
            db.session.commit()
            # Serialize new show collection
            serialized_show_collection = show_collection_schema.dump(new_show_collection)
            return serialized_show_collection, 201
        except Exception as e:
            db.session.delete(new_show_collection)
            db.session.commit()
            return {'error': f'ShowColls post error, {str(e)}'}, 400