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
        this.postPost = this.postPost.bind(this);
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
            pullDownChoices.push(<option value={choice}>{choice}</option>);
        }
        return pullDownChoices
    }

    postPost() {
        alert('Success!');
        this.setState({habit: 'Drink 20 oz of water'});
        this.setState({zipcode: ' ' });
    }

    handleSubmit(event) {
        event.preventDefault(); 
        $.post('/habits.json', this.state, this.postPost);
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
                <div class="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
                    <h1>Enter Habit Here</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div class="form-group">
                        <label>
                            Habit:
                            <br></br>
                            <select habit={this.state.habit} onChange={this.handleHabitChange} class="form-control">
                                {this.makeHabitChoices()}
                            </select>
                        </label>
                        </div>
                        <div class="form-group">
                        <label>
                            Zipcode:
                            <br></br>
                            <input type="text" zipcode={this.state.zipcode} onChange={this.handleZipChange} class="form-control"/>
                        </label>
                        </div>
                        <input type="submit" value="Submit Habit" class="btn btn-dark"/>
                    </form>
                </div>
            ); 
        }
        return (<div class="spinner-border text-success" role="status">
                    <span class="sr-only">Loading...</span>
                </div>)
    }
}

// ReactDOM.render(<HabitForm />, document.getElementById('habit-form'));