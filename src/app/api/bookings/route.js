import dbConnect, { collections } from "@/lib/dbConnect";

export async function POST(req) {
	try {
		const body = await req.json();

		const bookingCollection = await dbConnect(collections.bookingCollection);
		const result = await bookingCollection.insertOne(body);

		return new Response(JSON.stringify({ insertedId: result.insertedId }), {
			status: 201,
		});
	} catch (error) {
		console.error("Booking Error:", error);
		return new Response(JSON.stringify({ error: "Failed to book" }), {
			status: 500,
		});
	}
}

export async function GET(req) {
	try {
		const { searchParams } = new URL(req.url);
		const email = searchParams.get("email");

		if (!email) {
			return new Response(JSON.stringify({ error: "Email is required" }), {
				status: 400,
			});
		}

		const bookingCollection = await dbConnect(collections.bookingCollection);
		const bookings = await bookingCollection.find({ userEmail: email }).toArray();

		return new Response(JSON.stringify(bookings), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		console.error("Booking fetch error:", error);
		return new Response(JSON.stringify({ error: "Internal Server Error" }), {
			status: 500,
		});
	}
}
