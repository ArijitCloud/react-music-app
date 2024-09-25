import { createContext, ReactNode, useContext } from "react";
import { useSearchReducer } from "./useSearchReducer";

const allFilter = "All";
const defaultSortOption = "default";

type SearchContextType = {
  query: string;
  setQuery: (query: string) => void;
  selectedFilter: string;
  setSelectedFilter: (selectedFilter: string) => void;
  savedIds: string[];
  setSavedIds: (savedIds: string[]) => void;
  sortOption: string;
  setSortOption: (option: string) => void;
  dataView: string;
  setDataView: (view: string) => void;
};

const SearchContext = createContext<SearchContextType>({
  query: "",
  setQuery: () => {},
  selectedFilter: allFilter,
  setSelectedFilter: () => {},
  savedIds: [],
  setSavedIds: () => {},
  sortOption: defaultSortOption,
  setSortOption: () => {},
  dataView: "grid",
  setDataView: () => {},
});

const useSearchContext = () => useContext(SearchContext);

const SearchProvider = ({ children }: { children: ReactNode }) => {
  const initialContext = useSearchReducer();

  return (
    <SearchContext.Provider value={initialContext}>
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, useSearchContext, SearchProvider };
