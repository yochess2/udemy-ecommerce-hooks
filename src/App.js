import { useState, useEffect } from "react"
import { Outlet, useNavigate, useLocation } from "react-router-dom"

import { UserContext } from "./UserContext"

import NavBar from "./NavBar"

const App = () => {
	const navigate = useNavigate()
	const location = useLocation()

	const [user, setUser] = useState({
		isLoggedIn: false,
		currentUserId: null,
		currentUserName: null,
	})

	useEffect(() => {
		console.count("ROOT")
		if (user.isLoggedIn && location.pathname === "/login") {
			navigate("/dashboard")
		}
		if (user.isLoggedIn && location.pathname === "/register") {
			navigate("/dashboard")
		} 
		if (!user.isLoggedIn && location.pathname === "/") {
			navigate("/login")
		}
		if (!user.isLoggedIn && location.pathname === "/dashboard") {
			navigate("/login")
		}
	}, [user.isLoggedIn, location, navigate])

	return (
		<UserContext.Provider value={{ user, setUser }}>
			<NavBar />
			<Outlet />	
		</UserContext.Provider>
	)
}

export default App