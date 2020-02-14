class Homepage extends React.Component {
    render() {
        return(
            <div>
                <h1>Welcome to your Mood/Habit Tracker</h1>
            </div>
        );
    }
}

ReactDOM.render(<Homepage />, document.getElementById('homepage'));