import { useState, useEffect } from "react"

const Login = () => {
	const [email, setEmail] = useState("abc@test.com")
	const [password, setPassword] = useState("abc123")

	useEffect(() => {
		console.log("Login - ComponentDidMount ")
		document.title = "Login - eCommerce"
		return () => { console.log("Login - ComponentWillUnmount") }
	}, [])

	useEffect(() => {
		if (email.indexOf("@") > 0) {
			console.log('valid')
		} else {
			console.log('invalid')
		}
	}, [email])

	useEffect(() => {
		console.log("password", password)
	}, [password])

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
								onChange={event => setEmail(event.target.value)}
								placeholder="Enter Email" />
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
								onChange={event => setPassword(event.target.value)}
								placeholder="Type Password" />
						</div>
						{/* password ends */}

					</div>
				</div> 
			</div>
		</div>
	)
}

let styles = {
	header: { 
		fontSize: "40px" 
	}
}

export default Login
