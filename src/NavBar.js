import { useEffect, useContext } from "react"
import { NavLink, } from "react-router-dom"

import { UserContext } from "./UserContext"

const NavBar = () => { 
	useEffect(() => {
		console.count('Navbar Count')
	})

	const userContext = useContext(UserContext)
	// const navigate = useNavigate()

	return (
		<nav className="navbar navbar-expand-lg bg-dark navbar-dark navbar-style">
			<div className="container-fluid">
				<NavLink className="navbar-brand" to="/">eCommerce</NavLink>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">

						{/* Dashboard start */}
						{userContext.user.isLoggedIn && 
						<li className="nav-item">
							<NavLink className="nav-link" aria-current="page" to="dashboard">
								<i className="fa fa-dashboard me-1"/>Dashboard 
							</NavLink>
						</li>
						}
						{/* Dashboard end */}

						{/* Login start */}
						{!userContext.user.isLoggedIn &&
						<li className="nav-item">
							<NavLink className="nav-link" to="login">Login</NavLink>
						</li>
						}
						{/* Login end */}

						{/* Register start */}
						{!userContext.user.isLoggedIn &&
						<li className="nav-item">
							<NavLink className="nav-link" to="register">Register</NavLink>
						</li>	
						}
						{/* Register end */}
					</ul>

					{/* right box starts */}
					{userContext.user.isLoggedIn &&
					<div style={styles.dropdown}>
						<ul className="navbar-nav">
							<li className="nav-item dropdown">
								<NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
									<i className="fa fa-user-circle me-1"/>{userContext.user.currentUserName}
								</NavLink>
								<ul className="dropdown-menu">
									<li><button className="dropdown-item" onClick={onLogoutClick}>Logout</button></li>
								</ul>
							</li>
						</ul>
					</div>
					}
					{/* right box ends */}

				</div>
			</div>
		</nav>
	)

	function onLogoutClick(e) {
		e.preventDefault()
		userContext.setUser({
			isLoggedIn: false,
			currentUserId: null,
			currentUserName: null,
		})
		// navigate("/")
	}
}

let styles = {
	dropdown: {
		marginRight: "100px"
	}
}

export default NavBar