import React from 'react';

const PinNumber = ({pinNumberChange}) => {
	return (
		<div className='pa2'>
			<input 
				className='tc pa3 ba b--green bg-lightest-blue' 
				placeholder='Pin Number'
				onChange={pinNumberChange}
			/>
		</div>
	);
}

export default PinNumber;
