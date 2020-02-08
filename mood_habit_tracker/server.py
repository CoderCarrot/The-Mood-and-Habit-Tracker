from flask import (Flask, jsonify, render_template, request, session)
from model import (db, connect_to_db, User, Habit, Mood, Weather)
from secrets import key
import requests

app = Flask(__name__) #What? Why not turning red?
app.secret_key = 'secrets are fun'

# Placeholder value for ids of tables before slices are connected
PLACEHOLDER = 1
PLACEHOLDER_ZIP = '94404,us'
PLACEHOLDER_DATE = '2010-01-02 01:00:00'

@app.route('/')
def get_homepage():
    """Show homepage."""

    return 'Homepage'

@app.route('/moods', methods=['GET'])
def get_mood():
    """Create mood form."""

    moods = ['Motivation', 'Sadness', 'Clarity']

    return render_template("input_mood.html", moods=moods)

@app.route('/moods', methods=['POST'])
def post_mood():
    """Post mood data."""

    mood = request.form.get('mood_options')
    intensity = request.form.get('intensity')
    ins = Mood(mood=mood, 
               intensity=intensity, 
               user_id=PLACEHOLDER, 
               weather_id=PLACEHOLDER)

    db.session.add(ins)
    db.session.commit()

    return render_template("mood_entered.html")

@app.route('/habits', methods=['GET'])
def get_habit():
    """Create mood form."""

    habits = ['Drink 20 oz of water', 'Sleep 8 hours', 'Exercise for 20 mins']

    return render_template("input_habit.html", habits=habits)

@app.route('/habits', methods=['POST'])
def post_habit():
    """Post mood data."""

    habit = request.form.get('habit_options')
    ins = Habit(habit=habit, 
               user_id=PLACEHOLDER, 
               weather_id=PLACEHOLDER)

    db.session.add(ins)

    get_weather()
    db.session.commit()

    return render_template("habit_entered.html")

def get_weather():

    url = 'http://api.openweathermap.org/data/2.5/weather'
    payload = {'APPID' : key,
               'zip' : PLACEHOLDER_ZIP }

    res = requests.get(url, params=payload)

    weather_info = res.json()
    time = PLACEHOLDER_DATE
    # weather_info['dt']
    location = weather_info['name']
    sky_condition = weather_info['weather'][0]['description']
    temp_kelvin = weather_info['main']['temp']
    temp = (temp_kelvin - 273.15) * 9/5 + 32
    temp_rounded = round(temp, 1)

    ins = Weather(time=time,
                  location=location,
                  sky_condition=sky_condition,
                  temp=temp_rounded)

    db.session.add(ins)

    return None


if __name__ == '__main__':
    connect_to_db(app)
    app.run(port=5000, host='0.0.0.0', debug=True)