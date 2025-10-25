import type { Metadata } from "next";
import "./globals.css";
import {ClerkProvider} from "@clerk/nextjs"
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    template: "%s - Shopcart online store",
    default: "Shopcart online store"
  },
  description: "Shopcart online store, your one stop shop for all your needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="font-poppins antialiased">
          <Header/>
          {children}
          <Footer/>
        </body>
      </html>
    </ClerkProvider>
  );
}
