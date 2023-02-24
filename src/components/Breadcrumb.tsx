import Link from "next/link";
import React from "react";
import { UrlObject } from "url";

interface props {
  items: { label: string; link: string | UrlObject }[];
}

const Breadcrumb = ({ items }: props) => {
  return (
    <nav aria-label="breadcrumb">
      <ol>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li className="inline" key={index}>
              {isLast ? (
                item.label
              ) : (
                <Link
                  href={item.link}
                  className={`${!isLast && "text-white/50 hover:text-white"}`}
                >
                  {item.label}
                </Link>
              )}
              {!isLast && <span className="text-white/50"> / </span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
