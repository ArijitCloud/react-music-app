import { useReducer, useEffect } from "react";
import fetchTopAlbums from "../data/fetchTopAlbums";
import {
  fetchReducer,
  FetchState,
  initialState,
} from "./reducers/fetchReducer";

const useFetchReducer = (topLimit: number = 100): FetchState => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "init" });
      try {
        const albums = await fetchTopAlbums(topLimit);
        dispatch({ type: "success", payload: albums });
      } catch (error) {
        dispatch({ type: "failure", error: (error as Error).message });
      }
    };

    fetchData();
  }, [topLimit]);

  return state;
};

export { useFetchReducer };
