import { useRouteError } from "react-router-dom"

const NoMatchPage = () => {
	const error = useRouteError()
	console.log("Error Render - ", error) //Error has props statusText and message

	return <h1 className="text-danger">Page Not Found</h1>
}

export default NoMatchPage