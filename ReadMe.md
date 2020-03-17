---


---

<h1 id="the-mood-and-habit-tracker"><strong>The Mood and Habit Tracker</strong></h1>
<h2 id="table-of-contents"><strong>Table of Contents</strong></h2>
<ul>
<li><a href="https://github.com/GazKris/HB_Project/blob/master/README.md#summary">Summary</a></li>
<li><a href="https://github.com/GazKris/HB_Project/blob/master/README.md#tech-stack">Tech Stack</a></li>
<li><a href="https://github.com/GazKris/HB_Project/blob/master/README.md#features">Features</a></li>
<li><a href="https://github.com/GazKris/HB_Project/blob/master/README.md#future-features">Future Features</a></li>
<li><a href="https://github.com/GazKris/HB_Project/blob/master/README.md#setupinstallation">Setup/Installation</a></li>
<li><a href="https://github.com/GazKris/HB_Project/blob/master/README.md#about-the-developer">About the Developer</a></li>
</ul>
<h2 id="summary"><strong>Summary</strong></h2>
<p><strong>The Mood and Habit Tracker</strong> is a full-stack web application that allows you to track 3 moods, 3 habits, and weather at time of entry, to see if there is any correlation.<br>
<strong>Deployed Site:</strong> <a href="http://moodsandhabits.com/">The Mood and Habit Tracker</a></p>
<h2 id="tech-stack"><strong>Tech Stack</strong></h2>
<p><strong>Front End:</strong> HTML5, CSS, Bootstrap, JavaScript, React, JQuery, Chart.js<br>
<strong>Back End:</strong> Python, Flask, PostgresSQL, SQLAlchemy, OpenWeatherAPI</p>
<h2 id="features"><strong>Features</strong></h2>
<p>First go to <strong>Habit Entry</strong> and pick any one of the three habits you achieved for the day:</p>
<ul>
<li><em>Drink 20 oz of Water</em></li>
<li><em>Sleep 8 hours</em></li>
<li><em>Exercise for 20 mins</em></li>
</ul>
<p><img src="http://g.recordit.co/z1qoAIbQFS.gif" alt="Picking your habit"></p>
<p>Once you’ve picked the successfully-completed habit you want to enter, type in the zip code for the location the habit was completed and hit <strong>Submit Habit</strong>.<br>
<img src="http://g.recordit.co/hS7j08XFNP.gif" alt="enter image description here"></p>
<p>You can follow the same pattern by going to <strong>Mood Entry</strong> and entering a mood from 3 choices, the intensity of the mood, and your zip code.</p>
<ul>
<li><em>Motivation</em></li>
<li><em>Sadness</em></li>
<li><em>Clarity</em></li>
</ul>
<p><img src="http://g.recordit.co/olEV7J27UR.gif" alt="enter image description here"></p>
<p>Once you’ve kept track of your moods and habits for a few weeks, go to <strong>Comparison Page</strong> to compare any of the habits or weather to any of the moods.<br>
<img src="http://g.recordit.co/Hd1V5qzPDp.gif" alt="enter image description here"></p>
<p>To choose another pair to compare, just change the drop down and click <strong>See Comparison</strong> again.<br>
<img src="http://g.recordit.co/mVKJu5IXMG.gif" alt="enter image description here"></p>
<h2 id="future-features"><strong>Future Features</strong></h2>
<p>In the future, I would like to add:</p>
<ul>
<li>Login/Registration</li>
<li>A more complex data analysis and graph</li>
<li>Customizable habits and moods</li>
<li>More options for comparing data</li>
</ul>
<h2 id="setupinstallation"><strong>Setup/Installation</strong></h2>
<p>To run the app on your local computer, please follow the steps below:</p>
<p>Clone the repository:</p>
<p>(<a href="https://github.com/GazKris/HB_Project.git">The Mood Habit Tracker Repo</a>)</p>
<pre><code> $ git clone https://github.com/GazKris/HB_Project.git
</code></pre>
<p>Create a virtual environment:</p>
<pre><code>$ virtualenv env
</code></pre>
<p>Activate the virtual environment:</p>
<pre><code>$ source env/bin/activate
</code></pre>
<p>Install dependencies:</p>
<pre><code>$ pip3 install -r requirements.txt
</code></pre>
<p>For Flask and the API to run properly, you need a secret key for Flask and an API key from <a href="https://openweathermap.org/api">OpenWeather API</a>.<br>
Make a file called <a href="http://secrets.py">secrets.py</a> and enter the following lines:</p>
<pre><code>key = '[Your OpenWeather API key]'
flask_key = '[Your secret flask key]'
</code></pre>
<p>Save this file in the main folder created by the repo clone.<br>
Create database ‘mood_and_habit_tracker’:</p>
<pre><code>$ createdb mood_and_habit_tracker
</code></pre>
<p>Create your database tables:</p>
<pre><code>$ python3 model.py
</code></pre>
<p>Create fake user info for placeholders:</p>
<pre><code>$ python3 -i seed.py
&gt;&gt; create_fake_users()
</code></pre>
<p>Run app from the command line:</p>
<pre><code>$ python3 server.py
</code></pre>
<p>Visit localhost:5000 on your browser and start entering data, daily!</p>
<h2 id="about-the-developer"><strong>About the Developer</strong></h2>
<p>Kris Casey has a BS in chemical and biomolecular engineering from Georgia Tech. She moved to the bay about 3 years ago and found herself being more and more drawn to programming, trying to incorporate it wherever she could. After spending some time in a regulatory role in biotech, she decided to pursue a more creative and challenging career path via software engineering.</p>
<p>Learn more on <a href="https://www.linkedin.com/in/kriscaseybiotech/">LinkedIn</a>.</p>
<blockquote>
<p>Written with <a href="https://stackedit.io/">StackEdit</a>.</p>
</blockquote>

