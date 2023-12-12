from . import request, session, Resource
from sqlalchemy.sql import and_, or_
from models.show_collection import ShowCollection
from schemas.show_coll_schema import ShowCollectionSchema
from app_setup import db

show_collection_schema = ShowCollectionSchema(many=True, session=db.session)

# Get a collection, Update collection, Delete collection
class ShowCollectionByName(Resource):
    def get(self, id, name):
        if show_collection := ShowCollection.query.filter(and_(ShowCollection.user_id == id, ShowCollection.name == name)):
            return show_collection_schema.dump(show_collection), 200
        return {'error': 'Could not find that show collection with that name'}, 404

    def patch(self, id, name):
        if show_collection := ShowCollection.query.filter(and_(ShowCollection.user_id == id, ShowCollection.name == name)):
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
                return {'error': f'ShowCollByName Patch error, {str(e)}'}, 400
        return {'error': 'Could not find show collection with that name'}, 404

    def delete(self, name):
        if show_collection := ShowCollection.query.filter(and_(ShowCollection.user_id == id, ShowCollection.name == name)):
            try:
                db.session.delete(show_collection)
                db.session.commit()
                return {'message': f'Show collection #{name} has been deleted'}, 200
            except Exception as e:
                db.session.rollback()
                return {'error': f'ShowCollByName Delete error, {str(e)}'}, 400
        return {'error': 'Could not find show collection with that name'}, 404