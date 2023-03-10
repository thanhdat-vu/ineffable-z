import { GetServerSideProps, NextPage } from "next";
import {
  Breadcrumb,
  Carousel,
  IngredientCard,
  Layout,
  RecipeCard,
} from "components";
import { getCocktailDetailsById } from "lib/api";
import { breakToSentences } from "lib/utils";

interface props {
  cocktail?: any;
}

const Recipe: NextPage = ({ cocktail }: props) => {
  function getIngredients(cocktail: any) {
    const ingredients = [];
    for (let i = 1; cocktail[`strIngredient${i}`]; i++) {
      let description =
        (cocktail[`strMeasure${i}`] || "") + cocktail[`strIngredient${i}`];
      ingredients.push({
        strIngredient: cocktail[`strIngredient${i}`],
        description: description,
      });
    }
    return ingredients;
  }

  const ingredients = getIngredients(cocktail);

  return (
    <Layout
      metadata={{
        title: `"${cocktail.strDrink}" Cocktail Recipe - Ineffable!`,
        description: `Recipe for the delicious "${cocktail.strDrink}" cocktail. Start impressing your friends and family with your cocktail-making skills today with Ineffable!`,
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
              label: "Cocktails",
              link: "/cocktails",
            },
            {
              label: cocktail.strDrink,
              link: "",
            },
          ]}
        />
        {/* Special Layout */}
        <div className="relative">
          {/* Title */}
          <div className="my-8 lg:ml-64 | w-max mx-auto">
            <h2 className="text-gold text-xl sm:text-2xl font-bold">
              {cocktail.strDrink}
            </h2>
          </div>

          {/* Cocktail Image */}
          {/* Special Layout: Top-Right to Top */}
          <div className="top-16 right-0 | w-max mx-auto lg:absolute">
            <RecipeCard
              cocktail={cocktail}
              withCaption={false}
              className="w-56 h-56 lg:w-64 lg:h-64"
            />
          </div>

          <div className="flex flex-col-reverse lg:flex-col">
            {/* Special Layout: Top-Left to Bot */}
            {/* Recipe Details */}
            <div className="lg:mr-64 lg:pr-16">
              {/* Glass */}
              <div className="flex flex-col lg:flex-row items-baseline">
                <h3 className="w-64 mb-4 lg:mb-0 | text-sm sm:text-lg font-bold">
                  Glass
                </h3>
                <p>Serve: {cocktail.strGlass}</p>
              </div>

              {/* Instructions */}
              <div className="my-12 lg:mt-8 lg:mb-0 | flex flex-col lg:flex-row">
                <h3 className="w-64 mb-4 lg:mb-0 | text-sm sm:text-lg font-bold">
                  Instructions
                </h3>
                <ol className="w-80 lg:min-h-[12rem] sm:w-[28rem] lg:w-96 xl:w-[36rem] leading-6 lg:leading-8 space-y-2 | list-decimal list-inside">
                  {breakToSentences(cocktail.strInstructions).map(
                    (sentences: string, i: number) => (
                      <li key={i}>{sentences}</li>
                    )
                  )}
                </ol>
              </div>
            </div>
            {/* Special Layout: Bot to Mid */}
            {/* Ingredients */}
            <div className="mt-4 mb-8">
              <h3 className="w-64 mb-4 lg:mb-0 | text-sm sm:text-lg font-bold">
                Ingredients
              </h3>
              <Carousel>
                {ingredients.map((ingredient, i) => (
                  <IngredientCard
                    key={i}
                    ingredientName={ingredient.strIngredient}
                    description={ingredient.description}
                  />
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const pathName = context.params?.recipe as string;
  const cocktailId = Number(pathName.split("-")[0]);
  const cocktail = await getCocktailDetailsById(cocktailId);
  return {
    props: {
      cocktail,
    },
  };
};

export default Recipe;
