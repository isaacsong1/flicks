from marshmallow import fields, validate, validates, ValidationError
from models.movie_collection import MovieCollection
from app_setup import ma

class MovieCollectionSchema(ma.SQLAlchemySchema):
    class Meta:
        model = MovieCollection
        load_instance = True
        fields = ['id', 'name', 'user_id', 'movie_id']

    name = fields.String(required=True, validate=validate.Length(min=3, max=20))
