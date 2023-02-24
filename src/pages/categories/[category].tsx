import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { Layout, RecipeCard, Breadcrumb, Pagination } from "../../components";
import { getCocktailsByCategory } from "lib/api";
import metadata from "json/metadata.json";
import categories from "json/categories.json";
import { pathNameToString, stringToPathName } from "lib/utils";

interface props {
  category?: string;
  cocktailByCategory?: any[];
}

const Category: NextPage = ({ category, cocktailByCategory }: props) => {
  const itemsPerPage = 32;
  const [cocktails, setCocktails] = useState(
    cocktailByCategory?.slice(0, itemsPerPage)
  );
  useEffect(() => {
    setCocktails(cocktailByCategory?.slice(0, itemsPerPage));
  }, [category, cocktailByCategory]);

  const scrollToRef = useRef<HTMLInputElement>(null);

  return (
    <Layout key={category} metadata={metadata.cocktails}>
      <div className="my-24 lg:my-32 | w-max mx-auto">
        <Breadcrumb
          items={[
            {
              label: "Home",
              link: "/",
            },
            {
              label: "Categories",
              link: "/",
            },
            {
              label: category?.replaceAll("/", "or") || "",
              link: "",
            },
          ]}
        />

        <div className="w-max mx-auto">
          <h2 className="my-8 md:my-16 | text-gold text-xl sm:text-2xl font-bold">
            {category} {cocktailByCategory && `(${cocktailByCategory.length})`}
          </h2>
        </div>

        <div
          className="gap-x-12 sm:gap-x-16 xl:gap-x-32 gap-y-6 sm:gap-y-12 xl:gap-y-16 | grid grid-cols-2 lg:grid-cols-4"
          ref={scrollToRef}
        >
          {cocktails
            ? cocktails.map((cocktail) => (
                <RecipeCard
                  key={cocktail.idDrink}
                  cocktail={cocktail}
                  className="w-32 sm:w-48 h-32 sm:h-48"
                />
              ))
            : [...Array(itemsPerPage)].map((_, i) => (
                <RecipeCard
                  key={i}
                  cocktail={null}
                  className="w-32 sm:w-48 h-32 sm:h-48"
                />
              ))}
        </div>

        <Pagination
          data={cocktailByCategory || []}
          setData={setCocktails}
          scrollToElement={scrollToRef.current}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = categories.map((category) => ({
    params: { category: stringToPathName(category) },
  }));
  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const path = context.params!.category as string;
  const category = pathNameToString(path);
  const cocktailByCategory = await getCocktailsByCategory(category);
  return {
    props: {
      category,
      cocktailByCategory,
    },
  };
};

export default Category;
