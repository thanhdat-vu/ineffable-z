import { GetStaticProps, NextPage } from "next";
import { useRef, useState } from "react";
import {
  Layout,
  IngredientCard,
  Breadcrumb,
  Pagination,
} from "../../components";
import { getAllIngredients } from "lib/api";
import metadata from "json/metadata.json";

interface props {
  allIngredients?: any[];
}

const Ingredients: NextPage = ({ allIngredients }: props) => {
  const itemsPerPage = 32;
  const [ingredients, setIngredients] = useState(
    allIngredients?.slice(0, itemsPerPage)
  );
  const scrollToRef = useRef<HTMLInputElement>(null);

  return (
    <Layout metadata={metadata.ingredients}>
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
          ]}
        />

        <div className="w-max mx-auto">
          <h2 className="my-8 md:my-16 | text-gold text-xl sm:text-2xl font-bold">
            All Ingredients {allIngredients && `(${allIngredients.length})`}
          </h2>
        </div>

        <div
          className="gap-x-16 xl:gap-x-32 gap-y-6 sm:gap-y-12 xl:gap-y-16 | grid grid-cols-2 lg:grid-cols-4"
          ref={scrollToRef}
        >
          {ingredients
            ? ingredients.map((ingredient) => (
                <IngredientCard
                  key={ingredient.strIngredient1}
                  ingredientName={ingredient.strIngredient1}
                />
              ))
            : [...Array(itemsPerPage)].map((_, i) => (
                <IngredientCard key={i} />
              ))}
        </div>

        <Pagination
          data={allIngredients || []}
          setData={setIngredients}
          scrollToElement={scrollToRef.current}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const allIngredients = await getAllIngredients();
  return {
    props: {
      allIngredients,
    },
  };
};

export default Ingredients;
