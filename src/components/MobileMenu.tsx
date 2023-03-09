import { useState } from "react";
import Link from "next/link";
import { AiOutlineLeft, AiOutlineRight, AiOutlineSearch } from "react-icons/ai";
import { BsList, BsX } from "react-icons/bs";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import categories from "json/categories.json";
import { stringToPathName } from "lib/utils";
import { useRouter } from "next/router";

const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
    setIsSubMenuOpen(false);
  }

  const [keyword, setKeyword] = useState("");
  const router = useRouter();
  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push(`/search?q=${keyword}&isIngredient=0`);
  }

  return (
    <>
      <button
        className="p-1 | md:hidden text-2xl"
        onClick={() => setIsMenuOpen(true)}
        aria-label="Menu"
      >
        <BsList />
      </button>

      {isMenuOpen && (
        <div className="absolute top-0 right-0 w-screen h-max min-h-screen bg-rich-black overflow-hidden">
          <div className="p-2 | flex">
            <button className="ml-auto p-1 text-2xl" onClick={closeMenu}>
              <BsX />
            </button>
          </div>

          <form
            className="m-4 | flex items-center text-rich-black bg-white"
            onSubmit={handleSearch}
          >
            <input
              id="keyword"
              type="text"
              placeholder="Cocktail recipe lookup..."
              className="grow p-3 outline-0"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button className="p-3 text-lg">
              <AiOutlineSearch />
            </button>
          </form>

          <div
            className={`w-[200vw] flex relative transition-all duration-300 ease-out ${
              isSubMenuOpen ? "right-full" : "right-0"
            }`}
          >
            {/* Menu */}
            <div className="px-6 space-y-3 | w-screen">
              <div className="space-y-3">
                <Link href="/cocktails" className="block py-2">
                  Cocktails
                </Link>
                <Link href="/ingredients" className="block py-2">
                  Ingredients
                </Link>
                <button
                  className="w-full flex items-center justify-between py-2"
                  onClick={() => setIsSubMenuOpen(true)}
                >
                  <span>Category</span>
                  <AiOutlineRight />
                </button>
              </div>

              <hr className="border-t border-gray-800" />

              {/* BotNav in Menu */}
              <div className="space-y-3">
                <Link href="/about" className="block py-2">
                  About
                </Link>
                <Link href="/faq" className="block py-2">
                  FAQ
                </Link>
                <Link href="/contact" className="block py-2">
                  Contact
                </Link>
              </div>

              <hr className="border-t border-gray-800" />

              {/* Social Icons */}
              <div className="space-y-3">
                <a href="https://www.facebook.com/" className="block py-2">
                  <FaFacebookF className="inline mr-4" />
                  Facebook
                </a>
                <a href="https://www.tiktok.com/" className="block py-2">
                  <FaTiktok className="inline mr-4" />
                  Tiktok
                </a>
                <a href="https://youtube.com/" className="block py-2">
                  <FaYoutube className="inline mr-4" />
                  Youtube
                </a>
                <a href="https://www.instagram.com/" className="block py-2">
                  <FaInstagram className="inline mr-4" />
                  Instagram
                </a>
                <a href="https://www.pinterest.com/" className="block py-2">
                  <FaPinterestP className="inline mr-4" />
                  Pinterest
                </a>
              </div>
            </div>

            {/* SubMenu */}
            <div className="px-6 space-y-3 | w-screen">
              <button
                className="w-full text-left py-2"
                onClick={() => setIsSubMenuOpen(false)}
              >
                <AiOutlineLeft className="inline text-md mr-2" />
                Back
              </button>

              <hr className="border-t border-gray-800" />

              <div className="space-y-2">
                {categories.map((category, i) => (
                  <Link
                    key={i}
                    href={`/categories/${stringToPathName(category)}`}
                    className="block py-2 hover:bg-white/10"
                    onClick={closeMenu}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
