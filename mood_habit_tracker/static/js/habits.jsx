const habitChoices = [
    {
        'value': 'drink',
        'inner': 'Drink 20 oz of water'
    },
    {
        'value': 'sleep',
        'inner': 'Sleep 8 hours'
    },
    {
        'value': 'exercise',
        'inner': 'Exercise for 20 mins'
    },
]
const habitPullDowns = [habitChoices]
ReactDOM.render(<Form pullDowns={habitPullDowns} />, document.getElementById('habit-form'));
// habits = ['Drink 20 oz of water', 'Sleep 8 hours', 'Exercise for 20 mins']