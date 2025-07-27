import dbConnect, { collections } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions"; // adjust path as needed

export async function DELETE(req, { params }) {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user?.email) {
			return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
		}

		const id = params.id;
		const userEmail = session.user.email;

		const bookingCollection = await dbConnect(collections.bookingCollection);

		// delete only if it belongs to this user
		const result = await bookingCollection.deleteOne({
			_id: new ObjectId(id),
			userEmail: userEmail,
		});

		if (result.deletedCount === 1) {
			return new Response(JSON.stringify({ success: true }), { status: 200 });
		} else {
			return new Response(JSON.stringify({ error: "Not found or not your booking" }), {
				status: 404,
			});
		}
	} catch (error) {
		console.error("DELETE error:", error);
		return new Response(JSON.stringify({ error: "Internal Server Error" }), {
			status: 500,
		});
	}
}
