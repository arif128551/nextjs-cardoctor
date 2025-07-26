// components/auth/SessionChecker.jsx
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const SessionChecker = () => {
	const { data: session, status } = useSession();
	const called = useRef(false);

	useEffect(() => {
		if (status === "authenticated" && session?.user && !called.current) {
			called.current = true;

			toast.success("Login successful!");

			axios
				.post("/api/social-user", {
					name: session.user.name,
					email: session.user.email,
					image: session.user.image,
				})
				.then(() => {
					console.log("✅ User saved in DB");
				})
				.catch((err) => {
					console.error("❌ Error saving social user:", err);
				});
		}
	}, [status, session]);

	return null;
};

export default SessionChecker;
