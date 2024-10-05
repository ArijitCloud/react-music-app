import { ReactNode } from "react";
import { useSearchReducer } from "./useSearchReducer";
import { SearchContext } from "./useSearchContext";

const SearchProvider = ({ children }: { children: ReactNode }) => {
  const initialContext = useSearchReducer();

  return (
    <SearchContext.Provider value={initialContext}>
      {children}
    </SearchContext.Provider>
  );
};

export { SearchProvider };
