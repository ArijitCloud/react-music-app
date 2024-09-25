const allFilter = "All";
const defaultSortOption = "default";
const initialState: SearchState = {
  query: "",
  selectedFilter: allFilter,
  savedIds: [],
  sortOption: defaultSortOption,
  dataView: "grid",
};

const searchReducer = (
  state: SearchState,
  action: SearchAction
): SearchState => {
  switch (action.type) {
    case "SET_QUERY":
      return { ...state, query: action.payload };
    case "SET_SELECTED_FILTER":
      return { ...state, selectedFilter: action.payload };
    case "SET_SAVED_IDS":
      return { ...state, savedIds: action.payload };
    case "SET_SORT_OPTION":
      return { ...state, sortOption: action.payload };
    case "SET_DATA_VIEW":
      return { ...state, dataView: action.payload };
    default:
      return state;
  }
};

type SearchState = {
  query: string;
  selectedFilter: string;
  savedIds: string[];
  sortOption: string;
  dataView: string;
};

type SearchAction =
  | { type: "SET_QUERY"; payload: string }
  | { type: "SET_SELECTED_FILTER"; payload: string }
  | { type: "SET_SAVED_IDS"; payload: string[] }
  | { type: "SET_SORT_OPTION"; payload: string }
  | { type: "SET_DATA_VIEW"; payload: string };

export { initialState, searchReducer, type SearchState, type SearchAction };
