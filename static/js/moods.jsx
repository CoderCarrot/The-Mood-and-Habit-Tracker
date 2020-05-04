class MoodForm extends React.Component {
        constructor(props) {
        super(props);

        // Default state of this component. Using null for "choices" enables conditional rendering.
        // "Motivation" and "0" are the first choice in their respective drop-down menus so that they 
        // will be sent to the backend, even if the drop - down menues are not altered(see "handleChange" below).
        this.state = { choices: null,
                       mood: 'Motivation',
                       intensity: 0,
                       zipcode: '' };

        // Binding like crazy to pass down context to the functions.
        this.makeMoodChoices = this.makeMoodChoices.bind(this);
        this.makeIntensityChoices = this.makeIntensityChoices.bind(this);
        this.updateMoodForm = this.updateMoodForm.bind(this);
        this.handleIntensityChange = this.handleIntensityChange.bind(this);
        this.handleMoodChange = this.handleMoodChange.bind(this);
        this.handleZipChange = this.handleZipChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this); 
        this.postPost = this.postPost.bind(this);       
    }

    // Sets the state for "choices" to include options for the mood and intesity drop-down menus.
    // The state will change from null, therefore satidfying the condition for the conditional render below.
    updateMoodForm(res) {
        this.setState({ choices: [res.moods, res.intensity] });
    }

    // Sends a get requests to the server to obtain the values for the mood form this component represents.
    getMoodChoices() {
        $.get('/moods.json', this.updateMoodForm);
    }

    // Runs above function when component mounts.
    componentDidMount() {
        this.getMoodChoices();
    }

    // This portion of the code commented out to use in later iterations with reusable components/functions.
    // makePullDown() {
    //     const pullDownMenus = [];

    //     for (const pullDownChoices of this.state.choices) {
    //         pullDownMenus.push(<PullDown choices={pullDownChoices} />);
    //     }
    //     return pullDownMenus
    // }

    // Creates the HTML code for the mood drop-down menus using the newly updated state.
    // Used in the render funtion to properly place the menus.
    makeMoodChoices() {
        const pullDownChoices = []
        for (const choice of this.state.choices[0]) {
            pullDownChoices.push(<option value={choice}>{choice}</option>)
        }
        return pullDownChoices
    }

    // Creates the HTML code for the intensity drop-down menus using the newly updated state.
    // Used in the render funtion to properly place the menus.
    makeIntensityChoices() {
        const pullDownChoices = []
        for (const choice of this.state.choices[1]) {
            pullDownChoices.push(<option value={choice}>{choice}</option>)
        }
        return pullDownChoices
    }

    // Pops an alert on the page so the user sees their information has successfuly been entered and posted.
    // Resets the state to defaults so the form can be used again without sending incorrect data.
    postPost() {
        alert('Mood has been entered!')
        this.setState({mood: 'Motivation', intensity: 0, zipcode: ''});
    }

    // Prevents the default action of the submit button to redirect, since this is a single-page web-app.
    // Sends a post request to the server that provides the information put in by the user to be entered into the datbase.
    // Calls the funtion above after data is posted.
    handleSubmit(event) {
        event.preventDefault();
        $.post('/moods.json', this.state, this.postPost)

        // Future iteration to include code to refresh the page with input data from the last month of inputs.
    }

    // Sets the state to the drop-down menu option chosen for Mood. The default option is "motivation" in the case 
    // the user does not alter the drop-down menu and therefore this function is not called.
    handleMoodChange(event) {
        // Left in for ease of future debugging.
        // console.log(event.target.value);
        this.setState({mood: event.target.value});
    }

    // Sets the state to the drop-down menu option chosen for Intensity. The default option is "0" in the case 
    // the user does not alter the drop-down menu and therefore this function is not called.
    handleIntensityChange(event) {
        // Left in for ease of future debugging.
        // console.log(event.target.value);
        this.setState({intensity: event.target.value});
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
                // Div containers to allow the formatting desired (centering)
                <div id="top">
                <div id="next">
                {/* Responsive Bootstrap formatting to allow form to be usable on multiple monitor sizes */}
                <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4" id="form">
                    <h2>Enter Mood Here</h2>
                    {/* Calls to the function above when the submit button is clicked to prevent default and handle data appropriately. */}
                    <form onSubmit={this.handleSubmit}>
                        {/* The mood drop-down menu box for the form. */}
                        <div className="form-group">
                            <label>
                                Mood:
                                <br></br>
                                {/* Sets the shown value to the current state so the user can see the option chosen and what will be sent 
                                to the backend for processing and entry into the database.
                                Calls the appropriate function to handle a change in drop-down menu selection in order to send proper data 
                                to the backend for processing. */}
                                <select className="form-control" value={this.state.mood} onChange={this.handleMoodChange}>
                                    {/* Calls the function that creates the HTML for the mood drop-down menu. */}
                                    {this.makeMoodChoices()}
                                </select>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                Intensity:
                                <br></br>
                                {/* Sets the shown value to the current state so the user can see the option chosen and what will be sent 
                                to the backend for processing and entry into the database.
                                Calls the appropriate function to handle a change in drop-down menu selection in order to send proper data 
                                to the backend for processing. */}
                                <select className="form-control" value={this.state.intensity} onChange={this.handleIntensityChange}>
                                    {/* Calls the function that creates the HTML for the intensity drop-down menu. */}
                                    {this.makeIntensityChoices()}
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
                                <input className="form-control" type="text" value={this.state.zipcode} onChange={this.handleZipChange}/>
                            </label>
                        </div>
                        {/* Sets submit button text to "Submit mood" and uses Bootstrap to format the button to their "dark" option. */}
                        <input type="submit" value="Submit Mood"  className="btn btn-dark"/>
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
// ReactDOM.render(<MoodForm />, document.getElementById('mood-form'));