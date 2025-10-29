import type { Metadata } from "next";
import {ClerkProvider} from "@clerk/nextjs"
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import "../globals.css";

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
      
      <div className="flex flex-col min-h-screen">
        <Header/>
        <main className="flex-1">{children}</main>
        <Footer/>
      </div>
     
    </ClerkProvider>
  );
}
