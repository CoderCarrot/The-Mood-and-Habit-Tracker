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
                <nav class="navbar navbar-expand-lg navbar-light bg-success">
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li class="nav-item active">
                                <Link to='/' class="nav-link"><button name='home'>Homepage</button></Link>
                            </li>
                            <li class="nav-item active">
                                <Link to='/enter-habit' class="nav-link"><button name='habit'>Habit Entry</button></Link>
                            </li>
                            <li class="nav-item active">
                                <Link to='/enter-mood' class="nav-link"><button name='mood'>Mood Entry</button></Link>
                            </li>
                            <li class="nav-item active">
                                <Link to='/compare' class="nav-link"><button name='compare'>Comparison Page</button></Link>
                            </li>
                        </ul>
                    </div>
                </nav>
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