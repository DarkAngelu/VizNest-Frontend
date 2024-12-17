import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSignup = async (e: React.FormEvent) => {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;

		e.preventDefault();
		try {
			const response = await fetch(`${backendUrl}/api/signup`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, password }),
				credentials: "include",
			});

			if (response.ok) {
				navigate("/");
			} else {
				const data = await response.json();
				alert(data.message || "Signup failed");
			}
		} catch (error) {
			console.error("Signup error:", error);
			alert("Signup failed");
		}
	};

	return (
		<div className="signup-container">
			<h2>Sign Up</h2>
			<form onSubmit={handleSignup}>
				<input
					type="text"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit">Sign Up</button>
			</form>
			<p>
				Already have an account? <a href="/login">Log in</a>
			</p>
		</div>
	);
};

export default Signup;
