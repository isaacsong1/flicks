from flask import Flask
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_smorest import Api
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
from datetime import timedelta
import os

load_dotenv()  # take environment variables from .env.

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True
app.secret_key = os.environ.get("APP_SECRET")

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