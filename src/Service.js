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

export const BrandsService = {
	getBrandByBrandId: (brands, brandId) => {
		return brands.find(brand => brand.id === brandId)
	}
}

export const CategoriesService = {
	getCategoryByCategoryId: (categories, categoryId) => {
		return categories.find(category => category.id === categoryId)
	}
}