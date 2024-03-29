#!/usr/bin/env python3

# Local imports
from app_setup import app, db, api, jwt

# Remote library imports
from flask import render_template
from flask_restful import Resource

# Add your model imports
from models.user import User

# Route imports
#! Authentication
# from routes.auth.check_session import CheckSession
from routes.auth.login import Login
from routes.auth.logout import Logout
from routes.auth.register import Register
from routes.auth.refresh import Refresh
from routes.auth.current_user import CurrentUser
from routes.auth.google_auth import GoogleAuth
#! General routes
from routes.followers import Followers
from routes.follower_by_id import FollowerById
from routes.movie_by_id import MovieById
from routes.movie_coll_by_id import MovieCollectionById
from routes.movie_coll_by_name import MovieCollectionByName
from routes.movie_coll_by_user import MovieCollectionByUser
from routes.movie_collections import MovieCollections
from routes.movies import Movies
from routes.show_by_id import ShowById
from routes.show_coll_by_id import ShowCollectionById
from routes.show_coll_by_name import ShowCollectionByName
from routes.show_coll_by_user import ShowCollectionByUser
from routes.show_collections import ShowCollections
from routes.shows import Shows
from routes.user_by_id import UserById
from routes.users import Users

# Add resources
#! Authentication
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(Register, '/register')
api.add_resource(Refresh, '/refresh')
api.add_resource(CurrentUser, '/currentuser')
api.add_resource(GoogleAuth, '/googleauth')
#! General routes
api.add_resource(Followers, '/followers')
api.add_resource(FollowerById, '/user/<int:user_id>/following/<int:following_id>')
api.add_resource(MovieById, '/movies/<int:id>')
api.add_resource(MovieCollectionById, '/movie_collections/<int:id>')
api.add_resource(MovieCollectionByName, '/users/<int:id>/movie_collections/<string:name>')
api.add_resource(MovieCollectionByUser, '/users/<int:id>/movie_collections')
api.add_resource(MovieCollections, '/movie_collections')
api.add_resource(Movies, '/movies')
api.add_resource(ShowById, '/shows/<int:id>')
api.add_resource(ShowCollectionById, '/show_collections/<int:id>')
api.add_resource(ShowCollectionByName, '/users/<int:id>/show_collections/<string:name>')
api.add_resource(ShowCollectionByUser, '/users/<int:id>/show_collections')
api.add_resource(ShowCollections, '/show_collections')
api.add_resource(Shows, '/shows')
api.add_resource(UserById, '/users/<int:id>')
api.add_resource(Users, '/users')

# Register a callback function that loads a user from your database whenever 
# a protected route is accessed. This should return any python object on a 
# successful lookup, or None if the lookup failed for any reason
# (For ex: if a user has been deleted from the database)
@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data['sub']
    return db.session.get(User, identity)

# Add routes for deployment
# @app.route('/discover')
# @app.route('/connect')
# @app.route('/users/<int:id>/mycollection')
# @app.route('/users/<int:id>/profile')

@app.route('/')
def index():
    return '<h1>Project Server</h1>'
# def index(id=0):
#     return render_template("index.html")


if __name__ == '__main__':
    app.run(port=5555, debug=True)

