class HabitForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { choices: null,
                       habit: 'Drink 20 oz of water',
                       zipcode: ' ' };
        this.makeHabitChoices = this.makeHabitChoices.bind(this);
        this.updateHabitForm = this.updateHabitForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleHabitChange = this.handleHabitChange.bind(this);
        this.handleZipChange = this.handleZipChange.bind(this);
        // this.postPost = this.postPost.bind(this);
    }

    updateHabitForm(res) {
        this.setState({ choices: res.habits });
    }

    getHabitChoices() {
        $.get('/habits.json', this.updateHabitForm);
    }

    componentDidMount() {
        this.getHabitChoices();
    }

    // makePullDown() {
    //     const pullDownMenus = [];

    //     for (const pullDownChoices of this.state.choices) {
    //         pullDownMenus.push(<PullDown choices={pullDownChoices} />);
    //     }
    //     return pullDownMenus
    // }

    makeHabitChoices() {
        const pullDownChoices = []
        for (const choice of this.state.choices) {
            pullDownChoices.push(<option value={choice}>{choice}</option>)
        }
        return pullDownChoices
    }

    // postPost() {
    //     this.alert('Success!')
    // }

    handleSubmit(event) {
        event.preventDefault();
        // $.post('/habits.json', this.state, this.postPost)
        // refresh page with input data for last month
    }

    handleHabitChange(event) {
        console.log(event.target.value);
        this.setState({habit: event.target.value});
    }

    handleZipChange(event) {
        console.log(event.target.value);
        this.setState({zipcode: event.target.value});
    }

    render() {
        if (this.state.choices) {
            return (
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Habit:
                            <br></br>
                            <select habit={this.state.habit} onChange={this.handleHabitChange}>
                                {this.makeHabitChoices()}
                            </select>
                        </label>
                        <br></br>
                        <label>
                            Zipcode:
                            <br></br>
                            <input type="text" zipcode={this.state.zipcode} onChange={this.handleZipChange}/>
                        </label>
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