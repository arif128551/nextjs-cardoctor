import React from "react";
import dbConnect, { collections } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import CheckoutForm from "@/components/form/CheckoutForm";
import axios from "axios";

// 🟢 ✅ login check
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const CheckoutPage = async ({ params }) => {
	// ✅ 1. check session
	const session = await getServerSession(authOptions);
	if (!session) {
		redirect("/login");
	}

	// ✅ 2. rest of your code untouched
	const { id } = await params;
	const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/services/${id}`);
	const service = res.data;

	return (
		<div>
			<CheckoutForm service={service}></CheckoutForm>
		</div>
	);
};

export default CheckoutPage;
