class MoodForm extends React.Component {
    
    // 0-10 number loop
        // To use range I have to create it?
    // 3 hard-coded moods from server?

    render() {
        return (
            // dropdown function with mood-form-specific info
        )
    }
}

function range(start, end) {
    const ans = [];
    for (let i = start; i <= end; i++) {
        ans.push(i);
    }
    return ans;
}

function numberObjects(numList) {
    const numObjects = [];
    for (const num in numList) {
        numObjects.push(
            {
                value: num
                inner: num
            }
        );
    }
}



const moodChoices = [
    {
        value: 'motivation',
        inner: 'Motivation'
    },
    {
        value: 'sadness',
        inner: 'Sadness'
    },
    {
        value: 'clarity',
        visual: 'Clarity'
    },
]

const intensityChoices = numberObjects(range(0, 10))

<Pulldown choices={moodChoices} />
<Pulldown choices={intensityChoices} />



ReactDOM.render(<MoodForm />, document.getElementById('mood-form'));

class PullDown extends React.Component {
    constructor(props) {
        super(props);
        this.makeChoices = this.makeChoices.bind(this);
    }
    // bind function in constructor method

    makeOptions() {
        const options = []
        // loop over this.props.options
        // make a option tag out of each one 
        // push it into our list 
        return options
    }

    render() {
        return (
            <div>
                <select>
                   {this.makeOptions()}
                </select>
            </div>
        )
    }
}


// Do I want to set state so it know which of the drop down options was chosen?
// component with props for specificity this.props.list



{/* <form action="/moods" method="POST" name="mood_input">
Enter Mood: 
<select name="mood_options">
    {% for mood in moods %}
        <option value="{{ mood }}">{{ mood }}</option>
    {% endfor %}
</select>
<br>
Enter Intensity:
<select name="intensity">
    {% for num in range(11) %}
        <option value="{{ num }}">{{ num }}</option>
    {% endfor %}
</select>
<br>
Zipcode:
<input type="text" name="zipcode">
<br>
<input type="submit" name="submit_button" value="Submit Mood">
</form> */}