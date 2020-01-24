"""Utility file to seed mood_habit_tracker database using Faker"""

from sqlalchemy import func

from model import User
from model import Habit
from model import Mood
from model import Weather

from model import connect_to_db, db
from server import app

from faker import Faker

def load_users():
    S