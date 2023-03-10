import { useEffect, useRef, useState } from "react";
import { Layout, Breadcrumb, RecipeCard, Pagination } from "../../components";
import { GetServerSideProps } from "next";
import { getCocktailsByIngredient, getIngredientByName } from "lib/api";
import { getIngredientImageURI, pathNameToString } from "lib/utils";
import Image from "next/image";

interface props {
  ingredient: any;
  cocktails: any[];
}

const Ingredient = ({ ingredient, cocktails }: props) => {
  // Description
  const [showLess, setShowLess] = useState(true);
  const descRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState<boolean>(false);
  useEffect(() => {
    const pElement = descRef.current;
    if (pElement) {
      setIsOverflowing(pElement.offsetHeight < pElement.scrollHeight);
    }
  }, []);

  const itemsPerPage = 32;
  const data = cocktails;
  const [pageData, setPageData] = useState(data?.slice(0, itemsPerPage));
  const scrollToRef = useRef<HTMLInputElement>(null);

  return (
    <Layout
      metadata={{
        title: `${ingredient.strIngredient}, cocktail ingredient - Ineffable!`,
        description: ingredient.strDescription,
      }}
    >
      <div className="my-24 lg:my-32 | w-max mx-auto">
        <Breadcrumb
          items={[
            {
              label: "Home",
              link: "/",
            },
            {
              label: "Ingredients",
              link: "/ingredients",
            },
            {
              label: ingredient.strIngredient,
              link: "",
            },
          ]}
        />

        {/* Title */}
        <div className="my-8 lg:ml-64 | w-max mx-auto">
          <h2 className="text-gold text-xl sm:text-2xl font-bold">
            {ingredient.strIngredient}
          </h2>
        </div>

        <div className="flex flex-col-reverse lg:flex-row">
          <div className="space-y-12">
            {/* Type */}
            <div className="flex flex-col lg:flex-row items-baseline">
              <h3 className="mb-4 lg:mb-0 | w-64 text-sm sm:text-lg font-bold">
                Type
              </h3>
              <p>{ingredient.strType}</p>
            </div>

            {/* Description */}
            <div className="flex flex-col lg:flex-row items-baseline">
              <h3 className="mb-4 lg:mb-0 | w-64 text-sm sm:text-lg font-bold">
                Description
              </h3>

              <div className="w-80 lg:min-h-[12rem] sm:w-[28rem] lg:w-96 xl:w-[36rem] ">
                {ingredient.strDescription ? (
                  <>
                    <p
                      className={`leading-8 text-clip overflow-hidden text-justify
                      ${showLess && "h-48"}`}
                      ref={descRef}
                    >
                      {ingredient.strDescription}
                    </p>
                    {isOverflowing && (
                      <button
                        className="italic"
                        onClick={() => {
                          window.scrollTo(0, descRef.current!.offsetTop - 80);
                          setShowLess(!showLess);
                        }}
                      >
                        {showLess ? "...Read more" : "Read less"}
                      </button>
                    )}
                  </>
                ) : (
                  <p>No description</p>
                )}
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="w-56 mx-auto lg:mr-0 lg:ml-auto">
            <Image
              src={getIngredientImageURI(ingredient.strIngredient)}
              alt={ingredient.strIngredient}
              width={400}
              height={400}
            />
          </div>
        </div>

        {/* Drinks */}
        <div className="my-12" ref={scrollToRef}>
          <h3 className="mb-4 lg:mb-0 | w-64 text-sm sm:text-lg font-bold">
            Drinks
          </h3>
          <div className="mt-8 gap-x-16 xl:gap-x-32 gap-y-6 sm:gap-y-12 xl:gap-y-16  | grid grid-cols-2 lg:grid-cols-4 w-max mx-auto">
            {pageData.map((cocktail: any) => (
              <RecipeCard
                key={cocktail.idDrink}
                cocktail={cocktail}
                className="w-32 sm:w-48 h-32 sm:h-48"
              />
            ))}
          </div>
        </div>

        <Pagination
          totalItem={data?.length || 0}
          itemsPerPage={itemsPerPage}
          scrollToElement={scrollToRef.current}
          onPageChange={(pageIndex) => {
            const firstIndex = (pageIndex - 1) * itemsPerPage;
            const lastIndex = firstIndex + itemsPerPage;
            setPageData(data?.slice(firstIndex, lastIndex));
          }}
        />
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const pathname = context.params?.ingredient as string;
  const ingredientName = pathNameToString(pathname);
  const ingredient = await getIngredientByName(ingredientName);
  const cocktails = await getCocktailsByIngredient(ingredientName);
  return {
    props: {
      ingredient,
      cocktails,
    },
  };
};

export default Ingredient;
