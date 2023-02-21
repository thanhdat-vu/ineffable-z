import Link from "next/link";
import { stringToPathName } from "lib/utils";
import Image from "next/image";

interface props {
  cocktail?: any;
  className?: string;
}

const RecipeCard = ({ cocktail, className }: props) => {
  return cocktail ? (
    <Link
      href={`/cocktails/${stringToPathName(cocktail.strDrink)}`}
      className={`space-y-2 mb-10 | inline-block border sm:border-2 border-gold text-center ${className}`}
    >
      <figure>
        <Image
          src={cocktail.strDrinkThumb}
          alt={cocktail.strDrink}
          className="mb-4 | relative top-1 sm:top-2 left-1 sm:left-2 w-full"
          width={200}
          height={200}
        />
        <figcaption>{cocktail.strDrink}</figcaption>
      </figure>
    </Link>
  ) : (
    <div
      className={`space-y-2 mb-10 | border sm:border-2 border-gold text-center animate-pulse ${className}`}
    >
      <div className="mb-6 | relative top-1 sm:top-2 left-1 sm:left-2 w-full h-full bg-gray-900" />
      <div className="w-3/4 mx-auto h-4 bg-gray-900" />
    </div>
  );
};

export default RecipeCard;
