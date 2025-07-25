"use client";

const RegisterForm = () => {
	const handleRegister = (e) => {
		e.preventDefault();
	};
	return (
		<form onSubmit={handleRegister}>
			<div className="mb-6">
				<label htmlFor="email" className="block mb-2 text-sm">
					Name
				</label>
				<input
					type="text"
					name="name"
					id="name"
					required
					placeholder="Enter Your Name"
					className="w-full px-3 py-2 border rounded-md border-gray-300 text-gray-900"
					data-temp-mail-org="0"
				/>
			</div>
			<div className="mb-6">
				<label htmlFor="email" className="block mb-2 text-sm">
					Email address
				</label>
				<input
					type="email"
					name="email"
					id="email"
					required
					placeholder="Enter Your Email Here"
					className="w-full px-3 py-2 border rounded-md border-gray-300 text-gray-900"
					data-temp-mail-org="0"
				/>
			</div>
			<div className="mb-6">
				<div className="flex justify-between">
					<label htmlFor="password" className="text-sm mb-2">
						Password
					</label>
				</div>
				<input
					type="password"
					name="password"
					autoComplete="current-password"
					id="password"
					required
					placeholder="*******"
					className="w-full px-3 py-2 border rounded-md border-gray-300 text-gray-900"
				/>
			</div>

			<button className="btn bg-red-500 w-full border-red-500 hover:bg-red-600 rounded-lg text-white shadow">
				Register
			</button>
		</form>
	);
};

export default RegisterForm;
