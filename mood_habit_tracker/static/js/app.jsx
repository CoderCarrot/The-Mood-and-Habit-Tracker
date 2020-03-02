const HashRouter = ReactRouterDOM.HashRouter;
class App extends React.Component {
    constructor(){
        super();
        this.state = {};
        
    }


    render(){
        return(
            <HashRouter>
                <ReactRouterDOM.Switch>
                    <ReactRouterDOM.Route path='/' component={Homepage} />
                </ReactRouterDOM.Switch>
            </HashRouter>
        );
    }
}

// ReactDOM.render(<App />, document.getElementById('app'));