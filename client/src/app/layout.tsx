import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/providers";
import NavBar from "@/components/common/NavBar";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toast } from "@heroui/react";
import Footer from "@/components/Footer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Smart Link",
	description: "Free link shortener.",
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html
			lang="en"
			className="dark overflow-x-clip"
			data-vibrant-palette="true">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased text-foreground bg-background w-full sm:max-w-3/4 mx-auto px-4 sm:px-0 overflow-x-clip`}>
				<Providers>
					<Toast.Provider />
					<NavBar />
					{children}
					<Footer />
					<Analytics />
					<SpeedInsights />
				</Providers>
			</body>
		</html>
	);
}
