from flask import (Flask, jsonify, render_template, request)
from model import (db, connect_to_db, Habit, Mood, Weather)
from secrets import key, flask_key
import requests
import datetime
import time

app = Flask(__name__)
app.secret_key = flask_key

# Placeholder value for User ID until Login is created
PLACEHOLDER = 1

####################################################################################################################################################
"""React page code"""

@app.route('/')
def get_homepage():
    """Show homepage."""

    return render_template('base.html')

@app.route('/moods.json', methods=['GET'])
def get_mood_json():
    """Create and send mood form options."""

    # Create mood choices for form. Future interation to include custom
    # user-inputted options.
    mood_choices = ['Motivation', 'Sadness', 'Clarity']

    #Create intensity scale of 0-10.
    intensity_choices = list(range(11))

    # Used to test loading graphic. Left in for use in future interations
    time.sleep(1)

    # Sends the mood and intensity choices to the front end via a data shape
    # that is easy for the front end to process.
    return jsonify({'moods': mood_choices, 'intensity': intensity_choices})


@app.route('/moods.json', methods=['POST'])
def post_mood_json():
    """Obtain user input from the mood form on the front end and enter info
    into the database"""

    # Obtains the zipcode entered by the user and sends a request to the
    # weather API to then parse the APIs response and serve the data to the
    # database in the appropriate shape.
    zipcode = request.form.get('zipcode')
    weather_info = get_weather(zipcode)
    weather_insert = parse_weather(weather_info)
    weather_id = post_weather(weather_insert)

    # Obtains the mood and intensity choices from the user on the front end
    # and creates an insert for insertion into the database.
    mood = request.form.get('mood')
    intensity = request.form.get('intensity')
    ins = Mood(mood=mood,
               intensity=intensity,
               user_id=PLACEHOLDER,
               weather_id=weather_id)

    # Add insert into the database and commit/save the changes.
    db.session.add(ins)
    db.session.commit()

    # Placeholder for future interation of app that display the month's
    # entries after user submits current entry.
    return 'This months mood entries'

@app.route('/habits.json', methods=['GET'])
def get_habit_json():
    """Create and send habit form options"""

    habit_choices = ['Drink 20 oz of water', 'Sleep 8 hours', 'Exercise for 20 mins']

    # Used to test loading graphic. Left in for use in future iterations.
    # time.sleep(1)

    # Sends the habit choices to the front end via a data shape
    # that is easy for the front end to process.
    return jsonify({'habits': habit_choices})

@app.route('/habits.json', methods=['POST'])
def post_habit_json():
    """Obtain user input from the habit form from the front end and enter info
    into the database"""

    # Obtains the zipcode entered by the user and sends a request to the
    # weather API to then parse the APIs response and serve the data to the
    # database in the appropriate shape.
    zipcode = request.form.get('zipcode')
    weather_info = get_weather(zipcode)
    weather_insert = parse_weather(weather_info)
    weather_id = post_weather(weather_insert)

    # Obtains the habit choices from the user on the front end.
    # and creates an insert for insertion into the database.
    habit = request.form.get('habit')
    ins = Habit(habit=habit,
                user_id=PLACEHOLDER,
                weather_id=weather_id)

    # Add insert into the database and commit/save the changes.
    db.session.add(ins)
    db.session.commit()

    # Placeholder for future interation of app that display the month's
    # entries after user submits current entry.
    return 'This months habit entries'

@app.route('/comparison_form.json', methods=['GET'])
def get_comparison_choices_json():
    """Create and send graph axes choices to the front end"""

    # All choices for comparison
    comparison_choices = ['Motivation', 'Sadness', 'Clarity', 'Drink 20 oz of water', 'Sleep 8 hours', 'Exercise for 20 mins', 'Weather sky condition']

    #Used to test loading graphic. Left in for use in future interations
    # time.sleep(1)

    # Breaks up the graph axes choices into x and y axis and sends data in
    # a shape that is easy for the front end to process.
    return jsonify({'x_choices': comparison_choices[3:], 'y_choices': comparison_choices[:3]})

