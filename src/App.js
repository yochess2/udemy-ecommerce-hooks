import { Outlet } from "react-router-dom"

import NavBar from "./NavBar"

const App = () => {
	console.log("APP - ROOT")
	return (
		<>
			<NavBar />
			<Outlet />	
		</>
	)
}

export default App