import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SearchBox from "./SearchBox";
import Dropdown from "./Dropdown";
import { getAllCocktailNames, getAllIngredientNames } from "lib/api";

interface Props {
  defaultValue?: string;
}

const SearchBar = ({ defaultValue = "" }: Props) => {
  const [searchData, setSearchData] = useState({
    keyword: defaultValue,
    isIngredient: 0,
  });

  const [keywords, setKeywords] = useState([]);
  useEffect(() => {
    if (searchData.isIngredient) {
      getAllIngredientNames().then((res) => setKeywords(res));
    } else {
      getAllCocktailNames().then((res: any) => setKeywords(res));
    }
  }, [searchData.isIngredient]);

  const router = useRouter();
  function handleSearch() {
    router.push(
      `/search?q=${searchData.keyword}&isIngredient=${searchData.isIngredient}`
    );
  }

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-2 space-y-2 lg:space-y-0">
      <SearchBox
        id="search"
        name="search"
        defaultValue={defaultValue}
        placeholder={"Which cocktail would you like to make?"}
        noItemMessage="We couldn't find any cocktail that matches your search"
        keywords={keywords}
        maxItems={8}
        onChange={(value) => {
          setSearchData({ ...searchData, keyword: value });
        }}
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
          onChange={(newIndex) => {
            setSearchData({ ...searchData, isIngredient: newIndex });
          }}
          styles={{
            container: "grow md:w-40 relative",
            field:
              "p-3 | w-full bg-white/10 focus:bg-white/20 backdrop-blur shadow-glass outline-none flex items-center justify-between",
            menu: "absolute w-full bg-white/10 backdrop-blur z-10",
            item: "p-3 | hover:bg-white/20 hover:cursor-pointer",
            highlightedItem: "bg-white/10",
          }}
        />
        <button
          className="py-2 w-32 |  text-rich-black font-bold bg-shiny-gold hover:brightness-125"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
