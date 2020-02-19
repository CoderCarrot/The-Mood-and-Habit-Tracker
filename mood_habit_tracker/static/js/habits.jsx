class HabitForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { choices: null,
                       value: 'drink',
                       zipcode: 94109 };
        this.makePullDown = this.makePullDown.bind(this);
        this.updateHabitForm = this.updateHabitForm.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleChange = this.handleChange.bind(this);
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

    // handleSubmit(event) {
    //     event.preventDefault();
    //     // refresh page with input data for last month
    // }

    // handleChange(event) {
    //     // What do I do when I have >1 inputs?
    //     console.log(event.target.value);
    // }

    render() {
        if (this.state.choices) {
            return (
                <div>
                    <form >
                        {this.makePullDown()}
                        <input type="text" value={this.state.zipcode} />
                        <br></br>
                        <input type="submit" value="Submit Habit" />
                    </form>
                </div>
            ); 
        }
        return <div>Loading...</div>
    }
}

ReactDOM.render(<HabitForm />, document.getElementById('habit-form'));