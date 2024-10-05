import { createContext, useContext } from "react";

const allFilter = "All";
const defaultSortOption = "default";
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

export { SearchContext, useSearchContext };
