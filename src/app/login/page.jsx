import Image from "next/image";
import React from "react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import LoginForm from "./components/LoginForm";
const page = () => {
	return (
		<div className="flex gap-16 max-w-7xl px-4 mx-auto items-center">
			<figure className="w-auto">
				<Image src={"/assets/images/login/login.svg"} alt={"login image"} width={460} height={502} />
			</figure>
			<div className="p-18 border border-gray-300 rounded-lg w-[611px]">
				<h1 className="text-center text-4xl font-semibold mb-10">Login</h1>
				<LoginForm></LoginForm>
				<div className="mt-7 mb-12 text-center">
					<p className="mb-4">Or Sign In with</p>
					<div className="space-x-3">
						<button className="btn btn-circle shadow-transparent">
							<FaFacebookF />
						</button>
						<button className="btn btn-circle shadow-transparent">
							<FaLinkedinIn />
						</button>
						<button className="btn btn-circle shadow-transparent">
							<FcGoogle />
						</button>
					</div>
				</div>
				<div className="text-center">
					<a className="link link-hover">Forgot password?</a>
				</div>
			</div>
		</div>
	);
};

export default page;
