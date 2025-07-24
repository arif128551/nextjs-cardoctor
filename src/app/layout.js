import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Providers from "./providers";

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
					<NavBar />
					{children}
				</Providers>
			</body>
		</html>
	);
}
