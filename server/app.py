#!/usr/bin/env python3

# Local imports
from app_setup import app, api

# Remote library imports
from flask import request
from flask_restful import Resource

# Add your model imports
from models.users import User
from models.followers import Follower
from models.movies import Movie
from models.shows import Show
from models.movie_collections import MovieCollection
from models.show_collections import ShowCollection

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

