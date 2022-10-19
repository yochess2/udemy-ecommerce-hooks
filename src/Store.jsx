import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from "./UserContext"
import axios from "axios"
import { BrandsService, CategoriesService } from "./Service"
import Product from "./Product"

function Store() {
	const userContext = useContext(UserContext)
	const [brands, setBrands] = useState([])
	const [categories, setCategories] = useState([])
	const [products, setProducts] = useState([])
	const [productsToShow, setProductsToShow] = useState([])
	const [search, setSearch] = useState("")

	const onAddToCartClick = (product) => {
		(() => {
			const newOrder = {
				userId: userContext.user.currentUserId,
				productId: product.id,
				quantity: 1,
				isPaymentCompleted: false,
			}

			const headers = {
				"Content-Type": "application/json"
			}

			axios.post("http://localhost:8000/orders", newOrder, headers)
				.then(res => {
					const prods = products.map(p => {
						if (p.id === product.id) p.isOrdered = true;
						return p
					})
					setProducts(prods)
					updateProductsToShow()
				})
				.catch(err =>
					console.log('>>>>>>', err))
		})()

	}

	useEffect(() => {
		document.title = "Store - eCommerce";
		(async () => {
			const brandsBody = await axios.get("http://localhost:8000/brands")
				.then(res =>{
					res.data.forEach(brand => {
						brand.isChecked = true  
					})
					setBrands(res.data)
					return res.data
				}) 

			const productsBody = await axios.get("http://localhost:8000/categories")
				.then(res =>{
					res.data.forEach(category => {	
						category.isChecked = true  
					})
					setCategories(res.data)
					return res.data
				})

			axios.get(`http://localhost:8000/products?productName_like=${search}`)
				.then(res =>{
					res.data.forEach(product => {
						product.brand = BrandsService.getBrandByBrandId(brandsBody, product.brandId)
						product.category = CategoriesService.getCategoryByCategoryId(productsBody, product.categoryId)
			
						product.isOrdered = false
					})
					setProducts(res.data)
					setProductsToShow(res.data)
				})

			// }
		})()
	}, [search])

	return (
		<div>
			<div className="row py-3 header">
				<div className="col-lg-3">
					<h4>
						<i className="fa fa-shopping-bag" />{" "}Store{" "}
						<span className="badge bg-secondary">{productsToShow.length}</span>
					</h4>
				</div>

				<div className="col-lg-9">
					<input 
						type="search" 
						value={search} 
						placeholder="Search" 
						className="form-control" 
						autoFocus="autofocus" 
						onChange={e => setSearch(e.target.value)} 

					/>
				</div>

			</div>

			<div className="row">
				<div className="col-lg-3 py-2">
					<div className="my-2">
						<h5>Brands</h5>
						<ul className="list-group list-group-flush">
							{brands.map(brand => {
								return (
									<li className="list-group-item" key={brand.id}>
										<div className="form-check">
											<input 
												type="checkbox" 
												className="form-check-input"
												value="true"
												checked={brand.isChecked}
												onChange={() => { 
													updateBrandIsChecked(brand.id)
												}}
											/>
											<label className="form-check-label" htmlFor={`brand${brand.id}`}>
												{brand.brandName}
											</label>
										</div>
									</li>
								)
							})}
						</ul>
					</div>

					<div className="my-2">
						<h5>Categories</h5>
						<ul className="list-group list-group-flush">
							{categories.map(category => {
								return (
									<li className="list-group-item" key={category.id}>
										<div className="form-check">
											<input 
												type="checkbox" 
												className="form-check-input"
												value="true"
												checked={category.isChecked}
												onChange={() => {
													updateCategoryIsChecked(category.id)
												}}
											/>
											<label className="form-check-label" htmlFor={`category${category.id}`}>
												{category.categoryName}
											</label>
										</div>
									</li>
								)
							})}
						</ul>
					</div>
				</div>

				<div className="col-lg-9">
					<div className="row">
						{productsToShow.map(product => {
							return <Product key={product.id} prod={product} onAddToCartClick={onAddToCartClick}/>
						})}
					</div>
				</div> 
 
			</div>
		</div>
	)

	function updateBrandIsChecked(id) {
		const brandsData = brands.map(brand => {
			if (brand.id === id) brand.isChecked = !brand.isChecked;
			return brand
		})
		setBrands(brandsData)
		updateProductsToShow()
	}

	function updateCategoryIsChecked(id) {
		const categoriesData = categories.map(category => {
			if (category.id === id) category.isChecked = !category.isChecked;
			return category
		})
		setCategories(categoriesData)
		updateProductsToShow()
	}

	function updateProductsToShow() {
		setProductsToShow(products
			.filter(prod => {
				return categories.filter(cat => {
					return cat.id === prod.categoryId && cat.isChecked
				}).length > 0
			})
			.filter(prod => {
				return brands.filter(brand => brand.id === prod.brandId && brand.isChecked).length > 0
			})

		)
	}
}

export default Store