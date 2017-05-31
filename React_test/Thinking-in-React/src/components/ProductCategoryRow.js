import React from 'react';
//这是商品类名称组件
export default class ProductCategoryRow extends React.Component{
	render(){
		return(
			<tr>
			<th colSpan="2">
				{this.props.category}
			</th>
			</tr>
			);
	}
}
