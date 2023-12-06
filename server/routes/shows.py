from . import session, Resource
from models.show import Show
from schemas.show_schema import ShowSchema
from app_setup import db

shows_schema = ShowSchema(many=True, session=db.session)

# Get all shows 
class Shows(Resource):
    def get(self):
        shows = shows_schema.dump(Show.query)
        return shows, 200