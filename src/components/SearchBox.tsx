import React, { useState } from "react";
import { BsX } from "react-icons/bs";
import OutsiderAlerter from "./OutsiderAlerter";

interface Props {
  id?: string;
  name?: string;
  placeholder?: string;
  noItemMessage?: string;
  keywords?: string[];
  maxItems?: number;
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
  placeholder,
  noItemMessage,
  keywords = [],
  maxItems = 8,
  styles,
}: Props) {
  const [inputValue, setInputValue] = useState("");
  const [suggestedItems, setSuggestedItems] = useState<string[]>([]);
  const [selectingIndex, setSelectingIndex] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setInputValue(value);

    if (value != "") {
      const newSuggestedItems = keywords
        .filter((item) => item.toLowerCase().startsWith(value.toLowerCase()))
        .slice(0, maxItems);
      setSuggestedItems(newSuggestedItems);
      setShowDropdown(true);
    } else {
      setSuggestedItems([]);
      setShowDropdown(false);
    }
  }

  function handleItemSelect(item: string) {
    setInputValue(item);
    setSuggestedItems([]);
    setShowDropdown(false);
  }

  function handleClearClick() {
    setInputValue("");
    setSuggestedItems([]);
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
    <OutsiderAlerter setFalse={setShowDropdown}>
      <div
        tabIndex={0}
        onKeyDown={handleOnKeyDown}
        className={styles?.container}
      >
        <input
          id={id}
          name={name}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`${styles?.input}`}
          autoComplete="off"
        />
        {showDropdown && inputValue && (
          <>
            <button onClick={handleClearClick} className={styles?.clearButton}>
              <BsX />
            </button>

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
          </>
        )}
      </div>
    </OutsiderAlerter>
  );
}

export default SearchBox;
