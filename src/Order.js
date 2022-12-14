import React from 'react'
import PropTypes from 'prop-types'

const styles = {
	td: {
		width: "100px"
	}
}

const Order = ({ productId, productName, quantity, price, isPaymentCompleted, onBuyNowClick, orderId, userId, onDeleteClick }) => {
	console.count('i ran 3 times')
	return (
		<div className="card my-2 shadow">
			<div className="card-body">
				<h6>
					<i className="fa fa-arrow-right me me-1" />{productName}
						{!isPaymentCompleted ? 
							<div className="float-right">
								<button 
									className="btn btn-sm btn-info me-2"
									onClick={() => {
										onBuyNowClick(orderId, userId, productId, quantity)
									}}
								>
									<i className="fa fa-truck" />{" "}Buy Now
								</button>
								<button 
									className="btn btn-sm btn-danger me-2"
									onClick={() => onDeleteClick(orderId)}
								>
									<i className="fa fa-trash-o" />{" "}Delete
								</button>
							</div>
						: 
						""}
				</h6>
				<table className="table table-sm table-borderless mt-1">
					<tbody>
						<tr>
							<td style={styles.td}>Quantity:</td>
							<td>{quantity}</td>
						</tr>
						<tr>
							<td style={styles.td}>Price:</td>
							<td>{price}</td>
						</tr>
					</tbody>
				</table>

			</div>
		</div>
	)
}

Order.propTypes = {
	productId: PropTypes.number,
	productName: PropTypes.string,
	quantity: PropTypes.number,
	price: PropTypes.number
}

export default React.memo(Order)