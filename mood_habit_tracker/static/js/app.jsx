const Router = ReactRouterDOM.BrowserRouter;
const Switch = ReactRouterDOM.Switch;
const Link = ReactRouterDOM.Link;
const Route = ReactRouterDOM.Route;
class App extends React.Component {
    constructor(){
        super();
        this.state = {};
    }


    render(){
        return(
            <Router>
                <Link to='/'><button name='home'>Homepage</button></Link>
                <Link to='/enter-habit'><button name='habit'>Habit Entry</button></Link>
                <Link to='/enter-mood'><button name='mood'>Mood Entry</button></Link>
                <Link to='/compare'><button name='compare'>Comparison Page</button></Link>

                <Switch>
                    <Route path='/'exact={true}>
                        <Homepage />
                    </Route>
                    <Route path='/enter-habit' exact={true}>
                        <HabitForm />
                    </Route>
                    <Route path='/enter-mood' exact={true}>
                        <MoodForm />
                    </Route>
                    <Route path='/compare' exact={true}>
                        <ComparisonForm/>
                    </Route>
                </Switch>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));