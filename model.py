
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
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
    weathers = db.relationship('Weather')

    def __repr__(self):
        """Show user data object info."""

        return f'<User ID: {self.user_id}\n\
                  Name: {self.first_name} {self.last_name}\n\
                  Age: {self.age}\n\
                  Email: {self.email}>'


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
                           db.ForeignKey('weathers.weather_id'),
                           nullable=False)

    #Relationships
    users = db.relationship('User')
    weathers = db.relationship('Weather')

    def __repr__(self):
        """Show habit data object info."""

        return f'<Habit ID: {self.habit_id}\nHabit: {self.habit}\nUser ID: {self.user_id}\nWeather ID: {self.weather_id}>'


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
                           db.ForeignKey('weathers.weather_id'),
                           nullable=False)

    #Relationships
    users = db.relationship('User')
    weathers = db.relationship('Weather')

    def __repr__(self):
        """Show user mood object info."""

        return f'<Mood ID: {self.mood_id}\nMood: {self.mood}\nIntesity: {self.intensity}\nUser ID: {self.user_id}\nWeather ID: {self.weather_id}>'


class Weather(db.Model):
    """Data model for moods."""

    __tablename__ = 'weathers'

    weather_id = db.Column(db.Integer,
                           primary_key=True,
                           autoincrement=True)
    time = db.Column(db.TIMESTAMP,
                     nullable=False)
    location = db.Column(db.String(50),
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
    habits = db.relationship('Habit')
    moods = db.relationship('Mood')


    def __repr__(self):
        """Show user weather object info."""

        return f'<Weather ID: {self.weather_id}\nTime: {self.time}\nLocation: {self.location}\nSky Condition: {self.sky_condition}\nTemp: {self.temp}\nUser Id: {self.user_id}>'




###############################################################################
def connect_to_db(app):
    """Connect to database."""

    app.config["SQLALCHEMY_DATABASE_URI"] = f"postgresql:///mood_habit_tracker"
    app.config["SQLALCHEMY_ECHO"] = True
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = app
    db.init_app(app)


if __name__ == "__main__":
  from server import app
  connect_to_db(app)