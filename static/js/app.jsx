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
                <nav className="navbar navbar-expand-lg navbar-light">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {/* Creates a responsive, collapsible navbar using Bootstrap. */}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0 justify-content-center">
                            <li className="nav-item active">
                                <Link to='/' className="nav-link"><button name='home'>Homepage</button></Link>
                            </li>
                            <li className="nav-item active">
                                <Link to='/enter-habit' className="nav-link"><button name='habit'>Habit Entry</button></Link>
                            </li>
                            <li className="nav-item active">
                                <Link to='/enter-mood' className="nav-link"><button name='mood'>Mood Entry</button></Link>
                            </li>
                            <li className="nav-item active">
                                <Link to='/compare' className="nav-link"><button name='compare'>Comparison Page</button></Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                {/* Enables changing views/components based on the navbar button selected and 
                provides a path so it looks like the user is on a differnt page.  */}
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