"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavBar = () => {
	const { data: session, status } = useSession();
	console.log(status);
	const navLists = (
		<>
			<li>
				<Link href="/">Home</Link>
			</li>
			<li>
				<Link href={"#"}>About</Link>
			</li>
			<li>
				<Link href={"#"}>Services</Link>
			</li>
			<li>
				<Link href={"#"}>Blog</Link>
			</li>
			<li>
				<Link href={"#"}>Contact</Link>
			</li>
			{status === "authenticated" ? (
				<>
					<li>
						<button onClick={() => signOut()}>Logout</button>
					</li>
				</>
			) : (
				<>
					<li>
						<Link href={"/login"}>Login</Link>
					</li>
					<li>
						<Link href={"/register"}>Register</Link>
					</li>
				</>
			)}
		</>
	);
	return (
		<div className="navbar max-w-7xl mx-auto py-8 px-4">
			<div className="navbar-start">
				<div className="dropdown">
					<div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
						</svg>
					</div>
					<ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
						{navLists}
					</ul>
				</div>
				<Link href={"/"} className="">
					<Image src={"/assets/logo.svg"} alt="Car doctor official logo" width={107} height={87} />
				</Link>
			</div>
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal px-1 gap-6">{navLists}</ul>
			</div>
			<div className="navbar-end">
				<Link href={"/"} className="btn btn-outline border-red-400 text-red-400 rounded-md">
					Appointment
				</Link>
			</div>
		</div>
	);
};

export default NavBar;
