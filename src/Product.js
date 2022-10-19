import React, { useState, useEffect } from 'react'

const Product = ({prod, onAddToCartClick}) => {
	const [product, setProduct] = useState(prod)

	useEffect(() => {
		setProduct(prod)
	}, [prod])

	return (
		<div className="col-lg-6">
			<div className="card m-1">
				<div className="card-body">
					<h5>
						<i className="fa fa-arrow-right" />
						{" "}{product.productName}
					</h5>
					<div>
						${product.price.toFixed(2)}
					</div>
					<div className="mt-2 text-muted">
						#{" "}{product.brand?.brandName}
						#{" "}{product.category?.categoryName}
					</div>
					<div>
						{[...Array(product.rating).keys()].map(n => {
							return <i className="fa fa-star text-warning" key={n} />
						})}
						{[...Array(5 - product.rating).keys()].map(n => {
							return <i className="fa fa-star-o text-warning" key={n} />
						})}
					</div>
					<div className="float-end">
					{product.isOrdered ?
						<span className="text-primary">Added to Cart!</span>
					:
						<button 
							className="btn btn-sm btn-primary"
							onClick={() => {
								onAddToCartClick(product)
							}}
						>
							<i className="fa fa-cart-plus" />
							Add to Cart
						</button>
					}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Product