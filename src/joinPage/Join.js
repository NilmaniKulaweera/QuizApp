import React from 'react';
import PinNumber from './PinNumber';
import JoinButton from './JoinButton';

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
        this.pinNumber = this.state.pinNumber;
        console.log(this.pinNumber);
    }

    render() {
        return (
            <div className='tc'>
                <h1 className='f1'>Quiz App</h1>
                <PinNumber pinNumberChange={this.pinNumberChange}></PinNumber>
                <JoinButton buttonClicked={this.buttonClicked}></JoinButton>
            </div>        
        )
    }
}

export default Join;