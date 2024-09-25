import { useReducer } from "react";
import { initialState, searchReducer } from "./reducers/searchReducer";

const useSearchReducer = () => {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  //state
  const { query, selectedFilter, savedIds, sortOption, dataView } = state;

  // Action dispatchers
  const setQuery = (query: string) => {
    dispatch({ type: "SET_QUERY", payload: query });
  };

  const setSelectedFilter = (selectedFilter: string) => {
    dispatch({ type: "SET_SELECTED_FILTER", payload: selectedFilter });
  };

  const setSavedIds = (savedIds: string[]) => {
    dispatch({ type: "SET_SAVED_IDS", payload: savedIds });
  };

  const setSortOption = (sortOption: string) => {
    dispatch({ type: "SET_SORT_OPTION", payload: sortOption });
  };

  const setDataView = (dataView: string) => {
    dispatch({ type: "SET_DATA_VIEW", payload: dataView });
  };

  return {
    query,
    selectedFilter,
    savedIds,
    sortOption,
    dataView,
    setQuery,
    setSelectedFilter,
    setSavedIds,
    setSortOption,
    setDataView,
  };
};

export { useSearchReducer };
