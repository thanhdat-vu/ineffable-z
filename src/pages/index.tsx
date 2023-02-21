import type { GetStaticProps, NextPage } from "next";
import { Layout, RecipeCard } from "components";
import metadata from "json/metadata.json";
import { getPopularCocktails } from "lib/api";

interface props {
  popularCocktails?: Array<any>;
}

const Home: NextPage = ({ popularCocktails }: props) => {
  return (
    <Layout metadata={metadata.homepage}>
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
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const popularCocktails = await getPopularCocktails();
  return {
    props: {
      popularCocktails,
    },
  };
};

export default Home;
