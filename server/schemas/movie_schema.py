from marshmallow import fields, validate, validates, ValidationError
from models.movie import Movie
from app_setup import ma

class MovieSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Movie
        load_instance = True
        fields = ['id', 'title', 'image', 'rating', 'description']

    title = fields.String(required=True)
    image = fields.String(required=True)
    rating = fields.String(required=True)
