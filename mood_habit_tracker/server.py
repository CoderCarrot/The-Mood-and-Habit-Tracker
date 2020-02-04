from flask import (Flask, jsonify, render_template, request, session)
from model import (db, connect_to_db, User, Habit, Mood, Weather)

app = Flask(__name__) #What? Why not turning red?
app.secret_key = 'secrets are fun'

# Placeholder value for ids of tables before slices are connected
PLACEHOLDER = 1

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


if __name__ == '__main__':
    connect_to_db(app)
    app.run(port=5000, host='0.0.0.0', debug=True)