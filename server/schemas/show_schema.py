from marshmallow import fields, validate, validates, ValidationError
from models.show import Show
from app_setup import ma

class ShowSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Show
        load_instance = True
        fields = []