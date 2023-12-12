from marshmallow import fields, validate, validates, ValidationError
from models.show_collection import ShowCollection
from app_setup import ma
from schemas.show_schema import ShowSchema

class ShowCollectionSchema(ma.SQLAlchemySchema):
    class Meta:
        model = ShowCollection
        load_instance = True
        fields = ['id', 'name', 'user_id', 'show_id', 'show']

    name = fields.String(required=True, validate=validate.Length(min=3, max=20))
    show = fields.Nested(ShowSchema)