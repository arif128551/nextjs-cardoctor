import { loginUser } from "@/lib/userController";

export async function POST(request) {
	try {
		const body = await request.json();
		const data = await loginUser(body);
		return Response.json(data, { status: 200 });
	} catch (error) {
		console.error("Login API Error:", error);
		return Response.json({ error: error.message }, { status: 401 });
	}
}
