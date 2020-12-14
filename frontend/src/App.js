import React from 'react';
import Join from './components/joinPage/Join';
import Start from './components/startPage/Start';
import Home from './components/homePage/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Error from './components/shared/error/Error';
import { setSocketConnection, addSocketListeners, disconnectSocketConnection } from './services/SocketIoService';
import Quiz from './components/quizPage/Quiz';
import Result from './components/resultPage/Result';

class App extends React.Component {
    componentDidMount() {
        setSocketConnection();
        addSocketListeners();
    }

    componentWillUnmount() {
        disconnectSocketConnection();
    }

    render() {
        return (
            <div>
                <Router>
                    <Route path="/" exact component={Start} />
                    <Route path="/Home" handler={Home} component={Home} ></Route>
                    <Route path="/Join" exact component={Join} />
                    <Route path="/Quiz" exact component={Quiz} />
                    <Route path="/Result" exact component={Result} />
                    <Route path="/Error" exact component={Error} />
                </Router>
            </div>
        )
    }
}

export default App;