import { NavLink, Link } from "react-router-dom"

const NavBar = () => {
	return (
		<nav className="navbar navbar-expand-lg bg-dark navbar-dark navbar-style">
			<div className="container-fluid">
				<NavLink className="navbar-brand" to="/">eCommerce</NavLink>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<NavLink className="nav-link" aria-current="page" to="dashboard">
								<i className="fa fa-dashboard"/>Dashboard 
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="login">Login</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="register">Register</NavLink>
						</li>	
					</ul>

					{/* right box starts */}
					<div style={styles.dropdown}>
						<ul className="navbar-nav">
							<li className="nav-item dropdown">
								<Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
									<i className="fa fa-user-circle"/>User
								</Link>
								<ul className="dropdown-menu">
									<li><Link className="dropdown-item" to="#">Logout</Link></li>
								</ul>
							</li>
						</ul>
					</div>
					{/* right box ends */}
				</div>
			</div>
		</nav>
	)
}

export default NavBar

const styles = {
	dropdown: {
		marginRight: "100px"
	}
}