import { useState, useEffect } from "react"

const Register = () => {
	const [state, setState] = useState({
		email: "",
		password: "",
		fullName: "",
		dateOfBirth: "",
		gender: "",
		country: "",
		receiveNewsLetter: ""
	})

	const [countries] = useState([
		{ id: 1, countryName: "India" },
		{ id: 2, countryName: "USA" },
		{ id: 3, countryName: "UK" },
		{ id: 4, countryName: "Japan" },
		{ id: 5, countryName: "France" },
		{ id: 6, countryName: "Brazil" },
		{ id: 7, countryName: "Mexico" },
		{ id: 8, countryName: "Canada" },

	])

	useEffect(() => {
		console.log("Register - ComponentDidMount ")
		document.title = "Register - eCommerce"
		return () => { console.log("Register - ComponentWillUnmount") }
	}, [])
 
	useEffect(() => {
		console.log(state)
	})

	return (
		<div className="row">
			<div className="col-lg-6 col-md-7 mx-auto">
				<div className="card border-primary shadow my-2">
					<div className="card-header border-bottom border-primary">
						<h1 className="text-primary text-center" style={styles.header}>
							Register
						</h1>
					</div>
					<div className="card-body border-bottom border-primary">
						
						{/* email start */}
						<div className="row input-group mb-3">
							<label htmlFor="register-email" className="col-lg-4 col-form-label">Email</label>
							<div className="col-lg-8">
								<input
									id="register-email"
									type="text" 
									placeholder="john.doe@gmail.com"
									className="form-control"
									name="email"
									value={state.email}
									onChange={(event) => {
										setState({...state, [event.target.name]:event.target.value})
									}} />
							</div>
						</div>
						{/* email ends */}

						{/* password start */}
						<div className="row input-group mb-3">
							<label htmlFor="register-password" className="col-lg-4 col-form-label">Password</label>
							<div className="col-lg-8">
								<input
									id="register-password"
									type="text" 
									placeholder="abc123"
									className="form-control"
									name="password"
									value={state.password}
									onChange={(event) => {
										setState({...state, [event.target.name]:event.target.value})
									}} />
							</div>
						</div>
						{/* password ends */}

						{/* fullName start */}
						<div className="row input-group mb-3">
							<label htmlFor="register-full-name" className="col-lg-4 col-form-label">Full Name</label>
							<div className="col-lg-8">
								<input
									id="register-full-name"
									type="text"
									placeholder="John Doe"
									className="form-control"
									name="fullName"
									value={state.fullName}
									onChange={(event) => {
										setState({...state, [event.target.name]:event.target.value})
									}} />
							</div>
						</div>
						{/* fullName ends */}

						{/* dateOfBirth start */}
						<div className="row input-group mb-3">
							<label htmlFor="register-dob" className="col-lg-4 col-form-label">Date of Birth</label>
							<div className="col-lg-8">
								<input
									id="register-dob"
									type="date" 
									className="form-control"
									name="dateOfBirth"
									value={state.dateOfBirth}
									onChange={(event) => {
										setState({...state, [event.target.name]:event.target.value})
									}} />
							</div>
						</div>
						{/* dateOfBirth ends */}

						{/* gender start */}
						<div className="row input-group mb-3">
							<label className="col-lg-4 col-form-label">Gender</label>
							<div className="col-lg-8">
								<div className="form-check"> 
									<input
										id="register-gender-male"
										type="radio" 
										className="form-check-input"
										value="male"
										checked={state.gender === "male" ? true : false}
										name="gender"
										onChange={(event) => {
											setState({...state, [event.target.name]:event.target.value})
										}} />
									<label className="form-check-label form-check-inline" htmlFor="register-gender-male">Male</label>
								</div>
								<div className="form-check"> 
									<input
										id="register-gender-female"
										type="radio" 
										className="form-check-input"
										value="female"
										checked={state.gender === "female" ? true : false}
										name="gender"
										onChange={(event) => {
											setState({...state, [event.target.name]:event.target.value})
										}} />
									<label className="form-check-label form-check-inline" htmlFor="register-gender-female">Female</label>
								</div>
							</div>
						</div>
						{/* gender ends */}

						{/* country start */}
						<div className="row input-group mb-3">
							<label htmlFor="register-country" className="col-lg-4 col-form-label">Country</label>
							<div className="col-lg-8">
								<select
									id="register-country"
									type="select" 
									className="form-select"
									name="country"
									value={state.country}
									onChange={(event) => {
										console.log(event.target)
										setState({...state, [event.target.name]:event.target.value})
									}} >
									{countries.map(country => <option key={country.id} value="country">{country.countryName}</option>

									)}
								</select>
							</div>
						</div>
						{/* country ends */}

						{/* receiveNewsLetter start */}
						<div className="row input-group mb-3">
							<label className="col-lg-4 col-form-label" />
							<div className="col-lg-8">
								<div className="form-check"> 
									<input
										id="register-receiveNewsLetter"
										type="checkbox" 
										className="form-check-input"
										value="true"
										checked={state.receiveNewsLetter ? true : false}
										name="receiveNewsLetter"
										onChange={(event) => {
											setState({...state, [event.target.name]:event.target.checked})
										}} />
									<label className="form-check-label form-check-inline" htmlFor="register-receiveNewsLetter">
										Receive News Letter
									</label>
								</div>
							</div>
						</div>
						{/* receiveNewsLetter ends */}

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

export default Register