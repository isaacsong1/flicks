from marshmallow import fields, validate, validates, ValidationError
from models.movie_collection import MovieCollection
from app_setup import ma
from schemas.movie_schema import MovieSchema

class MovieCollectionSchema(ma.SQLAlchemySchema):
    class Meta:
        model = MovieCollection
        load_instance = True
        fields = ['id', 'name', 'user_id', 'movie_id', 'movie']

    name = fields.String(required=True, validate=validate.Length(min=3, max=20))
    movie = fields.Nested(MovieSchema)
