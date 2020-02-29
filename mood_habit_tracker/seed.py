"""Utility file to seed mood_habit_tracker database using Faker"""

from sqlalchemy import func

from model import User
from model import Habit
from model import Mood
from model import Weather

from model import connect_to_db, db
from server import app

import datetime

from faker import Faker

fake = Faker()

def create_fake_users():

    for i in list(range(5)):
        first_name = fake.first_name()
        last_name = fake.last_name()
        age = fake.random_int(min=18, max=70, step=1)
        email = fake.ascii_free_email()
        password = fake.password(length=5, 
                                 special_chars=True, 
                                 digits=True, 
                                 upper_case=True, 
                                 lower_case=True)
        user = User(first_name=first_name,
                    last_name=last_name,
                    age=age,
                    email=email,
                    password=password)
        db.session.add(user)
    db.session.commit()

def create_fake_habits():

    for i in list(range(25)):
        habit = fake.random_element(elements=('Drink 20 oz of water', 'Sleep 8 hours', 'Exercise for 20 mins'))
        user_id = 1
        weather_id = i + 1
        habits = Habit(habit=habit,
                       user_id=user_id,
                       weather_id=weather_id)
        db.session.add(habits)
    db.session.commit()

def create_fake_moods():

    for i in list(range(50)):
        mood = fake.random_element(elements=('Motivation', 'Sadness', 'Clarity'))
        intensity = fake.random_int(min=0, max=10, step=1)
        user_id = 1
        weather_id = i + 26
        moods = Mood(mood=mood, 
                     intensity=intensity, 
                     user_id=user_id, 
                     weather_id=weather_id)
        db.session.add(moods)
    db.session.commit()

def create_fake_weather():

    for i in list(range(75)):
        time = fake.date_time_this_month(before_now=True, after_now=True, tzinfo=None)
        location = 'Pacifica'
        sky_condition = fake.random_element(elements=('rain', 'clouds', 'clear'))
        temp = fake.random_int(min=45, max=70, step=1)
        user_id = 1
        weather = Weather(time=time,
                          location=location,
                          sky_condition=sky_condition,
                          temp=temp,
                          user_id=user_id)
        db.session.add(weather)
    db.session.commit()

if __name__ == "__main__":
    connect_to_db(app)

    # In case tables haven't been created, create them
    db.create_all()

    # Import different types of data
    create_fake_users()
    create_fake_weather()
    create_fake_habits()
    create_fake_moods()
    