import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import { collections } from "@/lib/dbConnect";

import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				const userCollection = await dbConnect(collections.usersCollection);
				const user = await userCollection.findOne({ email: credentials.email });

				if (!user) throw new Error("No user found");

				const isValid = await bcrypt.compare(credentials.password, user.password);
				if (!isValid) throw new Error("Invalid password");

				// Remove password before returning
				const { password, ...userWithoutPass } = user;

				return userWithoutPass;
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),

		GitHubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
	],
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/login", // custom login page
	},
	secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
