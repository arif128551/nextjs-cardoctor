import React from "react";
import dbConnect, { collections } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import CheckoutForm from "@/components/form/CheckoutForm";
import axios from "axios";

const CheckoutPage = async ({ params }) => {
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
