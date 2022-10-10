import { useState, useEffect, useCallback, useContext } from "react"
// import { useNavigate } from "react-router-dom"
import axios from "axios"

import { UserContext } from "./UserContext"

const url = "http://localhost:8000/users"
const styles = {
	header: { 
		fontSize: "40px" 
	}
}

const Login = () => {
	// useEffect(() => {
	// 	console.count('Login Count')
	// })
	
	// const navigate = useNavigate()
	const userContext = useContext(UserContext)

	const [email, setEmail] = useState("scott@test.com")
	const [password, setPassword] = useState("Scott123")

	const [dirty, setDirty] = useState({
		email: false,
		password: false,
	})

	const [errors, setErrors] = useState({
		email: [],
		password: [],
	})

	const [message, setMessage] = useState("")

	const validate = useCallback(() => {
		let errorsData = { email: [], password: [] }
		if (!email) {
			errorsData.email.push("Email cannot be blank")
		}
		const validEmailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
		if (email && !validEmailRegex.test(email)) {
			errorsData.email.push("Proper email address is expected")
		}
		if (!password) {
			errorsData.password.push("Password cannot be blank")
		}
		let reRender = false
		for (let control in errorsData) {
			if (errorsData[control][0] !== errors[control][0]) {
				reRender = true
			}
		}
		if (reRender === true) {
			setErrors(errorsData)
		}
	}, [email, password, errors])

	useEffect(() => {
		// console.log("Login - ComponentDidMount ")
		document.title = "Login - eCommerce"
		// return () => { console.log("Login - ComponentWillUnmount") }
	}, [])

	useEffect(validate, [validate])

	// useEffect(() => {
	// 	if (userContext.user.isLoggedIn) {
	// 		navigate("/dashboard")
	// 	}
	// }, [userContext.user, navigate])

	return (
		<div className="row">
			<div className="col-lg-5 col-md-7 mx-auto">
				<div className="card border-success shadow-lg mx-5">
					<div className="card-header border-bottom border-success">
						<h1 className="text-success text-center" style={styles.header}>
							Login
						</h1>
					</div>
					<div className="card-body border-bottom border-success">

						{/* email starts */}
						<div className="mb-3">
							<label htmlFor="login-email">Email</label>
							<input
								type="text"
								className="form-control"
								id="login-email"
								name="email"
								value={email}
								onChange={e => setEmail(e.target.value)}
								placeholder="Enter Email" />
							<div className="text-danger">
								{dirty["email"]&&errors["email"][0]?errors["email"]:""}
							</div>
						</div>
						{/* email ends */}
						
						{/* password starts */}
						<div className="mb-3">
							<label htmlFor="login-password">Password</label>
							<input
								type="password"
								className="form-control"
								id="login-password"
								name="password"
								value={password}
								onChange={e => setPassword(e.target.value)}
								placeholder="Type Password" />
							<div className="text-danger">
								{dirty["password"]&&errors["password"][0]?errors["password"]:""}
							</div>
						</div>
						{/* password ends */}

					</div>
					<div className="card-footer text-center">
						<div className="m-1">{message}</div>
						<button className="btn btn-success m-2" onClick={onLoginClick}>Login</button>
					</div>
				</div> 
			</div>
		</div>
	)

	function onLoginClick(e) {
		e.preventDefault()
		const dirtyData = {...dirty}
		Object.keys(dirty).forEach(control => {
			dirtyData[control] = true
		})
		setDirty(dirtyData)

		if (isValid()) {
			axios.get(url, { params: { email, password } })
			.then(res => {
				if (res.data.length === 0) {
					return setMessage(<span className="text-danger">Unauthorized Login</span>)
				}
				if (res.data.length > 1) {
					return setMessage(<span className="text-danger">More than 2 users, Internal Error</span>)
				}
				setMessage(<span className="text-success">Success</span>)
				const user = res.data[0]
				userContext.setUser({ 
					...userContext.user,
					isLoggedIn: true,
					currentUserName: user.fullName,
					currentUserId: user.id, 
				})
			})
			.catch(err => {
				console.log('error: ', err)
				setMessage(<span className="text-danger">Unable to Connect to Server</span>)
			})
		}


	}

	function isValid() {
		let valid = true
		for (const key in errors) {
			if (errors[key].length > 0) { valid = false }
		}
		return valid
	}
}

export default Login