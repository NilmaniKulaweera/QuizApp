import React from 'react';
import Join from './components/joinPage/Join';
import Start from './components/startPage/Start';
import Home from './components/homePage/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends React.Component {
    render() {
        return (
            // <Join></Join>
            <Router>
                <Route path="/" exact component={Start} />
                <Route path="/Home" exact component={Home} />
                <Route path="/Join" exact component={Join} />
            </Router>
        )
    }
}

export default App;