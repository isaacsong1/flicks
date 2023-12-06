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

# Route imports
#! Authentication
from routes.auth.check_session import CheckSession
from routes.auth.login import Login
from routes.auth.logout import Logout
from routes.auth.register import Register
#! General routes
from routes.movie_by_id import MovieById
from routes.movie_coll_by_id import MovieCollectionById
from routes.movie_collections import MovieCollections
from routes.movies import Movies
from routes.show_by_id import ShowById
from routes.show_coll_by_id import ShowCollectionById
from routes.show_collections import ShowCollections
from routes.shows import Shows
from routes.user_by_id import UserById
from routes.users import Users

# Add resources
#! Authentication
api.add_resource(CheckSession, '/checksession')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(Register, '/register')
#! General routes
api.add_resource(MovieById, '/movies/<int:id>')
api.add_resource(MovieCollectionById, 'movie_collections/<int:id>')
api.add_resource(MovieCollections, '/movie_collections')
api.add_resource(Movies, '/movies')
api.add_resource(ShowById, '/shows/<int:id>')
api.add_resource(ShowCollectionById, '/show_collections/<int:id>')
api.add_resource(ShowCollections, '/show_collections')
api.add_resource(Shows, '/shows')
api.add_resource(UserById, '/users/<int:id>')
api.add_resource(Users, '/users')

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

