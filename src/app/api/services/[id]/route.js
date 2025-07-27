import dbConnect, { collections } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {
	try {
		const { id } = await params;
		const servicesCollection = await dbConnect(collections.servicesCollection);

		const service = await servicesCollection.findOne({
			_id: new ObjectId(id),
		});

		if (!service) {
			return new Response(JSON.stringify({ error: "Not Found" }), { status: 404 });
		}

		return new Response(JSON.stringify(service), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		console.error("Service fetch failed", error);
		return new Response(JSON.stringify({ error: "Internal Server Error" }), {
			status: 500,
		});
	}
}
