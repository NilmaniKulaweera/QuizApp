import React from 'react';
import './Join.css';
import { emitJoinRoom, isSocketConnected, emitDisconnectPeer,joinSuccessfull } from '../../services/SocketIoService';


let joinedSuccessfully;
class Join extends React.Component {
    pinNumber = '';
    //history = useHistory();

    constructor() {
        super();
        this.state = {
            username: '',
			pinNumber: ''
		}
    }

    componentDidMount() {
        this.subscribeToObservables(); 
    }

    componentWillUnmount() {
        this.unsubscribeFromObservables();
        // emitDisconnectPeer({username: this.state.username, room: this.state.pinNumber})
        // console.log("leave from room", this.state.pinNumber);
    }

    usernameChange = (event) => {
        this.setState({username: event.target.value});
    }

    pinNumberChange = (event) => {
        this.setState({pinNumber: event.target.value});
    }

    subscribeToObservables = () => {
        joinedSuccessfully =joinSuccessfull.subscribe((join)=>{
            console.log('join fired');
            if(join === 'done'){
                this.props.history.push('/quiz', {username: this.state.username});
            }
        });
    }
    unsubscribeFromObservables() {
        joinedSuccessfully.unsubscribe();
    }

    
    joinQuiz = (event) => {
        if (isSocketConnected()) {
            emitJoinRoom({username: this.state.username, room: this.state.pinNumber});
            console.log("joined to room", this.state.pinNumber);
        }
    }

    render() {
        return (
            <div className='join-container'>
                <h1 className='f1 white'>Quiz App</h1>
                <div className='pa2'>
                    <input 
                        className='tc pa3 ba b--blue bg-white br2' 
                        placeholder='Username'
                        onChange={this.usernameChange}
                    />
                </div>
                <div className='pa2'>
                    <input 
                        className='tc pa3 ba b--blue bg-white br2' 
                        placeholder='Pin Number'
                        onChange={this.pinNumberChange}
                    />
                </div>
                <div className='pa2'>
                    <button 
                        className='tc pa3 ba b--black bg-black white br2' 
                        style={{cursor: "pointer"}}
                        placeholder='Pin Number'
                        onClick={this.joinQuiz}
                    >Join Quiz</button>
                </div>
            </div>        
        )
    }
}

export default Join;