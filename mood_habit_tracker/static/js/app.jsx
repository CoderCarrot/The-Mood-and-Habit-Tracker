const Router = ReactRouterDOM.BrowserRouter;
class App extends React.Component {
    constructor(){
        super();
        this.state = {};
    }


    render(){
        return(
            <Router>
                <ReactRouterDOM.Link to='/enter-habit'><button name='habit'>Habit</button></ReactRouterDOM.Link>
                <ReactRouterDOM.Switch>
                    <ReactRouterDOM.Route path='/' exact={true}>
                        <Homepage />
                    </ReactRouterDOM.Route>
                    <ReactRouterDOM.Route path='/enter-habit'>
                        <HabitForm />
                    </ReactRouterDOM.Route>
                    <ReactRouterDOM.Route path='/enter-mood' component={MoodForm} />
                    <ReactRouterDOM.Route path='/compare' component={ComparisonForm} />
                </ReactRouterDOM.Switch>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));