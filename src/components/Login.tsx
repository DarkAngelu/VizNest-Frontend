import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (e: React.FormEvent) => {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;

		e.preventDefault();
		try {
			const response = await fetch(`${backendUrl}/api/login`, {
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
				alert("Login failed");
			}
		} catch (error) {
			console.error("Login error:", error);
			alert("Login failed");
		}
	};

	return (
		<div className="login-container">
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
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
				<button type="submit">Login</button>
			</form>
			<p>
				Don't have an account? <a href="/signup">Sign up</a>
			</p>
		</div>
	);
};

export default Login;
