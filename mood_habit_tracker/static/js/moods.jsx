class MoodForm extends React.Component {
        constructor(props) {
        super(props);

        this.state = { choices: null };
        this.makePullDown = this.makePullDown.bind(this);
        this.updateMoodForm = this.updateMoodForm.bind(this);
        
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
                    <input type="submit" value="Submit Mood"/>
                </div>
            ); 
        }
        return <div>Loading...</div>
    }
}

ReactDOM.render(<MoodForm />, document.getElementById('mood-form'));