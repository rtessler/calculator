import React from 'react';
import ReactDOM from 'react-dom';

import Calculator from './calculator';

export default class Main extends React.Component {

	render() {
	
		return (
			<div className='main'>		

				<h1>casio-SL-300SV</h1>			

				<div className='container'>
			
					<Calculator />

				</div>
				
			</div>
		);
	}
}

ReactDOM.render(<Main />, document.getElementById('content'));