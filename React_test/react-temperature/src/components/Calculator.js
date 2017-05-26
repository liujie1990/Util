import React from 'react';
import TemperatureInput from './TemperatureInput.js';

function toCelsius(fahrenheit){
	return (fahrenheit - 32) * 5 / 9;
}
function toFahrenheit(celsius){
	return (celsius * 9) / 5 + 32;
}
function tryConvert(temperature,convert){
	const input = parseFloat(temperature);
	//Number.isNaN()用来判断是否为非数字
	if(Number.isNaN(input)){
		return '';
	}
	const output = convert(input);
	const rounded = Math.round(output * 1000) / 1000;
	return rounded.toString();
}
function BoilingVerdict(props){
	// console.log(props.celsius);
	if(props.celsius >= 100){
		return <p>水可以沸腾</p>;
	}
	return <p>水不可以沸腾</p>;
}

export default class Calculator extends React.Component{
	constructor(props){
		super(props);
		this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
		this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
		this.state = {
			temperature: '',
			scale: 'c'
		};
	}
	//当摄氏温度变化的时候，调用该函数
	handleCelsiusChange(temperature){
		this.setState({
			scale: 'c',
			temperature
		});
	}
	//当华氏温度变化的时候，调用该函数
	handleFahrenheitChange(temperature){
		this.setState({
			scale: 'f',
			temperature
		});
	}
	render(){
		const scale = this.state.scale;
		const temperature = this.state.temperature;
		//获取摄氏温度值，如果是华氏温度则转为摄氏温度，否则不转化
		const celsius = scale === 'f' ? tryConvert(temperature,toCelsius) : temperature;
		//获取华氏温度值，如果是摄氏温度则转化为华氏温度，否则不转化
		const fahrenheit = scale === 'c' ? tryConvert(temperature,toFahrenheit) : temperature;
		return (
			<div>
				<TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange}/>
				<TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange}/>
				<BoilingVerdict celsius={parseFloat(temperature)}/>
			</div>
			);
	}
}
