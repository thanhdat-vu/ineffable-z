import { useState } from "react";
import {
  AiOutlineVerticalRight,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineVerticalLeft,
} from "react-icons/ai";

interface props {
  data: any[];
  setData: Function;
  itemsPerPage: number;
  scrollToElement?: HTMLInputElement | null;
  onPageChange?: (pageIndex: number) => void;
}

const Pagination = ({
  data,
  setData,
  itemsPerPage,
  scrollToElement,
  onPageChange,
}: props) => {
  const totalItem = data?.length || 0;
  const totalPages = Math.ceil(totalItem / itemsPerPage);

  const handleOnPageChange = (pageIndex: number) => {
    const firstIndex = (pageIndex - 1) * itemsPerPage;
    const lastIndex = firstIndex + itemsPerPage;
    setData(data?.slice(firstIndex, lastIndex));
    if (scrollToElement) {
      window.scrollTo(0, scrollToElement.offsetTop - 80);
    }
  };

  const [pageIndex, setPageIndex] = useState(1);
  const [pageInput, setPageInput] = useState(1);

  function handlePageChange(newPageIndex: number) {
    if (newPageIndex >= 1 && newPageIndex <= totalPages) {
      setPageIndex(newPageIndex);
      setPageInput(newPageIndex);
      handleOnPageChange(newPageIndex);
      if (onPageChange) {
        onPageChange(newPageIndex);
      }
    }
  }

  return (
    <nav className="mt-4 md:mt-12 | w-max mx-auto flex">
      <button
        className="p-2 hover:text-shiny-gold disabled:text-gray-800"
        onClick={() => handlePageChange(1)}
        disabled={pageIndex == 1}
        aria-label="move first"
      >
        <AiOutlineVerticalRight />
      </button>
      <button
        className="p-2 hover:text-shiny-gold disabled:text-gray-800"
        onClick={() => handlePageChange(pageIndex - 1)}
        disabled={pageIndex == 1}
        aria-label="move previous"
      >
        <AiOutlineLeft />
      </button>
      <div className="h-min w-12 bg-white text-rich-black mx-2">
        <input
          type="number"
          aria-label="page index"
          value={pageInput}
          onChange={(e) => setPageInput(Number(e.target.value))}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handlePageChange(Number(pageInput));
            }
          }}
          className="appearance-none w-1/2 text-right py-1 bg-white outline-none"
        />
        <span className="inline-block w-1/2">/{totalPages}</span>
      </div>
      <button
        className="p-2 hover:text-shiny-gold disabled:text-gray-800"
        onClick={() => handlePageChange(pageIndex + 1)}
        disabled={pageIndex == totalPages}
        aria-label="move next"
      >
        <AiOutlineRight />
      </button>
      <button
        className="p-2 hover:text-shiny-gold disabled:text-gray-800"
        onClick={() => handlePageChange(totalPages)}
        disabled={pageIndex == totalPages}
        aria-label="move next"
      >
        <AiOutlineVerticalLeft />
      </button>
    </nav>
  );
};

export default Pagination;
