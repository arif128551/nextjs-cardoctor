import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import SessionChecker from "@/components/auth/SessionChecker";

const roboto = Inter({
	subsets: ["latin"],
});

export const metadata = {
	title: "Car Doctor",
	description: "Affordable price for car servicing",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${roboto.className} antialiased`}>
				<Providers>
					<SessionProviderWrapper>
						<SessionChecker />
						<NavBar />
						<Toaster position="top-right" />
						{children}
					</SessionProviderWrapper>
				</Providers>
			</body>
		</html>
	);
}
