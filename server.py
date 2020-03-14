from flask import (Flask, jsonify, render_template, request, session)
from model import (db, connect_to_db, User, Habit, Mood, Weather)
from secrets import key, flask_key
import requests
import datetime
import time

app = Flask(__name__)
app.secret_key = flask_key

# Placeholder value for ids of tables before slices are connected
PLACEHOLDER = 1

####################################################################################################################################################
"""React page code"""

@app.route('/')
def get_homepage():
    """Show homepage."""

    return render_template('base.html')

@app.route('/moods.json', methods=['GET'])
def get_mood_json():
    """Send mood form options."""

    mood_choices = ['Motivation', 'Sadness', 'Clarity']

    intensity_choices = list(range(11))

    # time.sleep(1)

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

    # time.sleep(1)

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

    comparison_choices = ['Motivation', 'Sadness', 'Clarity', 'Drink 20 oz of water', 'Sleep 8 hours', 'Exercise for 20 mins', 'Weather sky condition']

    # time.sleep(1)

    return jsonify({'x_choices': comparison_choices[3:], 'y_choices': comparison_choices[:3]})

@app.route('/comparison_chart.json', methods=['GET'])
def get_comparison_chart_data():

    x_axis = request.args.get('xAxis')
    print(x_axis)
    y_axis = request.args.get('yAxis')

    habit_choices = {'Drink 20 oz of water', 'Sleep 8 hours', 'Exercise for 20 mins'}

    if x_axis in habit_choices:

        # query Habit based on the x-axis provided if it's a habit
        habits = Habit.query.filter_by(habit=x_axis).all()
        # instantiate a set to add to later
        habit_times = set()
        # loop through query results to change timestamp to just date and add to set
        for habit in habits:
            habit_time = habit.weathers.time.replace(hour=0, minute=0, second=0, microsecond=0)
            habit_times.add(habit_time)
        
        # query moods based on the y-axis provided
        moods = Mood.query.filter_by(mood=y_axis).all()
        # instantiate 2 lists for days the habit was performed and days it wasn't
        habit_true = []
        habit_false = []
        # loop through moods to change timestamp to just date
        for mood in moods:
            mood_time = mood.weathers.time.replace(hour=0, minute=0, second=0, microsecond=0)
            # compare mood date to habit date to sort mood intensity into days habit was and wasn't performed
            if mood_time in habit_times:
                habit_true.append(mood.intensity)
            else:
                habit_false.append(mood.intensity)
        # average mood intensity data because the chart won't do what I want
        avg_habit_true = sum(habit_true)/len(habit_true)
        avg_habit_false = sum(habit_false)/len(habit_false)
        chart_data = {'data': [avg_habit_true, avg_habit_false], 'labels': [f'Did {x_axis}', f'Did not {x_axis}'], 'y_axis': y_axis, 'x_axis': x_axis}
    else:
        
        moods = db.session.query(Mood.intensity, Weather.sky_condition).join(Mood).filter_by(mood=y_axis).all()
        chart_data = {'y_axis': y_axis, 'data':{}, 'labels':[], 'x_axis': x_axis}
        # create a dictionary of sky_conditions based on weather/mood results
        for mood in moods:
            if mood.sky_condition not in set(chart_data['labels']):
                chart_data['labels'].append(mood.sky_condition)
                chart_data['data'][mood.sky_condition] = [mood.intensity] 
            else:
                chart_data['data'][mood.sky_condition].append(mood.intensity)
        avg_cond = []
        for condition in chart_data['labels']:
            avg = sum(chart_data['data'][condition])/len(chart_data['data'][condition])
            avg_cond.append(avg)
        chart_data['data'] = avg_cond
        

    # time.sleep(1)

    return jsonify(chart_data)

######################################################################################################################################################
"""Jinja page code"""

# @app.route('/')
# def get_homepage():
#     """Show homepage."""

#     return render_template('base.html')


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
# API functions

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
    
    # timestamp = weather_info['dt']
    time = datetime.datetime.now()
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
    app.run(port=5000, host='0.0.0.0')