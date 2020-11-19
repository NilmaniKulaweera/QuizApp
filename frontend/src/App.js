import React from 'react';
import Join from './components/joinPage/Join';
import Start from './components/startPage/Start';
import Home from './components/homePage/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Error from './components/shared/error/Error';

class App extends React.Component {
    render() {
        return (
            <Router>
                <Route path="/" exact component={Start} />
                <Route path="/Home" exact component={Home} />
                <Route path="/Join" exact component={Join} />
                <Route path="/Error" exact component={Error} />
            </Router>
        )
    }
}

export default App;