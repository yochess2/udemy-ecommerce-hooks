import { Outlet } from "react-router-dom"

import NavBar from "./NavBar"

const App = () => {
	console.log("APP - ROOT")
	return (
		<div className="app">
			<NavBar />
			<Outlet />	
		</div>
	)
}

export default App