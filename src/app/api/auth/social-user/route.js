import { saveSocialUser } from "@/lib/userController";

export async function POST(request) {
	try {
		const body = await request.json();
		const insertedId = await saveSocialUser(body);
		return Response.json({ message: "Social user saved", insertedId }, { status: 201 });
	} catch (error) {
		console.error("SocialUser Save Error:", error);
		return Response.json({ error: error.message }, { status: 500 });
	}
}
