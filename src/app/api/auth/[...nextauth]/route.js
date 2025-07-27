import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import dbConnect, { collections } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

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

				const { password, ...userWithoutPass } = user;
				userWithoutPass.customMessage = "login_success"; // ✅ pass message
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
		signIn: "/login",
	},

	secret: process.env.NEXTAUTH_SECRET,

	callbacks: {
		async signIn({ user, account }) {
			if (account.provider === "google" || account.provider === "github") {
				const usersCollection = await dbConnect(collections.usersCollection);
				const existingUser = await usersCollection.findOne({ email: user.email });

				if (!existingUser) {
					await usersCollection.insertOne({
						name: user.name,
						email: user.email,
						image: user.image,
						createdAt: new Date().toISOString(),
					});

					user.customMessage = "user_created"; // ✅ new account
				} else {
					user.customMessage = "social_login"; // ✅ already exists
				}
			}
			return true;
		},

		async jwt({ token, user }) {
			if (user?.customMessage) {
				token.customMessage = user.customMessage;
			}
			return token;
		},

		async session({ session, token }) {
			if (token?.customMessage) {
				session.customMessage = token.customMessage;
			}
			return session;
		},
	},
});

export { handler as GET, handler as POST };
