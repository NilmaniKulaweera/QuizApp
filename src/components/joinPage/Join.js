import React from 'react';
import './Join.css';
import Emitter from '../../services/Emitter';


class Join extends React.Component {
    pinNumber = '';

    constructor() {
        super();
        this.state = {
			pinNumber: ''
		}
    }

    pinNumberChange = (event) => {
        this.setState({pinNumber: event.target.value});
    }
    
    buttonClicked = (event) => {
        Emitter.emit('JOIN_CLICKED', this.state.pinNumber);
        console.log(this.state.pinNumber);
    }

    render() {
        return (
            <div className='join-container'>
                <h1 className='f1 white'>Quiz App</h1>
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