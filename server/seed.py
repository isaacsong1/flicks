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

from media_data import all_media

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
        usernames = ['sac', 'phlyde', 'reub', 'dopamin', 'ethan', 'tobae', 'testuser1', 'testuser2']
        emails = [
            'sac@email.com', 
            'phlyde@email.com', 
            'reub@email.com', 
            'dopamin@email.com', 
            'ethan@email.com', 
            'tobae@email.com',
            'testuser1@email.com',
            'testuser2@email.com'
            ]
        for i in range(8):
            user = User(
                username=usernames[i],
                email=emails[i]
            )
            user.password_hash = 'passwordpass'
            users.append(user)
            db.session.add(user)
        db.session.commit()

        print('Seeding followers...')
        # sac following phlyde, reubs, dopamin, testuser1, testuser2
        sac1 = Follower(follower_id=users[0].id, following_id=users[1].id)
        sac2 = Follower(follower_id=users[0].id, following_id=users[2].id)
        sac3 = Follower(follower_id=users[0].id, following_id=users[3].id)
        sac4 = Follower(follower_id=users[0].id, following_id=users[6].id)
        sac5 = Follower(follower_id=users[0].id, following_id=users[7].id)
        # phlyde following sac, reubs
        phlyde1 = Follower(follower_id=users[1].id, following_id=users[0].id)
        phlyde2 = Follower(follower_id=users[1].id, following_id=users[2].id)
        # reubs following sac, phlyde
        reubs1 = Follower(follower_id=users[2].id, following_id=users[0].id)
        reubs2 = Follower(follower_id=users[2].id, following_id=users[1].id)
        # dopamin following sac, ethan, tobae
        dopamin1 = Follower(follower_id=users[3].id, following_id=users[0].id)
        dopamin2 = Follower(follower_id=users[3].id, following_id=users[4].id)
        dopamin3 = Follower(follower_id=users[3].id, following_id=users[5].id)
        # ethan following dopamin, tobae
        ethan1 = Follower(follower_id=users[4].id, following_id=users[3].id)
        ethan2 = Follower(follower_id=users[4].id, following_id=users[5].id)
        # tobae following dopamin, ethan
        tobae1 = Follower(follower_id=users[5].id, following_id=users[3].id)
        tobae2 = Follower(follower_id=users[5].id, following_id=users[4].id)
        # testuser1 following sac, testuser2
        testuser1 = Follower(follower_id=users[6].id, following_id=users[0].id)
        testuser2 = Follower(follower_id=users[6].id, following_id=users[7].id)
        # testuser2 following sac, testuser1
        testuser3 = Follower(follower_id=users[7].id, following_id=users[0].id)
        testuser4 = Follower(follower_id=users[7].id, following_id=users[6].id)
        followers = [sac1, sac2, sac3, sac4, sac5, phlyde1, phlyde2, reubs1, reubs2, dopamin1, dopamin2, dopamin3, ethan1, ethan2, tobae1, tobae2, testuser1, testuser2, testuser3, testuser4]
        db.session.add_all(followers)
        db.session.commit()

        print('Seeding movies...')
        movies = all_media.get('movies')
        for i in movies:
            # import ipdb; ipdb.set_trace()
            # movie_title = i.title
            # movie_image=i.image
            # movie_rating=i.rating
            # movie_description=i.description
            # movie_title = i['title']
            # movie_image=i['image']
            # movie_rating=i['rating']
            # movie_description=i['description']
            movie_title = i.get('title')
            movie_image=i.get('image')
            movie_rating=i.get('rating')
            movie_description=i.get('description')
            movie = Movie(title=movie_title, 
                        image=movie_image, 
                        rating=movie_rating, 
                        description=movie_description
                        )
            db.session.add(movie)
        db.session.commit()

        print('Seeding shows...')
        shows = all_media.get('shows')
        for i in shows:
            # show_title = i.title
            # show_image=i.image
            # show_rating=i.rating
            # show_description=i.description
            # show_title = i['title']
            # show_image=i['image']
            # show_rating=i['rating']
            # show_description=i['description']
            show_title = i.get('title')
            show_image=i.get('image')
            show_rating=i.get('rating')
            show_description=i.get('description')
            show = Show(title=show_title, 
                        image=show_image, 
                        rating=show_rating, 
                        description=show_description
                        )
            db.session.add(show)
        db.session.commit()

        print('Seeding movie collections...')
        mc = MovieCollection(name='main', user_id=users[0].id, movie_id=1)
        mc5 = MovieCollection(name='main', user_id=users[0].id, movie_id=2)
        mc6 = MovieCollection(name='main', user_id=users[0].id, movie_id=3)
        mc1 = MovieCollection(name='favs', user_id=users[0].id, movie_id=4)
        mc4 = MovieCollection(name='favs', user_id=users[0].id, movie_id=5)
        mc2 = MovieCollection(name='main', user_id=users[6].id, movie_id=6)
        mc3 = MovieCollection(name='main', user_id=users[7].id, movie_id=7)
        db.session.add_all([mc, mc1, mc2, mc3, mc4, mc5, mc6])
        db.session.commit()

        print('Seeding show collections...')
        sc = ShowCollection(name='main', user_id=users[0].id, show_id=1)
        sc2 = ShowCollection(name='main', user_id=users[6].id, show_id=2)
        sc3 = ShowCollection(name='main', user_id=users[7].id, show_id=3)
        db.session.add_all([sc, sc2, sc3])
        db.session.commit()

        print('Done seeding!')
        






        



