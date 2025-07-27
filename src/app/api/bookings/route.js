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
