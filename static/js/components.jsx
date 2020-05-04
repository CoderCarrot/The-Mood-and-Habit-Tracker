// This file is not currently used in the app. It was an attempt at re-usable components 
// before time became a priority.Left in the code bank for future iterations.

// Pulldown menu component to re-use for mood, intensity, and habits
class PullDown extends React.Component {
    constructor(props) {
        super(props);
        this.makeChoices = this.makeChoices.bind(this);
    }
    // bind function in constructor method

    makeChoices() {
        const pullDownChoices = []
        for (const choice of this.props.choices) {
            pullDownChoices.push(<option value={choice.value}>{choice.inner}</option>)
        }
        return pullDownChoices
    }

    render() {
        return (
            <div>
                <select>
                   {this.makeChoices()}
                </select>
            </div>
        )
    }
}

// Attempt at a re-usable form component. Not used. 
class Form extends React.Component {
    constructor(props) {
        super(props);
        this.makePullDown = this.makePullDown.bind(this);
    }

    makePullDown() {
        const pullDownMenus = []
        for (const pullDown of this.props.pullDowns) {
            pullDownMenus.push(<PullDown choices={pullDown} />);
        }
        return pullDownMenus
    }

    render() {
        return (
            <div>
                {this.makePullDown()}
                <input type="text" name="zipcode" />
                <br></br>
                <input type="submit" value="Submit"/>
            </div>
        );
    }
}