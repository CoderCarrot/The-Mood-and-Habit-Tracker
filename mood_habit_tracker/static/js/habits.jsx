class HabitForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { choices: null };
        this.makePullDown = this.makePullDown.bind(this);
        this.updateHabitForm = this.updateHabitForm.bind(this);
    
}

updateHabitForm(res) {
    this.setState({ choices: [res.habits] });
}

getHabitChoices() {
    $.get('/habits.json', this.updateHabitForm);
}

componentDidMount() {
    this.getHabitChoices();
}

makePullDown() {
    const pullDownMenus = [];

    for (const pullDownChoices of this.state.choices) {
        pullDownMenus.push(<PullDown choices={pullDownChoices} />);
    }
    return pullDownMenus
}

render() {
    if (this.state.choices) {
        return (
            <div>
                {this.makePullDown()}
                <input type="text" name="zipcode" />
                <br></br>
                <input type="submit" value="Submit"/>
            </div>
        ); 
    }
    return <div>Loading...</div>
}
}

ReactDOM.render(<HabitForm />, document.getElementById('habit-form'));