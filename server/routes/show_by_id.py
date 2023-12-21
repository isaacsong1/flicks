from . import session, Resource
from models.show import Show
from schemas.show_schema import ShowSchema
from app_setup import db

show_schema = ShowSchema(session=db.session)

# Get one movie
class ShowById(Resource):
    def get(self, id):
        if show := db.session.get(Show, id):
            return show_schema.dump(show), 200
        return {'error': 'Could not find that show'}, 404