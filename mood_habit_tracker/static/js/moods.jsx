class MoodForm extends React.Component {
        constructor(props) {
        super(props);
        this.state = [];
        this.makePullDown = this.makePullDown.bind(this);
    }

    makePullDown() {
        const pullDownMenus = []
        for (const mood of this.state) {
            pullDownMenus.push(<PullDown choices={pullDown} />);
        }
        return pullDownMenus
    }

    // did mount
        // http req
                // info
        // state
    // cond render
        // spinner or no

    updateMoods(res) {
        this.setState(res.moods, res.intensity);
    }
    
    getMoodChoices() {
        $.get('/moods.json', this.updateMoods);
    }

    componentDidMount() {
        this.getMoodChoices();
    }

    render() {
        return (
            <div>
                {this.makePullDown()}
                <input type="text" name="zipcode" />
                <br></br>
                <input type="submit" value="Submit"/>
            </div>
        );
    }
}

ReactDOM.render(<MoodForm />, document.getElementById('mood-form'));

// const moodChoices = [
//     {
//         'value': 'motivation',
//         'inner': 'Motivation'
//     },
//     {
//         'value': 'sadness',
//         'inner': 'Sadness'
//     },
//     {
//         'value': 'clarity',
//         'inner': 'Clarity'
//     },
// ]

// // https://dev.to/ycmjason/how-to-create-range-in-javascript-539i
// // A range function for making a list of numbers
// function range(start, end) {
//     let numList = [];
//     for (let num = start; num <= end; num++) {
//         numList.push(num);
//     }
//     return numList;
// }

// // A function for making a list of objects from a list of numbers to insert into the pulldown menu
// function numberObjects(numList) {
//     const numObjects = [];
//     for (const num in numList) {
//         numObjects.push(
//             {
//                 'value': num,
//                 'inner': num
//             }
//         );
//     }
//     return numObjects
// }

// // Number choices for the intensity pulldown menu
// const intensityChoices = numberObjects(range(0, 10));

// const moodPullDowns = [moodChoices, intensityChoices]