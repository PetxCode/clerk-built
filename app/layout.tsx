import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { dbConfig } from "@/utils/dbConfig";
import Header from "./components/Header";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await dbConfig();
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          <div className="m-4 p-4 border rounded-md">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
