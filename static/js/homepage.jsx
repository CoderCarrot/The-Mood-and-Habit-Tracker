class Homepage extends React.Component {
    render() {
        return(
            
            <div id="homepage" className="d-flex align-self-center justify-content-center min-vh-100">
                <h1>Welcome to the Mood & Habit Tracker</h1>
            </div>
            
        );
    }
}

// Commented out in favor of a single-page web-app using React Router. Left in for potential use in changes, debugging, or experimentation.
// ReactDOM.render(<Homepage />, document.getElementById('homepage'));