import React, { useRef, useState } from "react";
import { BsX } from "react-icons/bs";
import OutsiderAlerter from "./OutsiderAlerter";

interface Props {
  id?: string;
  name?: string;
  defaultValue?: string;
  placeholder?: string;
  noItemMessage?: string;
  keywords?: string[];
  maxItems?: number;
  onChange?: (value: string) => void;
  styles?: {
    container?: string;
    input?: string;
    listbox?: string;
    item?: string;
    highlightedItem?: string;
    noItem?: string;
    clearButton?: string;
  };
}

function SearchBox({
  id,
  name,
  defaultValue,
  placeholder,
  noItemMessage,
  keywords = [],
  maxItems = 8,
  onChange,
  styles,
}: Props) {
  const [inputValue, setInputValue] = useState(defaultValue);
  const [suggestedItems, setSuggestedItems] = useState<string[]>([]);
  const [selectingIndex, setSelectingIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setInputValue(value);
    if (onChange) {
      onChange(value);
    }

    if (value != "") {
      const newSuggestedItems = keywords
        .filter((item) => item.toLowerCase().startsWith(value.toLowerCase()))
        .slice(0, maxItems);
      setSuggestedItems(newSuggestedItems);
      setIsOpen(true);
    } else {
      setSuggestedItems([]);
      setIsOpen(false);
    }
  }

  function handleItemSelect(item: string) {
    setInputValue(item);
    if (onChange) {
      onChange(item);
    }
    setSuggestedItems([]);
    setIsOpen(false);
  }

  function handleClearClick() {
    setInputValue("");
    setSuggestedItems([]);
    inputRef.current?.focus();
  }

  function handleOnKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key === "ArrowDown") {
      let newIndex = (selectingIndex + 1) % suggestedItems.length;
      setSelectingIndex(newIndex);
    }
    if (event.key === "ArrowUp") {
      let newIndex =
        (selectingIndex - 1 + suggestedItems.length) % suggestedItems.length;
      setSelectingIndex(newIndex);
    }
    if (event.key === "Enter") {
      handleItemSelect(suggestedItems[selectingIndex]);
    }
  }

  return (
    <OutsiderAlerter
      setFalse={setIsOpen}
      className={styles?.container}
      tabIndex={0}
      onKeyDown={handleOnKeyDown}
    >
      <input
        id={id}
        name={name}
        type="text"
        ref={inputRef}
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={`${styles?.input}`}
        autoComplete="off"
      />
      {inputValue && (
        <button onClick={handleClearClick} className={styles?.clearButton}>
          <BsX />
        </button>
      )}
      {isOpen && inputValue && (
        <div className={styles?.listbox}>
          {suggestedItems.length > 0 ? (
            <ul>
              {suggestedItems.map((item, i) => (
                <li
                  key={i}
                  onClick={() => handleItemSelect(item)}
                  className={`${styles?.item} ${
                    i === selectingIndex && styles?.highlightedItem
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles?.noItem}>{noItemMessage}</div>
          )}
        </div>
      )}
    </OutsiderAlerter>
  );
}

export default SearchBox;
