#!/usr/bin/env python3

# Local imports
from app_setup import app, api

# Remote library imports
from flask import request
from flask_restful import Resource

# Add your model imports
from models.user import User
from models.follower import Follower
from models.movie import Movie
from models.show import Show
from models.movie_collection import MovieCollection
from models.show_collection import ShowCollection

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

