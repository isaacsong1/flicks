from . import request, session, Resource
from models.show_collection import ShowCollection
from schemas.show_coll_schema import ShowCollectionSchema
from app_setup import db

show_collection_schema = ShowCollectionSchema(session=db.session)

# Get a collection, Update collection, Delete collection
class ShowCollectionById(Resource):
    def get(self, id):
        if show_collection := db.session.get(ShowCollection, id):
            return show_collection_schema.dump(show_collection), 200
        return {'error': 'Could not find that show collection'}, 404

    def patch(self, id):
        if show_collection := db.session.get(ShowCollection, id):
            try:
                # Get user input data
                data = request.json
                # Validate show collection information
                show_collection_schema.validate(data)
                # Deserialize data and allow for partial updates
                updated_show_collection = show_collection_schema.load(
                    data, instance=show_collection, partial=True
                )
                db.session.commit()
                # Serialize data and package JSON response
                return show_collection_schema.dump(updated_show_collection), 200
            except Exception as e:
                db.session.rollback()
                return {'error': f'ShowCollById Patch error, {str(e)}'}, 400
        return {'error': 'Could not find show collection'}, 404

    def delete(self, id):
        if show_collection := db.session.get(ShowCollection, id):
            try:
                db.session.delete(show_collection)
                db.session.commit()
                return {'message': f'Show collection #{id} has been deleted'}, 200
            except Exception as e:
                db.session.rollback()
                return {'error': f'ShowCollById Delete error, {str(e)}'}, 400
        return {'error': 'Could not find show collection'}, 404