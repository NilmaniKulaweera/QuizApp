import React from 'react';

const PinNumber = ({pinNumberChange}) => {
	return (
		<div className='pa2'>
			<input 
				className='tc pa3 ba b--blue bg-white' 
				placeholder='Pin Number'
				onChange={pinNumberChange}
			/>
		</div>
	);
}

export default PinNumber;
