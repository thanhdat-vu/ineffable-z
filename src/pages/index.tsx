import type { GetStaticProps, NextPage } from "next";
import { getPopularCocktails, getPopularIngredients } from "lib/api";
import { IngredientCard, Layout, RecipeCard, SearchBox } from "components";
import metadata from "json/metadata.json";
import Link from "next/link";
import { BsArrowDown } from "react-icons/bs";
import Dropdown from "components/Dropdown";

interface props {
  popularCocktails?: Array<any>;
  popularIngredients?: Array<any>;
}

const Home: NextPage = ({ popularCocktails, popularIngredients }: props) => {
  return (
    <Layout metadata={metadata.home}>
      {/* Hero Section */}
      <section className="h-screen bg-hero-image bg-[length:auto_100%] sm:bg-cover bg-center lg:bg-fixed relative">
        {/* Overlay */}
        <div className="opacity-70 | w-full h-full bg-rich-black"></div>

        <div className="space-y-[12vh] top-[20%] | absolute w-full flex flex-col items-center">
          <div className="pl-4 sm:pl-8 | border-l-2 text-sm sm:text-xl">
            <p>Searching for moments that are</p>
            <p className="font-bold">
              too great or extreme <br className="md:hidden" />
              to be expressed or described in words
            </p>
          </div>

          <div className="space-y-4 flex flex-col items-center">
            <p className="w-[22rem] sm:w-96 md:w-full | leading-5 sm:leading-normal text-center">
              Welcome, stranger! In this place, you can find almost every
              flavorsome cocktail recipe in the world!
            </p>
            <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0">
              <SearchBox
                id="search"
                name="search"
                placeholder={"Which cocktail would you like to make?"}
                noItemMessage="We couldn't find any cocktail that matches your search"
                keywords={["a", "aa", "aaa", "b", "bb"]}
                maxItems={4}
                styles={{
                  container: "sm:w-96 lg:w-[32rem] relative",
                  input:
                    "p-3 | w-full bg-white/10 focus:bg-white/20 sm:mb-0 focus:outline-0 shadow-glass font-normal backdrop-blur",
                  listbox: "absolute w-full bg-white/10 backdrop-blur z-10",
                  item: "px-4 py-2 hover:bg-white/20 hover:cursor-pointer",
                  highlightedItem: "px-6 py-2 bg-white/10 ",
                  noItem: "px-12 py-16 | bg-white/10 text-center",
                  clearButton:
                    "absolute inset-y-0 right-1 text-2xl text-gray-400 hover:text-white",
                }}
              />
              <div className="flex space-x-2">
                <Dropdown
                  options={["Cocktails", "Ingredients"]}
                  onchange={(newIndex) => {}}
                  styles={{
                    container: "w-40 relative",
                    field:
                      "p-3 | w-full bg-white/10 focus:bg-white/20 backdrop-blur shadow-glass outline-none flex items-center justify-between",
                    menu: "absolute w-full bg-white/10 backdrop-blur",
                    item: "p-3 | hover:bg-white/20 hover:cursor-pointer",
                    highlightedItem: "bg-white/10",
                  }}
                />
                <button className="py-2 w-32 |  text-rich-black font-bold bg-shiny-gold hover:brightness-125">
                  Search
                </button>
              </div>
            </div>
          </div>

          <div>
            <p>Not sure what to look for?</p>
            <Link
              href="/cocktails/random"
              className="px-8 py-3 mt-2 | block bg-gray-400 hover:brightness-125 font-bold text-rich-black"
            >
              Give me anything
            </Link>
          </div>

          <BsArrowDown className="mx-auto text-xl animate-bounce" />
        </div>
      </section>

      {/* Popular Cocktails */}
      <section className="py-16 | w-max mx-auto">
        <h2 className="mb-6 sm:mb-8 | text-sm sm:text-xl text-gold font-bold">
          Popular Cocktails
        </h2>
        <div className="gap-x-12 sm:gap-x-16 xl:gap-x-32 gap-y-6 sm:gap-y-12 xl:gap-y-16 | w-max grid grid-cols-2 lg:grid-cols-4">
          {popularCocktails
            ? popularCocktails.map((cocktail) => (
                <RecipeCard
                  key={cocktail.idDrink}
                  cocktail={cocktail}
                  className="w-32 sm:w-48 h-32 sm:h-48"
                />
              ))
            : [...Array(8)].map((_, i) => (
                <RecipeCard
                  key={i}
                  cocktail={null}
                  className="w-32 sm:w-48 h-32 sm:h-48"
                />
              ))}
        </div>
      </section>

      {/* Quote */}
      <div className="my-16 | w-40 sm:w-56 h-16 sm:h-24 mx-auto border-y sm:border-y-2 border-gold">
        <q className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-max text-center font-semibold italic text-gold tracking-wide">
          Every empty bottle is filled with a great story
        </q>
      </div>

      {/* Popular Ingredients */}
      <section className="py-16 | w-max mx-auto">
        <h2 className="mb-6 sm:mb-8 | text-sm sm:text-xl text-gold font-bold">
          Popular Ingredients
        </h2>
        <div className="gap-x-12 sm:gap-x-16 xl:gap-x-32 gap-y-12 | w-max grid grid-cols-2 lg:grid-cols-4">
          {popularIngredients
            ? popularIngredients.map((ingredient) => (
                <IngredientCard
                  key={ingredient.idIngredient}
                  ingredientName={ingredient.strIngredient}
                />
              ))
            : [...Array(4)].map((_, i) => <IngredientCard key={i} />)}
        </div>
        <Link
          href="/ingredients"
          className="mt-8 sm:mt-12 | block w-max mx-auto text-center italic hover:text-shiny-gold"
        >
          All Ingredients &gt;&gt;
        </Link>
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const popularCocktails = await getPopularCocktails();
  const popularIngredients = await getPopularIngredients();
  return {
    props: {
      popularCocktails,
      popularIngredients,
    },
  };
};

export default Home;
