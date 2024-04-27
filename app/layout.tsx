"use client";
import "./globals.css";
import { useEffect } from "react";
import { Inter } from "next/font/google";
import { useRouter, usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (!token) {
			router.push("/login");
		} else if ((token && pathname === "login") || pathname === "/") {
			router.push("/dashboard");
		}
	}, [pathname]);

	return (
		<html lang="en">
			<body className={inter.className} suppressHydrationWarning={true}>
				{children}
			</body>
		</html>
	);
}
