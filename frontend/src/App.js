import React, {useEffect, useReducer} from 'react';
import Join from './components/joinPage/Join';
import Start from './components/startPage/Start';
import Home from './components/homePage/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Error from './components/shared/error/Error';
import { setSocketConnection, addSocketListeners, disconnectSocketConnection } from './services/SocketIoService';
import Quiz from './components/quizPage/Quiz';
import Result from './components/resultPage/Result';

export const RoomNumberContext = React.createContext();

const initialRoomNumber = null;
const roomNumberReducer = (state, action) => {
    if (action.type === 'setRoomNumber') {
        return action.value;
    } else {
        return state;
    }       
}

function App() {
    const [roomNumber, dispatchRoomNumber] = useReducer(roomNumberReducer, initialRoomNumber);

    useEffect(() => {
        setSocketConnection();
        addSocketListeners();
        return () => {
            disconnectSocketConnection();
        }
    }, []);

    return (
        <RoomNumberContext.Provider value={{roomNumberState: roomNumber, roomNumberDispatch: dispatchRoomNumber}}>
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
        </RoomNumberContext.Provider>
    );
}

export default App;