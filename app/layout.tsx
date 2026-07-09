import type { Metadata } from "next";
import { Poppins, Mulish, Raleway } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import AuthProvider from "./components/AuthProvider";
import Footer from "./components/Footer";
import { Toaster } from 'react-hot-toast';
import ScrollToTop from "./components/ScrollToTop";

const poppinsSans = Poppins({
  variable: "--font-poppins-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const ralewaysSans = Raleway({
  variable: "--font-raleway-sans",
  subsets: ["vietnamese"],
});
const mulishSans = Mulish({
  variable: "--font-mulish-sans",
  subsets: ["vietnamese"],
});

import { AOSInit } from "./components/AOSInit";

export const metadata: Metadata = {
  title: "N-HOME",
  description: "A modern hotel booking application",
  icons: {
    icon: '/iconne.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ralewaysSans.variable} ${poppinsSans.variable} ${mulishSans.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning

    >

      <body className="min-h-full flex flex-col overflow-x-hidden">
        <ScrollToTop />
        <AOSInit />
        <AuthProvider>
          <Header />
          <main className="flex-1 flex flex-col ">
            {children}
          </main>
        </AuthProvider>
        <Toaster
          position="top-center"
          containerStyle={{ zIndex: 999999 }}
          toastOptions={{
            duration: 3000,
            style: {
              background: '#333',
              color: '#fff',
              fontFamily: 'var(--font-poppins-sans)',
            },
          }}
        />

        <footer className="flex item-center justify-center bg-text font-raleway text-white font-bold">
          <Footer />
        </footer>

      </body>
    </html >
  );
}
