import React from 'react';
import './Join.css';

import io from 'socket.io-client';

let socket;
const ENDPOINT = 'localhost:3000';

class Join extends React.Component {
    pinNumber = '';

    constructor() {
        super();
        this.state = {
            username: '',
			pinNumber: ''
		}
    }

    componentDidMount() {
        this.setSocketConnection();
        this.addSocketListeners();
    }

    componentWillUnmount() {
        socket.emit('disconnectPeer', {username: this.state.username, room: this.state.pinNumber});
        socket.off();
        console.log("leave from room", this.state.pinNumber);
    }

    setSocketConnection() {
        socket = io(ENDPOINT);
    }

    addSocketListeners() {
        
    }

    usernameChange = (event) => {
        this.setState({username: event.target.value});
    }

    pinNumberChange = (event) => {
        this.setState({pinNumber: event.target.value});
    }
    
    buttonClicked = (event) => {
        socket.emit('join', {username: this.state.username, room: this.state.pinNumber});
        console.log("joined to room", this.state.pinNumber);
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
                        onClick={this.buttonClicked}
                    >Join Quiz</button>
                </div>
            </div>        
        )
    }
}

export default Join;