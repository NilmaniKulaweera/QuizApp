import React from 'react';
import './Error.css';

const Error = (props) => {
    const { quizObject } = props;

    return (
        <div className="error pa2">
            <div className="error-card" style={{width: "100%"}}>
                <p className="fw9">An Error Occurred</p>
            </div>
        </div>
    );
}
    
export default Error;