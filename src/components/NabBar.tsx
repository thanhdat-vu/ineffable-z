import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import categories from "json/categories.json";
import { stringToPathName } from "lib/utils";

const NabBar = () => {
  // check if user has scrolled
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollPositionRef = useRef(0);
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.pageYOffset !== 0);
    }
    window.addEventListener("scroll", handleScroll);
    if (scrollPositionRef.current !== 0) {
      setIsScrolled(scrollPositionRef.current !== 0);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
      scrollPositionRef.current = window.pageYOffset;
    };
  }, []);

  return (
    <div className="sticky top-0 z-20">
      <div className="px-2 md:px-4 | -mt-16 flex justify-between items-center">
        <Link href="/">
          <Image
            src="/ineffable-logo.svg"
            alt="Ineffable Logo"
            className="w-24 md:w-28"
            width={192}
            height={96}
          />
        </Link>

        <div className="hidden md:flex">
          <Link href="/cocktails" className="px-4 py-5 hover:bg-white/10">
            Cocktails
          </Link>
          <Link href="/ingredients" className="px-4 py-5 hover:bg-white/10">
            Ingredients
          </Link>
          <div className="group">
            <button className="px-4 py-5 group-hover:bg-white/10">
              Categories
            </button>
            <div className="relative hidden group-hover:block">
              <div className="absolute top-0 right-0 w-max bg-rich-black/10 backdrop-blur shadow-glass">
                {categories.map((category, i) => (
                  <Link
                    key={i}
                    href={`/categories/${stringToPathName(category)}`}
                    className="p-4 | block text-right hover:bg-white/10"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* On-scrolled Glassmorphism Background */}
      <div
        className={`absolute top-0 -z-10 w-full h-full ${
          isScrolled &&
          "bg-rich-black/10 backdrop-blur shadow-glass transition-all duration-300"
        }`}
      ></div>
    </div>
  );
};

export default NabBar;
