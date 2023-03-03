import { GetServerSideProps, NextPage } from "next";
import { useRef } from "react";
import {
  Layout,
  RecipeCard,
  Breadcrumb,
  Pagination,
  IngredientCard,
  SearchBox,
  Dropdown,
} from "../components";
import { getIngredientByName, searchCocktailByName } from "lib/api";

interface Props {
  data?: any[];
  q?: string;
  isIngredient?: boolean;
}

const Search: NextPage = ({ data, q, isIngredient = false }: Props) => {
  const itemsPerPage = 32;
  let pageData = data?.slice(0, itemsPerPage);
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
          <div className="flex flex-col lg:flex-row lg:space-x-2 space-y-2 lg:space-y-0">
            <SearchBox
              id="search"
              name="search"
              defaultValue={q}
              placeholder={"Which cocktail would you like to make?"}
              noItemMessage="We couldn't find any cocktail that matches your search"
              keywords={["a", "aa", "aaa", "b", "bb"]}
              maxItems={4}
              styles={{
                container: "grow relative",
                input:
                  "p-3 | w-full bg-white/10 focus:bg-white/20 focus:outline-0 shadow-glass font-normal backdrop-blur",
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
                onChange={(newIndex) => {}}
                styles={{
                  container: "grow md:w-40 relative",
                  field:
                    "p-3 | w-full bg-white/10 focus:bg-white/20 backdrop-blur shadow-glass outline-none flex items-center justify-between",
                  menu: "absolute w-full bg-white/10 backdrop-blur z-10",
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
            pageData = data?.slice(firstIndex, lastIndex);
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
