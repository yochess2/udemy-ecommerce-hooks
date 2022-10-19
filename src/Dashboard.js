import { useEffect, useContext, useState, useCallback } from "react"
import axios from "axios"

import { UserContext } from "./UserContext"
import { OrdersService, ProductsService } from "./Service"

import Order from "./Order"

const urls = {
	orders: "http://localhost:8000/orders",
	products: "http://localhost:8000/products",
	orderId: "http://localhost:8000/orders/"
}

const styles = {
	header: {
		backgroundColor: "#e6e6e6",
		position: "sticky",
		top: "0", 
		zIndex: "1000" 
	}
}

const Dashboard = () => {
	const [orders, setOrders] = useState([])
	const userContext = useContext(UserContext)
	const [showOrderDeletedAlert, setShowOrderDeletedAlert] = useState(false)
	const [showOrderPlacedAlert, setShowOrderPlacedAlert] = useState(false)


	const { getPreviousOrders, getCart } = OrdersService
	const { getProductbyProductId } = ProductsService

	const loadData = useCallback(() => {
		console.log('loading')
		let ordersResponse
		axios.get(urls.orders, { params: { userId: userContext.user.currentUserId } })
		.then(res => {
			ordersResponse = res.data
			return axios.get(urls.products)
		})
		.then(res => {
			ordersResponse.forEach(order => {
				order.product = getProductbyProductId(res.data, order.productId)
			})
			setOrders(ordersResponse)
		})
		.catch(err => {
			console.log("err", err)
		})
	}, [userContext.user.currentUserId, getProductbyProductId])

	const onBuyNowClick = useCallback((orderId, userId, productId, quantity) => {
		if (window.confirm("Do you want to place order for this product?")) {
			const updateOrder = {
				id: orderId,
				productId: productId,
				userId: userId,
				quantity: quantity,
				isPaymentCompleted: true
			}
			const headers = {
				"Content-type": "application/json"
			}

			axios.put(urls.orderId+orderId, updateOrder, headers)
				.then(res => {
					loadData()
					setShowOrderPlacedAlert(true)
				})
		}
	}, [loadData])

	const onDeleteClick = useCallback((orderId) => {
		if (window.confirm("Are you sure to delete this item from cart?")) {
			axios
				.delete(urls.orderId+orderId)
				.then(res => {
					console.log(res.body)
					loadData()
					setShowOrderDeletedAlert(true)
				})
		}
	}, [loadData])

	useEffect(() => {
		// console.log("Dashboard - ComponentDidMount ")
		document.title = "Dashboard - eCommerce"
		loadData()
		return () => { console.log("Dashboard - ComponentWillUnmount") }

	}, [userContext.user.currentUserId, loadData])
	return (
		<div className="row">
			<div className="col-12 py-3 header" style={styles.header}>
				<h4>
					<i className="fa fa-dashboard me-1" />Dashboard{" "}
					<button className="btn btn-sm btn-info text-white" onClick={loadData}>
						<i className="fa fa-refresh">Refresh</i>
					</button>
				</h4>
			</div>
			<div className="col-12">

					{/* previous order starts */}
				<div className="row">
					<div className="col-lg-6 ms-">
						<h4 className="py-2 my-2 text-info border-bottom border-info">
							<i className="fa fa-history me-1" />Previous Orders{" "}
							<span className="badge bg-info">
							{getPreviousOrders(orders).length}
							</span>
						</h4>
						{(getPreviousOrders(orders).length === 0) &&
						<div className="text-danger">No Orders</div>
						}
						{getPreviousOrders(orders).map(order => 
							<Order 
								key={order.id} 
								orderId={order.id}
								productId={order.productId}
								userId={order.userId}
								isPaymentCompleted={order.isPaymentCompleted}
								quantity={order.quantity}
								productName={order.product && order.product.productName}
								price={order.product && order.product.price} 
								onBuyNowClick={onBuyNowClick}
								onDeleteClick={onDeleteClick}
							/>
						)}
					</div>
					{/* previous order ends */}

					{/* cart starts */}
					<div className="col-lg-6">
					<h4 className="py-2 my-2 text-primary border-bottom border-primary">
						<i className="fa fa-shopping-cart me-1" />Cart{" "}
						<span className="badge bg-primary">
						{getCart(orders).length}
						</span>
					</h4>

					{showOrderPlacedAlert ? 
					<div className="alert alert-success alert-dismissible fade show mt-1" role="alert">
						Your Order has been placed. 
						<button className="btn-close" type="button" data-bs-dismiss="alert" aria-label="Close">
						</button>
					</div>
					:
					""
					}

					{showOrderDeletedAlert ? 
					<div className="col-12">
						<div className="alert alert-danger alert-dismissible fade show mt-1" role="alert">
							Your Order has been removed from teh cart
							<button className="btn-close" type="button" data-bs-dismiss="alert" aria-label="Close">
							</button>
						</div>
					</div>
					:
					""
					}

					{(getCart(orders).length === 0) &&
					<div className="text-danger">No Orders</div>
					}
					{(getCart(orders).map(order =>
						<Order 
							key={order.id} 
							orderId={order.id}
							productId={order.productId}
							userId={order.userId}
							isPaymentCompleted={order.isPaymentCompleted}
							quantity={order.quantity}
							productName={order.product && order.product.productName}
							price={order.product && order.product.price} 
							onBuyNowClick={onBuyNowClick}
							onDeleteClick={onDeleteClick}
						/>

					))}
					</div>
					{/* cart ends */}
			
				</div>
			</div>
		</div>
	)
}

export default Dashboard