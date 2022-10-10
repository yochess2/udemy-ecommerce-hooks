import { useEffect, useContext, useState } from "react"
import axios from "axios"

import { UserContext } from "./UserContext"
import { OrdersService, ProductsService } from "./Service"

import Order from "./Order"

const urls = {
	orders: "http://localhost:8000/orders",
	products: "http://localhost:8000/products",
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

	const { getPreviousOrders, getCart } = OrdersService
	const { getProductbyProductId } = ProductsService

	useEffect(() => {
		// console.log("Dashboard - ComponentDidMount ")
		document.title = "Dashboard - eCommerce"
		// return () => { console.log("Dashboard - ComponentWillUnmount") }
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

	}, [userContext.user.currentUserId])

	return (
		<div className="row">
			<div className="col-12 py-3 header" style={styles.header}>
				<h4><i className="fa fa-dashboard me-1" />Dashboard</h4>
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
								orderId={order.orderId}
								productId={order.productId}
								userId={order.userId}
								isPaymentCompleted={order.isPaymentCompleted}
								quantity={order.quantity}
								productName={order.product && order.product.productName}
								price={order.product && order.product.price} />
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
					{(getCart(orders).length === 0) &&
					<div className="text-danger">No Orders</div>
					}
					{(getCart(orders).map(order =>
						<Order key={order.id} 
						orderId={order.orderId}
						productId={order.productId}
						userId={order.userId}
						isPaymentCompleted={order.isPaymentCompleted}
						quantity={order.quantity}
						productName={order.product && order.product.productName}
						price={order.product && order.product.price} />

					))}
					</div>
					{/* cart ends */}
			
				</div>
			</div>
		</div>
	)
}

export default Dashboard