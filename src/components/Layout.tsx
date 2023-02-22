import { ReactNode } from "react";
import Head from "next/head";
import { Playfair_Display } from "@next/font/google";

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
    <div className="w-full min-h-screen bg-rich-black text-white text-xs sm:text-base">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${playfairDisplay.variable} font-serif`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
