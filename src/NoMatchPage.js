import { useEffect } from "react"
import { useRouteError } from "react-router-dom"

const NoMatchPage = () => {
	//error has props statusText and message
	const error = useRouteError()
	console.log("Error Render - ", error) 

	useEffect(() => {
		console.log("NoMatchPage - ComponentDidMount ")
		document.title = "NoMatchPage - eCommerce"
		return () => { console.log("NoMatchPage - ComponentWillUnmount") }
	}, [])

	return <h1 className="text-danger">Page Not Found</h1>
}

export default NoMatchPage