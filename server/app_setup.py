from flask import Flask
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
from datetime import timedelta
import os

load_dotenv()  # take environment variables from .env.

app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client/build',
    template_folder='../client/build'
)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
# app.secret_key = os.environ.get('APP_SECRET')
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY')
app.config["PROPAGATE_EXCEPTIONS"] = True
app.config['CLIENT_ID'] = os.environ.get('G_CLIENT_ID')
app.config["JWT_COOKIE_SECURE"] = True
app.config['JWT_TOKEN_LOCATION'] = ["headers", "cookies", "json", "query_string"]
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=15)
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=3)
# app.config['JWT_COOKIE_CSRF_PROTECT'] = True


#! flask-sqlalchemy setup
db = SQLAlchemy(app)
#! flask-migrate setup
migrate = Migrate(app, db)
#! flask-marshmallow setup
ma = Marshmallow(app)
#! flask-bcrypt
bcrypt = Bcrypt(app)
#! flask-restful setup
api = Api(app)
#! flask-jwt-extended setup
jwt = JWTManager(app)