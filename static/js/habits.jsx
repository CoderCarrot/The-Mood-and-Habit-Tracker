class HabitForm extends React.Component {
    constructor(props) {
        super(props);

        // Default state of this component. Using null for "choices" enables conditional rendering.
        // "Drink 20 oz water" is the first choice in the drop-down menu so it
        // will be sent to the backend, even if the drop-down menu is not altered(see "handleChange" below).
        this.state = { choices: null,
                       habit: 'Drink 20 oz of water',
                       zipcode: '' };

        // Binding like crazy to pass down context to the functions.
        this.makeHabitChoices = this.makeHabitChoices.bind(this);
        this.updateHabitForm = this.updateHabitForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleHabitChange = this.handleHabitChange.bind(this);
        this.handleZipChange = this.handleZipChange.bind(this);
        this.postPost = this.postPost.bind(this);
    }

    // Sets the state for "choices" to include options for the habit drop-down menu.
    // The state will change from null, therefore satisfying the condition for the conditional render below.
    updateHabitForm(res) {
        this.setState({ choices: res.habits });
    }

    // Sends a get requests to the server to obtain the values for the habit form this component represents.
    getHabitChoices() {
        $.get('/habits.json', this.updateHabitForm);
    }

    // Runs above function when component mounts.
    componentDidMount() {
        this.getHabitChoices();
    }

    // Creates the HTML code for the habit drop-down menu using the newly updated state.
    // Used in the render funtion to properly place the menu.
    makeHabitChoices() {
        const pullDownChoices = []
        for (const choice of this.state.choices) {
            pullDownChoices.push(<option value={choice}>{choice}</option>);
        }
        return pullDownChoices
    }

    // Pops an alert on the page so the user sees their information has successfuly been entered and posted.
    // Resets the state to defaults so the form can be used again without refreshing the page.
    postPost() {
        alert('Habit has been entered!')
        this.setState({habit: 'Drink 20 oz of water', zipcode: ''});
    }

    // Prevents the default action of the submit button to redirect, since this is a single-page web-app.
    // Sends a post request to the server that provides the information put in by the user to be entered into the database.
    // Calls the funtion above after data is posted.
    handleSubmit(event) {
        event.preventDefault(); 
        $.post('/habits.json', this.state, this.postPost);
        // Future iteration to include code to refresh the page with input data from the last month of inputs.
    }

    // Sets the state to the drop-down menu option chosen for Habit. The default option is "drink 20 oz water" in the case 
    // the user does not alter the drop-down menu and therefore this function is not called.
    handleHabitChange(event) {
        // Left in for ease of future debugging.
        // console.log(event.target.value);
        this.setState({habit: event.target.value});
    }

    // Sets the state for the zipcode typed in. Future iterations to have form validation.
    handleZipChange(event) {
        // Left in for ease of future debugging.
        // console.log(event.target.value);
        this.setState({zipcode: event.target.value});
    }

    render() {
        // Conditional rendering to allow asynchronous function calls, ensuring the data needed is present before attempted use. 
        if (this.state.choices) {
            return (
                // Div containers to allow the formatting desired (centering).
                <div id="top">
                <div id="next">
                {/* Responsive Bootstrap formatting to allow form to be usable on multiple monitor sizes */}
                <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4" id="habit-form">
                    <h2>Enter Habit Here</h2>
                    {/* Calls to a function above when the submit button is clicked to prevent default and handle data appropriately. */}
                    <form onSubmit={this.handleSubmit}>
                        {/* The habit drop-down menu box for the form. */}
                        <div className="form-group">
                            <label>
                                Habit:
                                <br></br>
                                {/* Sets the shown value to the current state so the user can see the option chosen and what will be sent 
                                to the backend for processing and entry into the database.
                                Calls the appropriate function to handle a change in drop-down menu selection in order to send proper data 
                                to the backend for processing. */}
                                <select value={this.state.habit} onChange={this.handleHabitChange} className="form-control">
                                    {/* Calls the function that creates the HTML for the habit drop-down menu. */}
                                    {this.makeHabitChoices()}
                                </select>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                Zipcode:
                                <br></br>
                                {/* Sets the shown value to the current state so the user can see what they typed and what will be sent 
                                to the backend for processing through the API.
                                Calls the appropriate function to handle a change in entry in order to send proper data 
                                to the backend for processing. */}
                                <input type="text" value={this.state.zipcode} onChange={this.handleZipChange} className="form-control"/>
                            </label>
                        </div>
                        {/* Sets submit button text to "Submit Habit" and uses Bootstrap to format the button to their "dark" option. */}
                        <input type="submit" value="Submit Habit" className="btn btn-dark"/>
                    </form>
                </div>
                </div>
                </div>
            ); 
        }
        // Renders a spinner and the word "Loading..." until the form can render with the appropriate data.
        return (<div className="spinner-border text-success" role="status">
                    <span className="sr-only">Loading...</span>
                </div>)
    }
}

// Commented out in favor of a single-page web-app using React Router. Left in for potential use in changes, debugging, or experimentation.
// ReactDOM.render(<HabitForm />, document.getElementById('habit-form'));