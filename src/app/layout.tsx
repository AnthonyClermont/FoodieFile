import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

export const font = Quicksand({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Foodie File",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} antialiased`}
      >
        <NavBar />
        {children}
      </body>
    </html>
  );
}
