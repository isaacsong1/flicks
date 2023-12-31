from marshmallow import fields, validate, validates, ValidationError
from models.show import Show
from app_setup import ma

class ShowSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Show
        load_instance = True
        fields = ['id', 'title', 'image', 'rating', 'description']

    title = fields.String(required=True)
    image = fields.String(required=True)
    rating = fields.String(required=True)

