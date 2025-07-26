"use client";

import { useState } from "react";
import axios from "axios";

const LoginForm = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);

	const handleLogin = async (e) => {
		e.preventDefault();
		setError(null);
		setSuccess(null);
		setLoading(true);

		const form = e.target;
		const email = form.email.value.trim();
		const password = form.password.value;

		// ✅ Client-side validation
		if (!email || !password) {
			setError("Email and password are required.");
			setLoading(false);
			return;
		}

		try {
			const res = await axios.post("/api/login", { email, password });
			setSuccess("Login successful!");
			console.log("Logged in user:", res.data.user);
			form.reset();
			// ⏩ Redirect or set session token if needed
		} catch (err) {
			setError(err?.response?.data?.error || "Login failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleLogin}>
			{/* Email */}
			<div className="mb-6">
				<label htmlFor="email" className="block mb-2 text-sm">
					Email address
				</label>
				<input
					type="email"
					name="email"
					id="email"
					required
					className="w-full px-3 py-2 border rounded-md border-gray-300 text-gray-900"
				/>
			</div>

			{/* Password */}
			<div className="mb-6">
				<label htmlFor="password" className="block mb-2 text-sm">
					Password
				</label>
				<input
					type="password"
					name="password"
					id="password"
					required
					className="w-full px-3 py-2 border rounded-md border-gray-300 text-gray-900"
				/>
			</div>

			{/* Submit */}
			<button type="submit" disabled={loading} className="btn bg-blue-500 text-white w-full hover:bg-blue-600">
				{loading ? "Logging in..." : "Login"}
			</button>

			{/* Feedback */}
			{error && <p className="text-red-500 mt-3">{error}</p>}
			{success && <p className="text-green-600 mt-3">{success}</p>}
		</form>
	);
};

export default LoginForm;
