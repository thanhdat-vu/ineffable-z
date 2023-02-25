import { useEffect, useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

interface props {
  children: any[];
}

const Carousel = ({ children }: props) => {
  const maxIndex = children.length / 5 - 1;
  const [index, setIndex] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  function movePrev() {
    if (index > 0) {
      setIndex(index - 1);
    }
  }

  function moveNext() {
    if (index < maxIndex) {
      setIndex(index + 1);
    }
  }

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = carouselRef.current.offsetWidth * index;
    }
  }, [index]);

  return (
    <div className="mt-12 | w-[80vw] lg:w-max flex items-stretch">
      <button
        className="pr-2 | hidden lg:block text-2xl text-gray-800 hover:text-white disabled:invisible"
        onClick={movePrev}
        disabled={index < 1}
      >
        <AiOutlineLeft />
      </button>
      <div
        className="lg:w-[54rem] xl:w-[68rem] -mx-[10vw] lg:mx-0 pb-4 | overflow-x-scroll lg:overflow-hidden scroll-smooth"
        ref={carouselRef}
      >
        <div className="pl-[5vw] lg:pl-0 space-x-4 lg:space-x-8 | flex items-baseline w-max">
          {children}
        </div>
      </div>
      <button
        className="pl-2 | hidden lg:block text-2xl text-gray-800 hover:text-white disabled:invisible"
        onClick={moveNext}
        disabled={index >= maxIndex}
      >
        <AiOutlineRight />
      </button>
    </div>
  );
};

export default Carousel;
