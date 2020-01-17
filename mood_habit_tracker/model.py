from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

app = Flask(__name__) #What? Why not turning red?
app.secret_key = 'secrets are fun'
###############################################################################

class User(db.Model):
    """Data model for a user."""

    __tablename__ = 'users'

    user_id = db.Column(db.Integer,
                        primary_key=True,
                        autoincrement=True)
    first_name = db.Column(db.String(50),
                           nullable=False)
    last_name = db.Column(db.String(50),
                           nullable=False)
    age = db.Column(db.Integer,
                    nullable=False)
    email = db.Column(db.String(50),
                      nullable=False,
                      unique=True)
    password = db.Column(db.String(50),
                         nullable=False)

    def __repr__(self):
        """Print user data object pretty."""

class Habit(db.Model):
    """Data model for habits."""

    __tablename__ = 'habits'

    habit_id = db.Column(db.Integer,
                        primary_key=True,
                        autoincrement=True)
    habit = db.Column(db.String(50),
                      nullable=False)
    user_id = db.Column(db.Integer,
                        db.ForeignKey('users.user_id'),
                        nullable=False)
    weather_id = db.Column(db.Integer,
                           db.ForeignKey('weather.weather_id'),
                           nullable=False)

    def __repr__(self):
        """Print habit data object pretty."""

class Mood(db.Model):
    """Data model for moods."""

    __tablename__ = 'moods'

    mood_id = db.Column(db.Integer,
                        primary_key=True,
                        autoincrement=True)
    mood = db.Column(db.String(50),
                      nullable=False)
    intensity = db.Column(db.Integer,
                          nullable=False)
    user_id = db.Column(db.Integer,
                        db.ForeignKey('users.user_id'),
                        nullable=False)
    weather_id = db.Column(db.Integer,
                           db.ForeignKey('weather.weather_id'),
                           nullable=False)

    def __repr__(self):
        """Print user mood object pretty."""

class Weather(db.Model):
    """Data model for moods."""

    __tablename__ = 'weather'

    weather_id = db.Column(db.Integer,
                           primary_key=True,
                           autoincrement=True)
    time = db.Column(db.Timestamp, #Is this correct?
                     nullable=False)
    location = db.Column(db.Integer,
                         nullable=False)
    sky_condition = db.Column(db.String(50),
                              nullable=False)
    temp = db.Column(db.Integer,
                     nullable=False)
    user_id = db.Column(db.Integer,
                        db.ForeignKey('users.user_id'),
                        nullable=False)

    def __repr__(self):
        """Print user weather object pretty."""




###############################################################################
def connect_to_db(app, db_name):
    """Connect to database."""

    app.config["SQLALCHEMY_DATABASE_URI"] = f"postgresql:///{db_name}"
    app.config["SQLALCHEMY_ECHO"] = True
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = app
    db.init_app(app)


    if __name__ == "__main__":
        connect_to_db(app, 'mood_habit_tracker')