function BoilingVerdict(props){
	if(props.celsius >= 100){
		return <p>水可以沸腾</p>;
	}
	return <p>水不可以沸腾</p>;
}
