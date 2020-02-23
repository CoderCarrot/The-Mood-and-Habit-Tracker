class ComparisonForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { choices: null,
                       xAxis: 'Motivation',
                       yAxis: 'Motivation' };
        
        this.makeChoices = this.makeChoices.bind(this);
        this.updateComparisonForm = this.updateComparisonForm.bind(this);
        this.handleXAxisChange = this.handleXAxisChange.bind(this);
        this.handleYAxisChange = this.handleYAxisChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this); 
    }

    updateComparisonForm(res) {
        this.setState({ choices: res.compare });
    }
    
    getCompareChoices() {
        $.get('/comparison_form.json', this.updateComparisonForm);
    }

    componentDidMount() {
        this.getCompareChoices();
    }

    makeChoices() {
        const pullDownChoices = []
        for (const choice of this.state.choices) {
            pullDownChoices.push(<option value={choice}>{choice}</option>)
        }
        return pullDownChoices
    }

    handleSubmit(event) {
        event.preventDefault();
        <ComparisonForm xaxis={this.state.xAxis} yaxis={this.state.yAxis} />
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
                                {this.makeChoices()}
                            </select>
                        </label>
                        <br></br>
                        <label>
                            Y-Axis:
                            <br></br>
                            <select yaxis={this.state.yAxis} onChange={this.handleYAxisChange}>
                                {this.makeChoices()}
                            </select>
                        </label>
                        <br></br>
                        <input type="submit" value="See Comparison"/>
                    </form>
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
    }

    data = {xAxis = this.props.xaxis, yAxis = this.props.yaxis}

    $.get('/comparison_chart_data.json', data, this.createChart);

    

    render() {
        null
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