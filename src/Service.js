export const OrdersService = {
	getPreviousOrders: (orders) => {
		return orders.filter(order => order.isPaymentCompleted)
	},

	getCart: (orders) => {
		return orders.filter(order => !order.isPaymentCompleted)
	},
}

export const ProductsService = {
	getProductbyProductId: (products, productId) => {
		return products.find(product => product.id === productId)
	}
}