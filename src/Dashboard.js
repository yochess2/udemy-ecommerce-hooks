import { useEffect } from "react"

const Dashboard = () => {
	console.log("Dashboard Render - ")

	useEffect(() => {
		console.log("Dashboard - ComponentDidMount ")
		document.title = "Dashboard - eCommerce"
		return () => { console.log("Dashboard - ComponentWillUnmount") }
	}, [])

	return (
		<div>
			<h1>Dashboard</h1>			
		</div>
	)
}

export default Dashboard