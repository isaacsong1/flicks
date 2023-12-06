from sqlalchemy.orm import validates
from app_setup import db
from models.user import User
from models.show import Show

class ShowCollection(db.Model):
    __tablename__ = 'show_collections'

    # Columns for show_collections Table
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    show_id = db.Column(db.Integer, db.ForeignKey('shows.id'))

    # Relationships
    user = db.relationship('User', back_populates='movie_collections')
    show = db.relationship('Show', back_populates='show_collections')

    # Validations
    @validates('name')
    def validate_name(self, _, value):
        if not isinstance(value, str):
            raise TypeError(f'Name of show collection must be a string')
        elif len(value) < 3 or len(value) > 20:
            raise ValueError(f'Name of show collection must be between 3 and 20 characters')
        return value
    
    @validates('user_id')
    def validate_userid(self, _, value):
        if value and db.session.get(User, value):
            return value
        else:
            raise ValueError('User ID must be from a valid user')
    
    @validates('show_id')
    def validate_showid(self, _, value):
        if value and db.session.get(Show, value):
            return value
        else:
            raise ValueError('Show ID must be from a valid show')

    # repr
    def __repr__(self):
        return f'<ShowCollection #{self.id} >'