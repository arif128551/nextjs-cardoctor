import React from "react";

const page = () => {
	return (
		<div>
			<div></div>
			<div>
				<form action="">
					<div>
						<label className="label">Email</label>
						<input type="email" className="input" placeholder="Email" />
					</div>
					<div>
						<label className="label">Password</label>
						<input type="password" className="input" placeholder="Password" />
					</div>
					<div>
						<a className="link link-hover">Forgot password?</a>
					</div>
					<button className="btn btn-neutral mt-4">Login</button>
				</form>
			</div>
		</div>
	);
};

export default page;
