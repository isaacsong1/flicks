#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app_setup import app, db
from models.user import User
from models.follower import Follower
from models.movie import Movie
from models.show import Show
from models.movie_collection import MovieCollection
from models.show_collection import ShowCollection

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        # Seed code goes here!
        print("Clearing db...")
        User.query.delete()
        Follower.query.delete()
        Movie.query.delete()
        Show.query.delete()
        MovieCollection.query.delete()
        ShowCollection.query.delete()

        print('Seeding users...')
        users =[]
        usernames = ['sac', 'phlyde', 'reub', 'dopamin', 'ethan', 'tobae']
        emails = [
            'sac@email.com', 
            'phlyde@email.com', 
            'reub@email.com', 
            'dopamin@email.com', 
            'ethan@email.com', 
            'tobae@email.com'
            ]
        for i in range(6):
            user = User(
                username=usernames[i],
                email=emails[i]
            )
            user.password_hash = 'passwordpass'
            users.append(user)
            db.session.add(user)
        db.session.commit()

        print('Seeding followers...')
        # sac following phlyde, reubs, dopamin
        sac1 = Follower(follower_id=users[0], following_id=users[1])
        sac2 = Follower(follower_id=users[0], following_id=users[2])
        sac3 = Follower(follower_id=users[0], following_id=users[3])
        # phlyde following sac, reubs
        phlyde1 = Follower(follower_id=users[1], following_id=users[0])
        phlyde2 = Follower(follower_id=users[1], following_id=users[2])
        # reubs following sac, phlyde
        reubs1 = Follower(follower_id=users[2], following_id=users[0])
        reubs2 = Follower(follower_id=users[2], following_id=users[1])
        # dopamin following sac, ethan, tobae
        dopamin1 = Follower(follower_id=users[3], following_id=users[0])
        dopamin2 = Follower(follower_id=users[3], following_id=users[4])
        dopamin3 = Follower(follower_id=users[3], following_id=users[5])
        # ethan following dopamin, tobae
        ethan1 = Follower(follower_id=users[4], following_id=users[3])
        ethan2 = Follower(follower_id=users[4], following_id=users[5])
        # tobae following dopamin, ethan
        tobae1 = Follower(follower_id=users[5], following_id=users[3])
        tobae2 = Follower(follower_id=users[5], following_id=users[4])
        followers = [sac1, sac2, sac3, phlyde1, phlyde2, reubs1, reubs2, dopamin1, dopamin2, dopamin3, ethan1, ethan2, tobae1, tobae2]
        db.session.add_all(followers)
        db.session.commit()

        print('Seeding movies...')
        movies = []
        movie_titles = ['Avatar', 'Spirited Away', 'Interstellar', 'Good Will Hunting']
        movie_image = 'https://m.media-amazon.com/images/M/MV5BOTI0MzcxMTYtZDVkMy00NjY1LTgyMTYtZmUxN2M3NmQ2NWJhXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_QL75_UX380_CR0,9,380,562_.jpg'
        movie_ratings = [8.5, 9.0, 8.0, 9.5]
        for i in range(4):
            movie = Movie(title=movie_titles[i], image=movie_image, rating=movie_ratings[i])
            movies.append(movie)
            db.session.add(movie)
        db.session.commit()

        print('Seeding shows...')
        shows = []
        show_titles = ['Suits', 'Modern Family', 'Planet Earth', 'Loki']
        show_image = 'https://m.media-amazon.com/images/M/MV5BMzMyYjg0MGMtMTlkMy00OGFiLWFiNTYtYmFmZWNmMDFlMzkwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_QL75_UX380_CR0,1,380,562_.jpg'
        show_ratings = [10.0, 9.0, 8.0, 9.5]
        for i in range(4):
            show = Show(title=show_titles[i], image=show_image, rating=show_ratings[i])
            shows.append(show)
            db.session.add(show)
        db.session.commit()

        print('Done seeding!')
        






        



