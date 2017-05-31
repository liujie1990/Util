import React from 'react';
//这是商品列表项组件
export default class ProductRow extends React.Component{
	render(){
		//如果商品没有库存,商品名字设置为红色
		const name = this.props.product.stocked ?
		this.props.product.name :
		<span style={{color: 'red'}}>
			{this.props.product.name}
		</span>;
		return(
			<tr>
				<td>{name}</td>
				<td>{this.props.product.price}</td>
			</tr>
			);
	}
}
