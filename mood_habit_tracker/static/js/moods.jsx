const moodChoices = [
    {
        'value': 'motivation',
        'inner': 'Motivation'
    },
    {
        'value': 'sadness',
        'inner': 'Sadness'
    },
    {
        'value': 'clarity',
        'inner': 'Clarity'
    },
]

// https://dev.to/ycmjason/how-to-create-range-in-javascript-539i
// A range function for making a list of numbers
function range(start, end) {
    let numList = [];
    for (let num = start; num <= end; num++) {
        numList.push(num);
    }
    return numList;
}

// A function for making a list of objects from a list of numbers to insert into the pulldown menu
function numberObjects(numList) {
    const numObjects = [];
    for (const num in numList) {
        numObjects.push(
            {
                'value': num,
                'inner': num
            }
        );
    }
    return numObjects
}

// Number choices for the intensity pulldown menu
const intensityChoices = numberObjects(range(0, 10));

const moodPullDowns = [moodChoices, intensityChoices]

ReactDOM.render(<Form pullDowns={moodPullDowns} />, document.getElementById('mood-form'));