import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import Newsletter from "./Newsletter";

const Footer = () => {
  return (
    <div className="space-y-16 mt-24 sm:mt-32">
      <hr className="border-t w-1/2 mx-auto" />
      <div className="text-center">
        <h3 className="mb-4 | font-bold">JOIN OUR EXCLUSIVE GROUP</h3>
        <p>We are cocktail lover, would you like to join us?</p>
        <Newsletter />
      </div>
      <div className="px-8 pb-16 | flex justify-between items-center md:items-start flex-col md:flex-row space-y-2">
        {/* Logo */}
        {/* This div helps center the BotNav */}
        <div className="w-fit md:w-48">
          <Image
            src="/ineffable-logo.svg"
            alt="Ineffable Logo"
            className="w-24 md:w-28"
            width={192}
            height={96}
          />
        </div>

        <div>
          {/* BotNav */}
          <div className="flex items-center flex-col md:flex-row md:space-x-12 space-y-4 md:space-y-0">
            <Link href="/about" className="hover:text-shiny-gold">
              About
            </Link>
            <Link href="/faq" className="hover:text-shiny-gold">
              FAQ
            </Link>
            <Link href="/contact" className="hover:text-shiny-gold">
              Contact
            </Link>
          </div>
          <div className="mt-4 | text-center">Copyright © 2023</div>
        </div>
        {/* Social Media */}
        <div className="flex space-x-2">
          <a
            href="https://www.facebook.com/"
            className="p-2 hover:bg-white/5 hover:text-blue-700"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.tiktok.com/"
            className="p-2 hover:bg-white/10 hover:text-pink-500"
            aria-label="Tiktok"
          >
            <FaTiktok />
          </a>
          <a
            href="https://youtube.com/"
            className="p-2 hover:bg-white/10 hover:text-red-500"
            aria-label="Youtube"
          >
            <FaYoutube />
          </a>
          <a
            href="https://www.instagram.com/"
            className="p-2 hover:bg-white/10 hover:text-pink-600"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.pinterest.com/"
            className="p-2 hover:bg-white/10 hover:text-red-600"
            aria-label="Pinterest"
          >
            <FaPinterestP />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
