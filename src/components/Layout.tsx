import { ReactNode } from "react";
import { Playfair_Display } from "@next/font/google";
import Head from "next/head";
import NavBar from "./NavBar";
import Footer from "./Footer";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair-display",
});

interface props {
  metadata: { title: string; description: string };
  children: ReactNode;
}

const Layout = ({ metadata, children }: props) => {
  return (
    <div
      className={`${playfairDisplay.variable} font-serif w-full min-h-screen bg-rich-black text-white text-xs sm:text-base`}
    >
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
