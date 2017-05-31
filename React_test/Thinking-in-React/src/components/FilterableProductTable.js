import React from 'react';
import SearchBox from './SearchBox.js';
import ProductTable from './ProductTable.js';

export default class FilterableProductTable extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			filterText: '',
			inStockOnly: false //是否只显示库存不为空的商品
		};
		this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
		this.handleInStockInput = this.handleInStockInput.bind(this);
	}
	//用来根据输入值筛选商品
	handleFilterTextInput(filterText){
		this.setState({
			filterText: filterText
		});
	}
	//用来控制是否只显示有库存的商品
	handleInStockInput(inStockOnly){
		this.setState({
			inStockOnly: inStockOnly
		});
	}
	render(){
		return(
			<div>
				<SearchBox
					filterText={this.state.filterText}
					inStockOnly={this.state.inStockOnly}
					onFilterTextInput={this.handleFilterTextInput}
					onInStockInput={this.handleInStockInput}
				 />
				<ProductTable
				products={this.props.products}
				filterText={this.state.filterText}
				inStockOnly={this.state.inStockOnly}
				 />
			</div>
			);
	}
}
