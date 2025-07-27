"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const CheckoutForm = ({ service }) => {
	const { data: session } = useSession();
	const [loading, setLoading] = useState(false); // loading state

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const form = e.target;
		const bookingData = {
			serviceId: service._id,
			serviceTitle: service.title,
			name: form.name.value,
			email: form.email.value,
			phone: form.phone.value,
			date: form.date.value,
			amount: service.price,
			address: form.address.value,
			userEmail: session?.user?.email,
		};

		try {
			const res = await axios.post("/api/bookings", bookingData);
			if (res.data.insertedId) {
				toast.success("Booking Successful!");
				form.reset();
			} else {
				toast.error("Booking failed. Try again.");
			}
		} catch (error) {
			console.error("Booking error:", error);
			toast.error("Something went wrong.");
		} finally {
			setLoading(false); // reset loading
		}
	};

	return (
		<div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow space-y-4">
			<h2 className="text-2xl font-bold mb-4 text-center">Book Service for: {service?.title}</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				{/* Name */}
				<div>
					<label className="block mb-1 font-medium">Full Name</label>
					<input
						type="text"
						name="name"
						defaultValue={session?.user?.name}
						readOnly
						className="w-full px-4 py-2 border rounded-md"
					/>
				</div>

				{/* Email */}
				<div>
					<label className="block mb-1 font-medium">Email</label>
					<input
						type="email"
						name="email"
						defaultValue={session?.user?.email}
						readOnly
						className="w-full px-4 py-2 border rounded-md"
					/>
				</div>

				{/* Due Amount */}
				<div>
					<label className="block mb-1 font-medium">Due Amount</label>
					<input
						type="text"
						name="amount"
						defaultValue={service.price}
						readOnly
						className="w-full px-4 py-2 border rounded-md"
					/>
				</div>

				{/* Phone */}
				<div>
					<label className="block mb-1 font-medium">Phone</label>
					<input type="tel" name="phone" required className="w-full px-4 py-2 border rounded-md" />
				</div>

				{/* Date */}
				<div>
					<label className="block mb-1 font-medium">Date</label>
					<input type="date" name="date" required className="w-full px-4 py-2 border rounded-md" />
				</div>

				{/* Present Address */}
				<div>
					<label className="block mb-1 font-medium">Present Address</label>
					<textarea name="address" required rows="3" className="w-full px-4 py-2 border rounded-md" />
				</div>

				{/* Submit */}
				<div>
					<button
						type="submit"
						disabled={loading}
						className={`w-full font-semibold py-2 rounded-md transition ${
							loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
						}`}
					>
						{loading ? "Submitting..." : "Submit"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default CheckoutForm;
