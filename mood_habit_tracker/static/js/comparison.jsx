class ComparisonForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { Choices: null,
                       xAxis: 'Drink 20 oz of water',
                       yAxis: 'Motivation',
                       hasSubmitted: null,
                       responseData: null };
        
        this.makeXChoices = this.makeXChoices.bind(this);
        this.makeYChoices = this.makeYChoices.bind(this);
        this.updateComparisonForm = this.updateComparisonForm.bind(this);
        this.handleXAxisChange = this.handleXAxisChange.bind(this);
        this.handleYAxisChange = this.handleYAxisChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this); 
        this.handleSubmitResponse = this.handleSubmitResponse.bind(this);
    }

    updateComparisonForm(res) {
        this.setState({ choices: [res.x_choices, res.y_choices] });
    }
    
    getCompareChoices() {
        $.get('/comparison_form.json', this.updateComparisonForm);
    }

    componentDidMount() {
        this.getCompareChoices();
    }

    makeXChoices() {
        const pullDownChoices = []
        for (const choice of this.state.choices[0]) {
            pullDownChoices.push(<option value={choice}>{choice}</option>)
        }
        return pullDownChoices
    }

    makeYChoices() {
        const pullDownChoices = []
        for (const choice of this.state.choices[1]) {
            pullDownChoices.push(<option value={choice}>{choice}</option>)
        }
        return pullDownChoices
    }

    handleSubmitResponse(res) {
        this.setState({responseData: res});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({hasSubmitted: true})
        const data = {xAxis: this.state.xAxis, yAxis: this.state.yAxis}
        $.get('/comparison_chart.json', data, this.handleSubmitResponse);
        console.log('Submit', this);
        
    //    render compare chart

        // refresh page with input data for last month
    }

    handleXAxisChange(event) {
        console.log(event.target.value);
        this.setState({xAxis: event.target.value});
    }

    handleYAxisChange(event) {
        console.log(event.target.value);
        this.setState({yAxis: event.target.value});
    }



    render() {
        if (this.state.choices) {
            return (
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            X-Axis:
                            <br></br>
                            <select xaxis={this.state.xAxis} onChange={this.handleXAxisChange}>
                                {this.makeXChoices()}
                            </select>
                        </label>
                        <br></br>
                        <label>
                            Y-Axis:
                            <br></br>
                            <select yaxis={this.state.yAxis} onChange={this.handleYAxisChange}>
                                {this.makeYChoices()}
                            </select>
                        </label>
                        <br></br>
                        <input type="submit" value="See Comparison"/>
                    </form>
                    <ComparisonChart responseData={this.state.responseData} />
                </div>
            ); 
        }
        return <div>Loading...</div>

    }
}

ReactDOM.render(<ComparisonForm />, document.getElementById('comparison-form'));

class ComparisonChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {xAxisRes: null,
                      yAxisRes: null,
                      labelsRes: null,
                      labels: null,
                      data: null,
                     };

        this.createChart = this.createChart.bind(this);
        this.createLabels = this.createLabels.bind(this);
        this.createData = this.createData.bind(this);
        this.createChart = this.createChart.bind(this);
        this.unpackProps = this.unpackProps.bind(this);
    }

    unpackProps(){
        console.log('pack', this);
        this.setState({xAxisRes: this.props.responseData.axis.x_axis});
        this.setState({yAxisRes: this.props.responseData.axis.y_axis});
        this.setState({labelsRes: this.props.responseData.labels});
        console.log('unpack', this);
    }

    createLabels(){
        const labels = [];
        if (this.state.xAxisRes === 'Weather sky condition'){
            for (const labelRes in this.state.labelsRes){
                labels.push(labelRes);
            }
        }
        else{
            labels.push(`Did ${this.state.xAxis}`);
            labels.push(`Did not ${this.state.xAxis}`);
        }
        this.setState({labels: {labels}});
    }

    createData(){
        const data = [];
        for (const label in this.state.labelsRes){
            data.push(this.state.labelsRes[label]);
        }
        this.setState({data: {data}});
    }

    createChart() {
        console.log('create');
        this.unpackProps();
        this.createData();
        this.createLabels();
        let comparisonChart = new Chart(document.getElementById('bar-chart'), {
            type: 'bar',
            data: {
                labels: this.state.labels,
                datasets: [
                    {
                        label: 'Intensity of Mood',
                        backgroundColor: ['#4ac828', '#5628c8', '#284ac8'],
                        data: this.state.data
                    }
                ]
            },
            options: {
                legend: {display: false},
                title: {
                    display: true,
                    text: `${this.state.yAxis} Intensity versis ${this.state.xAxis}`
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


    render() {
        if (this.state.data){
            return (
                <div>
                    <canvas id="bar-chart" width="800" height="450"></canvas>
                    <script>{this.createChart()}</script>
                </div>
            );
        }
        else{
            return null
        }
        
    }
}

class ComparePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        null
// conditional: render form. if handleSubmit has happened, render chart
        // or... default comparison based on default state and refresh page after submit
        // separate components? Chart and form component? render separetely on compare page/component?
    }
}