import { GetServerSideProps, NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import {
  Layout,
  RecipeCard,
  Breadcrumb,
  Pagination,
  IngredientCard,
  SearchBar,
} from "../components";
import { getIngredientByName, searchCocktailByName } from "lib/api";

interface Props {
  data?: any[];
  q?: string;
  isIngredient?: boolean;
}

const Search: NextPage = ({ data, q, isIngredient = false }: Props) => {
  const itemsPerPage = 32;
  const [pageData, setPageData] = useState(data?.slice(0, itemsPerPage));
  useEffect(() => {
    setPageData(data?.slice(0, itemsPerPage));
  }, [data]);

  const scrollToRef = useRef<HTMLInputElement>(null);

  return (
    <Layout
      metadata={{
        title: `Search for "${q}" - Ineffable!`,
        description:
          "Ineffable is the ultimate destination for cocktail lovers! With its vast collection of cocktail recipes from around the world, you can explore and create your favorite drinks. Built with Next.js and TheCocktailDB, Ineffable provides a user-friendly interface that lets you easily find and make your ideal cocktail. Whether you're a beginner or a seasoned mixologist, Ineffable has something for everyone. Start impressing your friends and family with your cocktail-making skills today with Ineffable!",
      }}
    >
      <div className="my-24 lg:my-32 | w-max mx-auto min-w-[20rem] md:min-w-[28rem] lg:min-w-[60rem] xl:min-w-[72rem]">
        <Breadcrumb
          items={[
            {
              label: "Home",
              link: "/",
            },
            {
              label: "Search",
              link: "",
            },
          ]}
        />

        <div className="my-8 md:my-12 space-y-4">
          <SearchBar defaultValue={q} />
        </div>

        <div className="mb-4 text-white/50">
          ( {data?.length || 0} results )
        </div>

        <div
          className="gap-x-16 xl:gap-x-32 gap-y-6 sm:gap-y-12 xl:gap-y-16 | grid grid-cols-2 lg:grid-cols-4"
          ref={scrollToRef}
        >
          {pageData?.map((item) =>
            isIngredient ? (
              <IngredientCard
                key={item.strIngredient}
                ingredientName={item.strIngredient}
              />
            ) : (
              <RecipeCard
                key={item.idDrink}
                cocktail={item}
                className="w-32 sm:w-48 h-32 sm:h-48"
              />
            )
          )}
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
  const { query } = context;
  const q = query.q as string;
  const isIngredient = Number(query.isIngredient);
  let data: any[] = [];
  if (isIngredient) {
    data = Array(await getIngredientByName(q));
  } else {
    data = await searchCocktailByName(q);
  }

  return {
    props: {
      data,
      q,
      isIngredient,
    },
  };
};

export default Search;
