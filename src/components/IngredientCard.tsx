import Link from "next/link";
import { getIngredientImageURI, stringToPathName } from "lib/utils";
import Image from "next/image";

interface props {
  ingredientName?: string;
  description?: string;
}

const IngredientCard = ({ ingredientName, description }: props) => {
  return ingredientName ? (
    <Link
      href={`/ingredients/${stringToPathName(ingredientName)}`}
      className="space-y-2 | inline-block w-32 sm:w-48 text-center"
    >
      <Image
        src={getIngredientImageURI(ingredientName)}
        alt={ingredientName}
        className=" mb-4 | w-full"
        width={200}
        height={200}
      />
      <p>{description || ingredientName}</p>
    </Link>
  ) : (
    <div className=" space-y-2 | w-32 sm:w-48 h-32 sm:h-48 animate-pulse">
      <div className="mb-6 | w-full h-full bg-gray-900" />
      <div className="w-3/4 mx-auto h-4 bg-gray-900" />
    </div>
  );
};

export default IngredientCard;
