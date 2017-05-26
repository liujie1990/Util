import React from 'react';
// import TemperatureInput from './TemperatureInput.js';
// import BoilingVerdict from './BoilingVerdict.js';

function BoilingVerdict(props){
	console.log(props.celsius);
	if(props.celsius >= 100){
		return <p>水可以沸腾</p>;
	}
	return <p>水不可以沸腾</p>;
}

export default class Calculator extends React.Component{
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			temperature: ''
		};
	}
	handleChange(e){
		this.setState({
			temperature: e.target.value
		});
	}
	render(){
		const temperature = this.state.temperature;
		return (
			<fieldset>
				<legend>Enter temperature in Celsius:</legend>
				<input value={temperature} onChange={this.handleChange}/>
				<BoilingVerdict celsius={parseFloat(temperature)} />
			</fieldset>
			);
	}
}
