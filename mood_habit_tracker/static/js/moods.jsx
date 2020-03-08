class MoodForm extends React.Component {
        constructor(props) {
        super(props);

        this.state = { choices: null,
                       mood: 'Motivation',
                       intensity: 0 };

        this.makeMoodChoices = this.makeMoodChoices.bind(this);
        this.makeIntensityChoices = this.makeIntensityChoices.bind(this);
        this.updateMoodForm = this.updateMoodForm.bind(this);
        this.handleIntensityChange = this.handleIntensityChange.bind(this);
        this.handleMoodChange = this.handleMoodChange.bind(this);
        this.handleZipChange = this.handleZipChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this); 
        this.postPost = this.postPost.bind(this);       
    }

    updateMoodForm(res) {
        this.setState({ choices: [res.moods, res.intensity] });
    }
    
    getMoodChoices() {
        $.get('/moods.json', this.updateMoodForm);
    }

    componentDidMount() {
        this.getMoodChoices();
    }

    // makePullDown() {
    //     const pullDownMenus = [];

    //     for (const pullDownChoices of this.state.choices) {
    //         pullDownMenus.push(<PullDown choices={pullDownChoices} />);
    //     }
    //     return pullDownMenus
    // }

    makeMoodChoices() {
        const pullDownChoices = []
        for (const choice of this.state.choices[0]) {
            pullDownChoices.push(<option value={choice}>{choice}</option>)
        }
        return pullDownChoices
    }

    makeIntensityChoices() {
        const pullDownChoices = []
        for (const choice of this.state.choices[1]) {
            pullDownChoices.push(<option value={choice}>{choice}</option>)
        }
        return pullDownChoices
    }

    postPost() {
        alert('Success!')
    }

    handleSubmit(event) {
        event.preventDefault();
        $.post('/moods.json', this.state, this.postPost)

        // refresh page with input data for last month
    }

    handleMoodChange(event) {
        console.log(event.target.value);
        this.setState({mood: event.target.value});
    }

    handleIntensityChange(event) {
        console.log(event.target.value);
        this.setState({intensity: event.target.value});
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
                            Mood:
                            <br></br>
                            <select mood={this.state.mood} onChange={this.handleMoodChange}>
                                {this.makeMoodChoices()}
                            </select>
                        </label>
                        <br></br>
                        <label>
                            Intensity:
                            <br></br>
                            <select intensity={this.state.intensity} onChange={this.handleIntensityChange}>
                                {this.makeIntensityChoices()}
                            </select>
                        </label>
                        <br></br>
                        <label>
                            Zipcode:
                            <br></br>
                            <input type="text" zipcode={this.state.zipcode} onChange={this.handleZipChange}/>
                        </label>
                        <br></br>
                        <input type="submit" value="Submit Mood"/>
                    </form>
                </div>
            ); 
        }
        return (<div class="spinner-border text-success" role="status">
                    <span class="sr-only">Loading...</span>
                </div>)
    }
}

// ReactDOM.render(<MoodForm />, document.getElementById('mood-form'));