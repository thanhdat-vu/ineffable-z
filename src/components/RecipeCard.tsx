import Link from "next/link";
import Image from "next/image";

interface props {
  recipe?: any;
  className?: string;
}

const RecipeCard = ({ recipe, className }: props) => {
  return recipe ? (
    <Link
      href={`/cocktails/${recipe.idDrink}`}
      className={`space-y-2 mb-10 | inline-block border sm:border-2 border-gold text-center ${className}`}
    >
      <figure>
        <Image
          src={recipe.strDrinkThumb}
          alt={recipe.strDrink}
          className="mb-4 | relative top-1 sm:top-2 left-1 sm:left-2 w-full h-full"
          width={200}
          height={200}
        />
        <figcaption>{recipe.strDrink}</figcaption>
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
