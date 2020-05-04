class ComparisonForm extends React.Component {
    constructor(props) {
        super(props);

        // Default state of this component. Using null for "choices" enables conditional rendering.
        // "Drink 20 oz of water" and "Motivation" are the first choice in their respective drop-down menus so that they
        // will be sent to the backend, even if the drop-down menus are not altered(see "handleChange" below).
        // responseData set to null to enable conditional rendering of chart.
        this.state = { Choices: null,
                       xAxis: 'Drink 20 oz of water',
                       yAxis: 'Motivation',
                       responseData: null
                    };
        
        // Binding like crazy to pass down context to the functions.
        this.makeXChoices = this.makeXChoices.bind(this);
        this.makeYChoices = this.makeYChoices.bind(this);
        this.updateComparisonForm = this.updateComparisonForm.bind(this);
        this.handleXAxisChange = this.handleXAxisChange.bind(this);
        this.handleYAxisChange = this.handleYAxisChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this); 
        this.handleSubmitResponse = this.handleSubmitResponse.bind(this);
    }

    // Sets the state for "choices" to include options for the x and y axis drop-down menus.
    // The state will change from null, therefore satisfying the condition for the conditional render below.
    updateComparisonForm(res) {
        this.setState({ choices: [res.x_choices, res.y_choices] });
    }

    // Sends a get requests to the server to obtain the values for the comparison form this component represents.
    getCompareChoices() {
        $.get('/comparison_form.json', this.updateComparisonForm);
    }

    // Runs above function when component mounts.
    componentDidMount() {
        this.getCompareChoices();
    }

    // Creates the HTML code for the x-axis drop-down menu using the newly updated state.
    // Used in the render funtion to properly place the menu.
    makeXChoices() {
        const pullDownChoices = []
        for (const choice of this.state.choices[0]) {
            pullDownChoices.push(<option value={choice}>{choice}</option>)
        }
        return pullDownChoices
    }

    // Creates the HTML code for the y-axis drop-down menu using the newly updated state.
    // Used in the render funtion to properly place the menu.
    makeYChoices() {
        const pullDownChoices = []
        for (const choice of this.state.choices[1]) {
            pullDownChoices.push(<option value={choice}>{choice}</option>)
        }
        return pullDownChoices
    }

    // Sets the state for reponseData to the values obtained from the query on the 
    // backend to pass down as props for the chart component.
    handleSubmitResponse(res) {
        this.setState({ responseData: res });
    }

    // Prevents the default action of the submit button to redirect, since this is a single-page web-app.
    // Sends a get request to the server that provides the information put in by the user to be used in querying the database.
    // Calls the funtion above after data is returned.
    handleSubmit(event) {
        event.preventDefault();
        const data = {xAxis: this.state.xAxis, yAxis: this.state.yAxis}
        $.get('/comparison_chart.json', data, this.handleSubmitResponse);
    }

    // Sets the state to the drop-down menu option chosen for the x-axis. The default option is "drink 20 oz water" in the case 
    // the user does not alter the drop-down menu and therefore this function is not called.
    handleXAxisChange(event) {
        // Left in for ease of future debugging.
        // console.log(event.target.value);
        this.setState({xAxis: event.target.value});
    }

    // Sets the state to the drop-down menu option chosen for the y-axis. The default option is "motivation" in the case 
    // the user does not alter the drop-down menu and therefore this function is not called.
    handleYAxisChange(event) {
        // Left in for ease of future debugging.
        // console.log(event.target.value);
        this.setState({yAxis: event.target.value});
    }

    render() {
        // Conditional rendering to allow asynchronous function calls, ensuring the data needed is present before attempted use. 
        if (this.state.choices) {
            return (
                // Responsive Bootstrap formatting to allow form to be usable on multiple monitor sizes.
                <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4" id="form">
                    <h2>Choose Axis Here</h2>
                    {/* Calls to a function above when the submit button is clicked to prevent default and handle data appropriately. */}
                    <form onSubmit={this.handleSubmit}>
                        {/* The x-axis drop-down menu box for the form. */}
                        <div className="form-group">
                            <label>
                                X-Axis:
                                <br></br>
                                {/* Sets the shown value to the current state so the user can see the option chosen and what will be sent 
                                to the backend for processing and querying the database.
                                Calls the appropriate function to handle a change in drop-down menu selection in order to send proper data 
                                to the backend for processing. */}
                                <select className="form-control" value={this.state.xAxis} onChange={this.handleXAxisChange}>
                                    {/* Calls the function that creates the HTML for the x-axis drop-down menu. */}
                                    {this.makeXChoices()}
                                </select>
                            </label>
                        </div>
                        {/* The y-axis drop-down menu box for the form. */}
                        <div className="form-group">
                            <label>
                                Y-Axis:
                                <br></br>
                                {/* Sets the shown value to the current state so the user can see the option chosen and what will be sent 
                                to the backend for processing and querying the database.
                                Calls the appropriate function to handle a change in drop-down menu selection in order to send proper data 
                                to the backend for processing. */}
                                <select className="form-control" value={this.state.yAxis} onChange={this.handleYAxisChange}>
                                    {/* Calls the function that creates the HTML for the y-axis drop-down menu. */}
                                    {this.makeYChoices()}
                                </select>
                            </label>
                        </div>
                        {/* Sets submit button text to "See Comparison" and uses Bootstrap to format the button to their "dark" option. */}
                        <input type="submit" value="See Comparison" className="btn btn-dark"/>
                    </form>
                    {/* Renders the chart component which is empty until the proper data comes from the backend to be passed down as a prop */}
                    <ComparisonChart responseData={this.state.responseData}/>
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
// ReactDOM.render(<ComparisonForm />, document.getElementById('comparison-form'));

// Chart component used in comparison page.
class ComparisonChart extends React.Component {

    constructor(props) {

        super(props);

        // Creates a chart ref and applies context for creation of the chart using chart.JS.
        this.chartRef = React.createRef();

        // Initial state is false to allow for conditional rendering.
        this.state = {chart: false};

        // Binding to pass down context.
        this.createChart = this.createChart.bind(this);
        this.updateChart = this.updateChart.bind(this);
    }

    // Checks if the component updates with new props and state.
    // Creates a new chart if a chart has not been created.
    // Updates the chart if one already exists. 
    // This allows for smooth transition when choosing different comparison options.
    componentDidUpdate(prevProps){
        if (this.chartRef.current !== null && this.state.chart === false){
            this.createChart();
        }
        if (this.state.chart === true){
            this.updateChart();
        }   
    }

    // Uses chart.JS library to create a bar-chart for the chosen comparison.
    createChart() {
        // Sets the state to True so the chart is updated instead of created the next 
        // time the coomparison form is submitted without reloading the page.
        this.setState({chart: true})
        Chart.defaults.global.defaultFontColor = 'black';
        let ctx = document.getElementById('bar-chart');
        if (ctx) {
            this.barChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: this.props.responseData.labels,
                    datasets: [
                        {
                            // Creates the mouse-over label for the y-axis.
                            label: `Intensity of ${this.props.responseData.y_axis}`,
                            backgroundColor: ['#4ac828', '#d38f37', '#5628c8', '#a50101', '#284ac8', '#1a0315'],
                            data: this.props.responseData.data
                        }
                    ]
                },
                options: {
                    legend: {display: false,
                        },
                    title: {
                        display: true,
                        // Creates the chart title to reflect the comparison shown.
                        text: `${this.props.responseData.y_axis} Intensity versus ${this.props.responseData.x_axis}`
                    },
                    scales: {
                        yAxes: [{
                          ticks: {
                            min: 0,
                            max: 10
                          }
                        }]
                    }
                }
            });
        }
    }

    // Use the chart.JS library to update the charts data when different comparison options are chosen and submitted. 
    updateChart(){
        this.barChart.data.labels = this.props.responseData.labels;
        // Updates the mouse-over label for the y-axis.
        this.barChart.data.datasets[0].label = `Intensity of ${this.props.responseData.y_axis}`;
        this.barChart.data.datasets[0].data = this.props.responseData.data;
        // Updates the chart title to reflect the comparison shown.
        this.barChart.options.title.text = `${this.props.responseData.y_axis} Intensity versus ${this.props.responseData.x_axis}`;
        this.barChart.update();
    }

    render() { 
        // Conditional rendering to allow asynchronous function calls, ensuring the data needed is present before attempted use. 
        if (this.props.responseData) {
            return (
                <div>
                    {/* Creates the chart after responseData has a value other than null. */}
                    <canvas id="bar-chart" ref={this.chartRef} width="800" height="450"/>
                </div>
            );
        }
        // Returns null before there has been data received from the backend to show in a chart.
        return null

        
    }
}