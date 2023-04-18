import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios library
import styles from "../styles/SignUpForm.module.css";

const api = axios.create({
	baseURL: "http://localhost:5000/api",
});

const SignUpForm = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [address, setAddress] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [role, setRole] = useState("buyer");

	const handleSubmit = async (event) => {
		// Make handleSubmit asynchronous to use Axios for API calls
		event.preventDefault();
		const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
		if (!password.match(passwordRegex)) {
			setPasswordError(
				"Password must contain at least 8 characters, including 1 uppercase letter, 1 number, and 1 symbol."
			);
			return;
		}

		try {
			// Use Axios to send POST request to server with form data
			const response = await api.post("/signup", {
				firstName,
				lastName,
				address,
				username,
				password,
				role,
                id
			});
			console.log("Response:", response.data);
			// Clear form fields
			setFirstName("");
			setLastName("");
			setAddress("");
			setUsername("");
			setPassword("");
			setPasswordError("");
		} catch (error) {
			console.error("Error:", error);
			// Handle error and show error message to user
		}
	};

	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<label htmlFor='firstName' className={styles.label}>
				First Name
			</label>
			<input
				type='text'
				id='firstName'
				value={firstName}
				onChange={(e) => setFirstName(e.target.value)}
				className={styles.input}
			/>
			<label htmlFor='lastName' className={styles.label}>
				Last Name
			</label>
			<input
				type='text'
				id='lastName'
				value={lastName}
				onChange={(e) => setLastName(e.target.value)}
				className={styles.input}
			/>
			<label htmlFor='address' className={styles.label}>
				Address
			</label>
			<input
				type='text'
				id='address'
				value={address}
				onChange={(e) => setAddress(e.target.value)}
				className={styles.input}
			/>
			<label htmlFor='username' className={styles.label}>
				Username
			</label>
			<input
				type='text'
				id='username'
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				className={styles.input}
			/>
			<label htmlFor='password' className={styles.label}>
				Password
			</label>
			<input
				type='password'
				id='password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				className={styles.input}
			/>
			<label htmlFor='role' className={styles.label}>
				Role
			</label>
			<select id='role' value={role} onChange={(e) => setRole(e.target.value)} className={styles.input}>
				<option value='buyer'>Buyer</option>
				<option value='seller'>Seller</option>
			</select>
			{passwordError && <p className={styles.errorText}>{passwordError}</p>}
			<button type='submit' className={styles.button}>
				Sign Up
			</button>
			<p className={styles.loginText}>
				Already have an account?
				<Link to='/login' className={styles.loginLink}>
					Login
				</Link>
			</p>
		</form>
	);
};

export default SignUpForm;
