import { useEffect, useContext } from "react"

import { UserContext } from "./UserContext"

const Dashboard = () => {
	const userContext = useContext(UserContext)

	useEffect(() => {
		// console.log("Dashboard - ComponentDidMount ")
		document.title = "Dashboard - eCommerce"
		// return () => { console.log("Dashboard - ComponentWillUnmount") }
	}, [userContext])

	return (
		<div>
			<h1>Dashboard</h1>			
		</div>
	)
}

export default Dashboard