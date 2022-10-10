import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const url = "http://localhost:8000/users"
const styles = {
	header: { 
		fontSize: "40px" 
	}
}

const Register = () => {
	const navigate = useNavigate()

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
		{ id: 8, countryName: "Canada" }
	])
	const [errors, setErrors] = useState({
		email: [],
		password: [],
		fullName: [],
		dateOfBirth: [],
		gender: [],
		country: [],
		receiveNewsLetter: [],
	})
	const [dirty, setDirty] = useState({
		email: false,
		password: false,
		fullName: false,
		dateOfBirth: false,
		gender: false,
		country: false,
		receiveNewsLetter: false,
	})
	const [message, setMessage] = useState("")

	const validate = useCallback(() => {
		let errorsData = {
			email: [],
			password: [],
			fullName: [],
			dateOfBirth: [],
			gender: [],
			country: [],
			receiveNewsLetter: [],
		}
		//Email
		if (!state.email) {
			errorsData.email.push("Email can't be blank")
		}
		const validEmailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
		if (state.email && !validEmailRegex.test(state.email)) {
			errorsData.email.push("Proper email address is expected")
		}
		//Password
		if (!state.password) {
			errorsData.password.push("Password cannot be blank")
		}
	    const validPasswordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15})/
		if (state.password && !validPasswordRegex.test(state.password)) {
			errorsData.password.push("Password should be 6 to 15 characters long with at least one uppercase letter, one lowercase letter, and one digit")
		}
		//Full Name
		if (!state.fullName) {
			errorsData.fullName.push("Full name cannot be blank")
		}
		//Date of Birth
		if (!state.dateOfBirth) {
			errorsData.dateOfBirth.push("Date of birth cannot be blank")
		}
		//Date of Birth
		if (!state.gender) {
			errorsData.gender.push("Please select either male or female")
		}
		//Country
		if (!state.country) {
			errorsData.country.push("Country cannot be blank")
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
	}, [state, errors])

	//ComponentDidMount and ComponentWillUnmount
	useEffect(() => {
		console.log("Register - ComponentDidMount ")
		document.title = "Register - eCommerce"
		return () => { console.log("Register - ComponentWillUnmount") }
	}, [])
	
	useEffect(validate, [validate])

	useEffect(() => {
		console.count('Register Count')
	})

	return (
		<div className="row">
			<div className="col-lg-6 col-md-7 mx-auto">
				<div className="card border-primary shadow my-2">
					<div className="card-header border-bottom border-primary">
						<h1 className="text-primary text-center" style={styles.header}>
							Register
						</h1>
						<ul className="text-danger">
							{Object.keys(errors).map(control => {
								if (!dirty[control]) { return "" }
								return errors[control].map(err => 
									<li key={err}>{err}</li>
								)
							})}
						</ul>
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
									onChange={e => setState({...state, [e.target.name]:e.target.value})} 
									onBlur={e => setDirty({...dirty,[e.target.name]:true})} />
								<div className="text-danger">
									{dirty["email"]&&errors["email"][0]?errors["email"]:""}
								</div>
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
									onChange={e => setState({...state, [e.target.name]:e.target.value})} 
									onBlur={e => setDirty({...dirty,[e.target.name]:true})} />
								<div className="text-danger">
									{dirty["password"]&&errors["password"][0]?errors["password"]:""}
								</div>
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
									onChange={e => setState({...state, [e.target.name]:e.target.value})} 
									onBlur={e => setDirty({...dirty,[e.target.name]:true})} />
								<div className="text-danger">
									{dirty["fullName"]&&errors["fullName"][0]?errors["fullName"]:""}
								</div>
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
									onChange={e => setState({...state, [e.target.name]:e.target.value})} 
									onBlur={e => setDirty({...dirty,[e.target.name]:true})} />
								<div className="text-danger">
									{dirty["dateOfBirth"]&&errors["dateOfBirth"][0]?errors["dateOfBirth"]:""}
								</div>
							</div>
						</div>
						{/* dateOfBirth ends */}

						{/* gender start */}
						<div className="row input-group mb-3">
							<label className="col-lg-4 col-form-label">Gender</label>
							<div className="col-lg-8">
								<div className="form-check"> 
									<label className="form-check-label form-check-inline" htmlFor="register-gender-male">Male</label>
									<input
										id="register-gender-male"
										type="radio" 
										className="form-check-input"
										value="male"
										checked={state.gender === "male" ? true : false}
										name="gender"
										onChange={e => setState({...state, [e.target.name]:e.target.value})} 
										onBlur={e => setDirty({...dirty,[e.target.name]:true})} />
								</div>
								<div className="form-check"> 
									<label className="form-check-label form-check-inline" htmlFor="register-gender-female">Female</label>
									<input
										id="register-gender-female"
										type="radio" 
										className="form-check-input"
										value="female"
										checked={state.gender === "female" ? true : false}
										name="gender"
										onChange={e => setState({...state, [e.target.name]:e.target.value})} 
										onBlur={e => setDirty({...dirty,[e.target.name]:true})} />
								</div>
								<div className="text-danger">
									{dirty["gender"]&&errors["gender"][0]?errors["gender"]:""}
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
									className="form-select"
									name="country"
									onChange={e => setState({...state, [e.target.name]:e.target.value})}  
									onBlur={e => setDirty({...dirty,[e.target.name]:true})} >
									<option value="">Select a country</option>
									{countries.map(country => 
									<option key={country.id} value={country.countryName}>{country.countryName}</option>
									)}
								</select>
								<div className="text-danger">
									{dirty["country"]&&errors["country"][0]?errors["country"]:""}
								</div>
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
										onChange={e => setState({...state, [e.target.name]:e.target.value})} />
									<label className="form-check-label form-check-inline" htmlFor="register-receiveNewsLetter">
										Receive News Letter
									</label>
								</div>
							</div>
						</div>
						{/* receiveNewsLetter ends */}
					</div>
					<div className="card-footer text-center">
						<div className="m-1">{message}</div>
						<div>
							<button className="btn btn-primary m-2" onClick={onRegisterClick}>
								Register
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
	function onRegisterClick() {
		const dirtyData = {...dirty}
		Object.keys(dirty).forEach(control => dirtyData[control] = true)
		setDirty(dirtyData)

		if (isValid()) {
			axios.post(url, {
				email: state.email,
				password: state.password,
				fullName: state.fullName,
				dateOfBirth: state.dateOfBirth,
				gender: state.gender,
				country: state.country,
				receiveNewsLetter: state.receiveNewsLetter,
			})
			.then(res => {
				setMessage(<span className="text-success">Success</span>)
				navigate("/dashboard")
			})
			.catch(err => setMessage(<span className="text-danger">Errors</span>))
		} else {
			setMessage(<span className="text-danger">Errors</span>)
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

export default Register