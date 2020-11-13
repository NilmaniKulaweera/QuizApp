import React from 'react';

const JoinButton = ({buttonClicked}) => {
	return (
		<div className='pa2'>
			<button 
				className='tc pa3 ba b--green bg-lightest-blue' 
				placeholder='Pin Number'
				onClick={buttonClicked}
			>Join Quiz</button>
		</div>
	);
}

export default JoinButton;