@app.route('/comparison_chart.json', methods=['GET'])
def get_comparison_chart_data():
    """Obtains the axis options chosen by the user and uses the data
    to query the database and send the appropriate data back to the
    front end for creation of the comparison chart"""

    # Store the user-chosen options for x and y axis.
    x_axis = request.args.get('xAxis')
    y_axis = request.args.get('yAxis')

    # List habit choices for later comparison to determine which database to query.
    habit_choices = {'Drink 20 oz of water', 'Sleep 8 hours', 'Exercise for 20 mins'}

    if x_axis in habit_choices:

        # Query Habit table based on the x-axis choice provided by the user.
        habits = Habit.query.filter_by(habit=x_axis).all()
        # Instantiate a set fill in later.
        habit_times = set()
        # Loop through query results to remove time data from timestamp and
        # add resulting date to set.
        for habit in habits:
            habit_time = habit.weathers.time.replace(hour=0, minute=0, second=0, microsecond=0)
            habit_times.add(habit_time)
        
        # Query moods based on the y-axis choice provided by the user.
        moods = Mood.query.filter_by(mood=y_axis).all()
        # Instantiate 2 lists for days the habit was performed and days it
        # was not.
        habit_true = []
        habit_false = []
        # Loop through moods quety result to remove time data from timestamp.
        for mood in moods:
            mood_time = mood.weathers.time.replace(hour=0, minute=0, second=0, microsecond=0)
            # Compare mood date to habit date to sort mood intensity into days
            # habit was and was not performed.
            if mood_time in habit_times:
                habit_true.append(mood.intensity)
            else:
                habit_false.append(mood.intensity)
        # Average mood intensity data. Future iteration to have more of a
        # histogram-type chart.
        avg_habit_true = sum(habit_true)/len(habit_true)
        avg_habit_false = sum(habit_false) / len(habit_false)
        # Place mood and habit data in a shape that the front end and chart.js
        # can process easily.
        chart_data = {'data': [avg_habit_true, avg_habit_false], 'labels': [f'Did {x_axis}', f'Did not {x_axis}'], 'y_axis': y_axis, 'x_axis': x_axis}
    else:
        # Join weather table and mood table for ease of date-matching for the entry comparison.
        moods = db.session.query(Mood.intensity, Weather.sky_condition).join(Mood).filter_by(mood=y_axis).all()
        chart_data = {'y_axis': y_axis, 'data':{}, 'labels':[], 'x_axis': x_axis}
        # Create a dictionary of sky_conditions based on weather/mood results.
        for mood in moods:
            if mood.sky_condition not in set(chart_data['labels']):
                chart_data['labels'].append(mood.sky_condition)
                chart_data['data'][mood.sky_condition] = [mood.intensity] 
            else:
                chart_data['data'][mood.sky_condition].append(mood.intensity)
        avg_cond = []
        # Average the mood intensity corresponding to each weather condition.
        # Future iteration to have more of a histogram-type chart.
        for condition in chart_data['labels']:
            avg = sum(chart_data['data'][condition])/len(chart_data['data'][condition])
            avg_cond.append(avg)
        chart_data['data'] = avg_cond
        
    # Used to test loading graphic. Left in for use in future iterations.
    # time.sleep(1)

    # Send chart data to front end in a proper shape for chart.js.
    return jsonify(chart_data)

######################################################################################################################################################
"""Jinja page code"""
# Jinja code is not used in current iterration of the app.
# Jinja was used to get the app going and then the front-end was
# switched to React.

# Homepage commented out due to use in React code
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
    """Take in a zipcode, sends the request to the API and return the
    jsonified response."""

    # Send the payload (the API key and zipcode) to the OpenWeather API to
    # get current weather data.
    url = 'http://api.openweathermap.org/data/2.5/weather'
    payload = {'APPID': key,
               'zip': f'{zipcode},us'}

    # Get the current weather response from the OpenWeather API.
    res = requests.get(url, params=payload)
    weather_info = res.json()

    return weather_info

    
def parse_weather(weather_info):
    """Take in jsonified weather info and parse it for entry into the
    database. Return the data to be inserted."""

    # Used local time due to API response being cached when a the same
    # payload is send without restarting the browser session
    time_stamp = datetime.datetime.now()
    # Parse the API response. Temp and location to be used in future iteration
    # of app.
    location = weather_info['name']
    sky_condition = weather_info['weather'][0]['description']
    temp_kelvin = weather_info['main']['temp']
    temp_farenheit = (temp_kelvin - 273.15) * 9/5 + 32
    temp_int = int(temp_farenheit)

    # Create the insert for the database
    ins = Weather(time=time_stamp,
                  location=location,
                  sky_condition=sky_condition,
                  temp=temp_int,
                  user_id=PLACEHOLDER)

    return ins


def post_weather(insert):
    """Take in a database insert to insert into the database and commit.
    Obtain and return the insert id."""

    # Insert and commit the parsed weather data.
    db.session.add(insert)
    db.session.commit()

    # Get the weather id from the weather entry to insert into the
    # mood/habit database.
    weather_entry_id = insert.weather_id

    return weather_entry_id


if __name__ == '__main__':
    connect_to_db(app)
    app.run(port=5000, host='0.0.0.0')