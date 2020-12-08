import React from 'react';
import './Start.css';
import { Link } from 'react-router-dom';

class Start extends React.Component {

    render() {
        return (
            <div className='start-page-container'>
                <div className='heading'>
                    <h1 className='f1 white'>Quiz App</h1>
                </div>
                <div className='start-page-button-container'>
                    <Link className="login-to-create pa2" to="/Home">
                        <div style={{width: "100%"}}>
                            <button className='tc pa5 ba b--black bg-black white br2' style={{cursor: "pointer", width: "100%"}}>Login to Create Quiz</button>
                        </div>
                    </Link>
                    <Link className="join pa2" to="/Join">
                        <div style={{width: "100%"}}>
                            <button className='tc pa5 ba b--black bg-black white br2' style={{cursor: "pointer", width: "100%"}}>Join Quiz</button>
                        </div>
                    </Link>
                    
                </div>      
            </div>
        )
    }
}

export default Start;