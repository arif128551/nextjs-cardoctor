"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const MyBookings = () => {
	const { data: session, status } = useSession();
	const [bookings, setBookings] = useState([]);

	useEffect(() => {
		if (session?.user?.email) {
			axios
				.get(`/api/bookings?email=${session.user.email}`)
				.then((res) => setBookings(res.data))
				.catch((err) => console.error("Booking fetch error:", err));
		}
	}, [session]);

	const handleDelete = async (id) => {
		const confirm = window.confirm("Are you sure you want to delete this booking?");
		if (!confirm) return;

		try {
			const res = await axios.delete(`/api/bookings/${id}`);
			if (res.data.success) {
				// UI থেকে remove
				setBookings((prev) => prev.filter((b) => b._id !== id));
				toast.success("Booking deleted!");
			} else {
				toast.error("Delete failed.");
			}
		} catch (err) {
			console.error("Delete Error:", err);
			toast.error("Something went wrong.");
		}
	};

	if (status === "loading") return <p className="text-center py-8">Loading...</p>;

	return (
		<div className="max-w-6xl mx-auto p-4">
			<h2 className="text-2xl font-bold mb-6 text-center">My Bookings</h2>

			{bookings.length === 0 ? (
				<p className="text-center">No bookings found.</p>
			) : (
				<div className="overflow-x-auto">
					<table className="table table-zebra w-full border rounded-lg">
						<thead className="bg-base-200 text-base font-semibold">
							<tr>
								<th>#</th>
								<th>Service</th>
								<th>Date</th>
								<th>Phone</th>
								<th>Address</th>
								<th>Amount</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{bookings.map((booking, index) => (
								<tr key={booking._id}>
									<td>{index + 1}</td>
									<td>{booking.serviceTitle}</td>
									<td>{booking.date}</td>
									<td>{booking.phone}</td>
									<td>{booking.address}</td>
									<td>${booking.amount}</td>
									<td className="space-x-2">
										<button onClick={() => handleDelete(booking._id)} className="btn btn-sm btn-error btn-outline">
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default MyBookings;
