import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { CartProvider } from "@/providers";
import { Toaster } from "react-hot-toast";
import { Footer, Header } from "@/components/layout";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "E-com",
  description: "E app",
  icons: "/fav.ico",
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} text-slate-700 flex flex-col min-h-screen`}
      >
        <Toaster
          toastOptions={{
            style: {
              backgroundColor: "rgb(51 65 85)",
              color: "#fff",
            },
          }}
        />
        <CartProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
