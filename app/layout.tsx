import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import AuthContextProvider from "./_context/auth-provider";
import SearchTextProvider from "./_context/search-provider";

import NavBar from "./components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Leo Keemer - Portfolio Website",
  description: "Football artwork by Leo Keemer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen `}>
        <AuthContextProvider>
          <SearchTextProvider>
            <NavBar />
            {children}
          </SearchTextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
