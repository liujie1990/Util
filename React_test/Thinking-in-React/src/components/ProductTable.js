import React from 'react';
import ProductCategoryRow from './ProductCategoryRow.js';
import ProductRow from './ProductRow.js';

export default class ProductTable extends React.Component{
	render(){
		var rows = [];
		var lastCategory = null;
		this.props.products.forEach((product) => {
			//如果不满足筛选条件或者商品无库存，则不显示
			if(product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)){
				return;
			}
			if(product.category !== lastCategory){
				rows.push(
					<ProductCategoryRow category={product.category} key={product.category} />
					);
			}
			rows.push(
				<ProductRow product={product} key={product.name} />
			);
			lastCategory = product.category;
		});
		return(
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Price</th>
				</tr>
			</thead>
			<tbody>{rows}</tbody>
		</table>
			);
	}
}
