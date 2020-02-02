from flask import (Flask, jsonify, render_template)
from model import (connect_to_db, User, Habit, Mood, Weather)

app = Flask(__name__) #What? Why not turning red?
app.secret_key = 'secrets are fun'

# @app.route('/')
# def homepage():
#     """Show homepage."""

#     return render_template('index.html')

# @app.route('/moods')


if __name__ == '__main__':
    connect_to_db(app)
    app.run(port=5000, host='0.0.0.0', debug=True)