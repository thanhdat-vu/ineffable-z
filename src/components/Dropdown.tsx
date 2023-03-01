import { useEffect, useRef, useState } from "react";
import OutsiderAlerter from "./OutsiderAlerter";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

interface Props {
  options: any[];
  onchange: (index: number) => void;
  styles: {
    container?: string;
    field?: string;
    menu?: string;
    item?: string;
    highlightedItem?: string;
  };
}

const Dropdown = ({ options, onchange, styles }: Props) => {
  // Behaviors
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);

  function handleSelecting(newIndex: number) {
    setIndex(newIndex);
    setIsOpen(false);
    onchange(newIndex);
  }

  function handleOnKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    event.preventDefault();
    if (event.key === "ArrowDown") {
      let newIndex = (index + 1) % options.length;
      setIndex(newIndex);
    }
    if (event.key === "ArrowUp") {
      let newIndex = (index - 1 + options.length) % options.length;
      setIndex(newIndex);
    }
    if (event.key === "Enter") {
      setIsOpen(!isOpen);
    }
  }

  return (
    <OutsiderAlerter setFalse={setIsOpen}>
      <div
        tabIndex={0}
        className={styles?.container}
        onKeyDown={(e) => handleOnKeyDown(e)}
      >
        <button onClick={() => setIsOpen(!isOpen)} className={styles.field}>
          {options[index]}
          {isOpen ? <BsChevronUp /> : <BsChevronDown />}
        </button>
        {isOpen && (
          <div className={styles?.menu}>
            {options?.map((option, i) => (
              <div
                key={i}
                tabIndex={0}
                onClick={() => handleSelecting(i)}
                className={`${styles?.item} ${
                  i === index && styles.highlightedItem
                }`}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </OutsiderAlerter>
  );
};

export default Dropdown;
