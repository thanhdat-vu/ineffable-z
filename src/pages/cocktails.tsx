import { GetStaticProps, NextPage } from "next";
import { Layout, RecipeCard } from "../components";
import { getAllCocktails } from "lib/api";
import metadata from "json/metadata.json";
import Breadcrumb from "components/Breadcrumb";

interface props {
  allCocktails?: any[];
}

const Cocktails: NextPage = ({ allCocktails }: props) => {
  return (
    <Layout metadata={metadata.cocktails}>
      <div className="my-24 lg:my-32 | w-max mx-auto">
        <Breadcrumb
          items={[
            {
              label: "Home",
              link: "/",
            },
            {
              label: "Cocktails",
              link: "/cocktails",
            },
          ]}
        />

        <div className="w-max mx-auto">
          <h2 className="my-8 md:my-16 | text-gold text-xl sm:text-2xl font-bold">
            All Cocktails {allCocktails && `(${allCocktails.length})`}
          </h2>
        </div>

        <div className="gap-x-12 sm:gap-x-16 xl:gap-x-32 gap-y-6 sm:gap-y-12 xl:gap-y-16 | grid grid-cols-2 lg:grid-cols-4">
          {allCocktails
            ? allCocktails.map((cocktail) => (
                <RecipeCard
                  key={cocktail.idDrink}
                  cocktail={cocktail}
                  className="w-32 sm:w-48 h-32 sm:h-48"
                />
              ))
            : [...Array(32)].map((_, i) => (
                <RecipeCard
                  key={i}
                  cocktail={null}
                  className="w-32 sm:w-48 h-32 sm:h-48"
                />
              ))}
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const allCocktails = await getAllCocktails();
  return {
    props: {
      allCocktails,
    },
  };
};

export default Cocktails;
