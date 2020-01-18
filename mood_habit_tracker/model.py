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

    #Relationships
    habits = db.relationship('Habit')
    moods = db.relationship('Mood')
    weather = db.relationship('Weather')

    def __repr__(self):
        """Show user data object info."""

        return f'User ID: {self.user_id}\n'
               f'Name: {self.first_name} {self.last_name}\n'
               f'Age: {self.age}\n'
               f'Email: {self.email}\n'


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

    #Relationships
    users = db.relationship('User')
    weather = db.relationship('Weather')

    def __repr__(self):
        """Show habit data object info."""

        return f'Habit ID: {self.habit_id}\n'
               f'Habit: {self.habit}\n'
               f'User ID: {self.user_id}\n'
               f'Weather ID: {self.weather_id}\n'


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

    #Relationships
    users = db.relationship('User')
    weather = db.relationship('Weather')

    def __repr__(self):
        """Show user mood object info."""

        return f'Mood ID: {self.mood_id}\n'
               f'Mood: {self.mood}\n'
               f'Intesity: {self.intensity}\n'
               f'User ID: {self.user_id}\n'
               f'Weather ID: {self.weather_id}\n'


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

    #Relationship
    users = db.relationship('User')

    def __repr__(self):
        """Show user weather object info."""

        return f'Weather ID: {self.weather_id}\n'
               f'Time: {self.time}\n'
               f'Location: {self.location}\n'
               f'Sky Condition: {self.sky_condition}\n'
               f'Temp: {self.temp}\n'
               f'User Id: {self.user_id}\n'




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