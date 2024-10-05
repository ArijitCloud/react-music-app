import { useCallback, useRef, useState } from "react";
import { Icon } from "../icon/Icon";
import { useSearchContext } from "../../state";
import debounce from "lodash.debounce";

type SearchBoxProps = {
  onSmallSBToggle: () => void;
};
const SearchBox = ({ onSmallSBToggle }: SearchBoxProps) => {
  const [showFullSearchBox, setShowFullSearchBox] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { setQuery } = useSearchContext();

  const debouncedSetQuery = useRef(
    debounce((query: string) => {
      setQuery(query);
    }, 500) // 500ms delay
  ).current;

  const onSearchTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      debouncedSetQuery(e.target.value);
    },
    [debouncedSetQuery]
  );

  return (
    <>
      {showFullSearchBox && (
        <button
          type="reset"
          onClick={() => (
            setShowFullSearchBox(false), onSmallSBToggle(), setQuery("")
          )}
          className="rounded-full w-10 h-10 flex sm:hidden items-center justify-center p-2.5 flex-shrink-0"
        >
          <Icon name="ArrowLeft" classNames="h-8 w-8" />
        </button>
      )}
      <form
        onSubmit={(e) => (e.preventDefault(), setQuery(searchQuery))}
        className={`sm:flex flex-grow justify-center sm:max-w-[50%] md:max-w-[40%] ${
          showFullSearchBox ? "flex" : "hidden"
        }`}
      >
        <input
          type="search"
          placeholder="Search..."
          aria-label="Search"
          onChange={onSearchTextChange}
          className="rounded-l-full cursor-text
          border border-light-gray dark:border-secondary-border 
          shadow-inner shadow-off-white dark:shadow-black py-1 px-4 text-lg w-full
        focus:border-dark-gray dark:focus:border-blue-500 outline-none"
        />
        <button
          type="submit"
          className="sm:px-2 rounded-r-full w-10 h-10
           border-light-gray dark:border-secondary-border border border-l-0 px-1 flex-shrink-0"
        >
          <Icon name="Search" classNames="h-6 w-6" />
        </button>
      </form>

      <div
        className={`sm:hidden flex-shrink-0 ${
          showFullSearchBox ? "hidden" : "flex"
        }`}
      >
        <button
          type="button"
          onClick={() => (setShowFullSearchBox(true), onSmallSBToggle())}
          className="rounded-full w-11 h-11 flex items-center justify-center p-2.5"
        >
          <Icon name="Search" classNames="h-8 w-8" />
        </button>
      </div>
    </>
  );
};
export { SearchBox };
