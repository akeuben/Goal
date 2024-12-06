import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";

export const metadata: Metadata = {
    title: "CPSC 471 Project",
    description: "",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Navbar />
                <main>
                    {children}
                </main>
            </body>
        </html>
    );
}
