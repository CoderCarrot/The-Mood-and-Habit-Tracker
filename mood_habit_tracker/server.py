from flask import (Flask, jsonify, render_template, request, session)
from model import (db, connect_to_db, User, Habit, Mood, Weather)
from secrets import key
import requests
import datetime
import time

app = Flask(__name__)
app.secret_key = 'secrets are fun'

# Placeholder value for ids of tables before slices are connected
PLACEHOLDER = 1

####################################################################################################################################################
"""React page code"""

@app.route('/moods.json', methods=['GET'])
def get_mood_json():
    """Send mood form options."""

    mood_choices = ['Motivation', 'Sadness', 'Clarity']

    # def create_num_dicts(numList):
    #     num_dicts = []
    #     for num in numList:
    #         num_dicts.append(
    #             {
    #                 'value': num,
    #                 'inner': num
    #             }
    #         )
    #     return num_dicts
    
    #Number choices for the intensity pulldown menu
    # intensityChoices = create_num_dicts(range(0, 11));
    intensity_choices = list(range(11))

    time.sleep(1)

    return jsonify({'moods': mood_choices, 'intensity': intensity_choices})


@app.route('/moods.json', methods=['POST'])
def post_mood_json():

    zipcode = request.form.get('zipcode')
    weather_info = get_weather(zipcode)
    weather_insert = parse_weather(weather_info)
    weather_id = post_weather(weather_insert)

    mood = request.form.get('mood')
    intensity = request.form.get('intensity')
    ins = Mood(mood=mood,
               intensity=intensity,
               user_id=PLACEHOLDER,
               weather_id=weather_id)

    db.session.add(ins)
    db.session.commit()

    return 'This months mood entries'

@app.route('/habits.json', methods=['GET'])
def get_habit_json():

    habit_choices = ['Drink 20 oz of water', 'Sleep 8 hours', 'Exercise for 20 mins']

    time.sleep(1)

    return jsonify({'habits': habit_choices})

@app.route('/habits.json', methods=['POST'])
def post_habit_json():

    zipcode = request.form.get('zipcode')
    weather_info = get_weather(zipcode)
    weather_insert = parse_weather(weather_info)
    weather_id = post_weather(weather_insert)

    habit = request.form.get('habit')
    ins = Habit(habit=habit,
                user_id=PLACEHOLDER,
                weather_id=weather_id)

    db.session.add(ins)
    db.session.commit()

    return 'This months habit entries'

@app.route('/comparison_form.json', methods=['GET'])
def get_comparison_choices_json():

    comparison_choices = ['Motivation', 'Sadness', 'Clarity', 'Drink 20 oz of water', 'Sleep 8 hours', 'Exercise for 20 mins', 'Weather temperature', 'Weather sky condition']

    time.sleep(1)

    return jsonify({'x_choices': comparison_choices[3:], 'y_choices': comparison_choices[:3]})

@app.route('/comparison_chart.json', methods=['GET'])
def get_comparison_chart_data():

    x_axis = request.args.get('xAxis')
    y_axis = request.args.get('yAxis')

    habit_choices = ('Drink 20 oz of water', 'Sleep 8 hours', 'Exercise for 20 mins')

    #Get data for x-axis - make a func to call
    if x_axis in habit_choices:
        habits = db.session.query(Weather, Habit).outerjoin(Habit).all()


        x_data = Habit.query.filter_by(habit=x_axis).all()
        habit_datetime = []
        for habit in x_data:
            habit_datetime.append(habit.weathers.time)
    else:
        x_data = Weather.query.all()

    #Get data for y-axis - make a func to call
    y_data = Mood.query.filter_by(mood=y_axis).all()
    mood_datetime = []
    for mood in y_data:
        mood_datetime.append(mood.weathers.time) 

    for entry in mood_datetime:



    data:{mood: 
            {true(habit): intensity[1,6,8,9]}
            {false(habit): intensity[8, 0, 5, 10]} }
    
    

    time.sleep(1)

    return 'Something'

######################################################################################################################################################
"""Jinja page code"""

@app.route('/')
def get_homepage():
    """Show homepage."""

    return render_template('base.html')


@app.route('/moods', methods=['GET'])
def get_mood():
    """Create mood form."""

    moods = ['Motivation', 'Sadness', 'Clarity']

    return render_template("input_mood.html", moods=moods)

@app.route('/moods', methods=['POST'])
def post_mood():
    """Post mood data."""

    zipcode = request.form.get('zipcode')
    weather_info = get_weather(zipcode)
    weather_insert = parse_weather(weather_info)
    weather_id = post_weather(weather_insert)

    mood = request.form.get('mood_options')
    intensity = request.form.get('intensity')
    ins = Mood(mood=mood,
               intensity=intensity,
               user_id=PLACEHOLDER,
               weather_id=weather_id)

    db.session.add(ins)
    db.session.commit()

    return render_template("mood_entered.html")


@app.route('/habits', methods=['GET'])
def get_habit():
    """Create habit form."""

    habits = ['Drink 20 oz of water', 'Sleep 8 hours', 'Exercise for 20 mins']

    return render_template("input_habit.html", habits=habits)


@app.route('/habits', methods=['POST'])
def post_habit():
    """Post habit data."""

    zipcode = request.form.get('zipcode')
    weather_info = get_weather(zipcode)
    weather_insert = parse_weather(weather_info)
    weather_id = post_weather(weather_insert)

    habit = request.form.get('habit_options')
    ins = Habit(habit=habit,
                user_id=PLACEHOLDER,
                weather_id=weather_id)

    db.session.add(ins)
    db.session.commit()

    return render_template("habit_entered.html")

#####################################################################################################################################################


def get_weather(zipcode):
    """Takes in a zipcode, sends the request to the API and returns the jsonified response."""

    url = 'http://api.openweathermap.org/data/2.5/weather'
    payload = {'APPID': key,
               'zip': f'{zipcode},us'}

    # Get the current weather response from the openWeather API
    res = requests.get(url, params=payload)
    weather_info = res.json()

    return weather_info

    
def parse_weather(weather_info):
    """Takes in jsonified weather info and parses it for entry into the database. Returns the data to be inserted."""
    
    timestamp = weather_info['dt']
    time = datetime.datetime.fromtimestamp(timestamp)
    location = weather_info['name']
    sky_condition = weather_info['weather'][0]['description']
    temp_kelvin = weather_info['main']['temp']
    temp_farenheit = (temp_kelvin - 273.15) * 9/5 + 32
    temp_int = int(temp_farenheit)

    ins = Weather(time=time,
                  location=location,
                  sky_condition=sky_condition,
                  temp=temp_int,
                  user_id=PLACEHOLDER)
    
    return ins


def post_weather(insert):
    """Takes in a database insert to insert into the database and commit. Obtains and returns the insert id"""

    db.session.add(insert)
    db.session.commit()

    weather_entry_id = insert.weather_id

    return weather_entry_id


if __name__ == '__main__':
    connect_to_db(app)
    app.run(port=5000, host='0.0.0.0', debug=True)