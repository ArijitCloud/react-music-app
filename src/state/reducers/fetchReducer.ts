import { AlbumEntry } from "../../data/response.types";

const initialState: FetchState = {
  loading: false,
  error: null,
  data: null,
};
const fetchReducer = (state: FetchState, action: FetchAction): FetchState => {
  switch (action.type) {
    case "init":
      return { ...state, loading: true, error: null };
    case "success":
      return { ...state, loading: false, data: action.payload, error: null };
    case "failure":
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

interface FetchState {
  loading: boolean;
  error: string | null;
  data: AlbumEntry[] | null;
}

type FetchAction =
  | { type: "init" }
  | { type: "success"; payload: AlbumEntry[] }
  | { type: "failure"; error: string };

export { fetchReducer, initialState };
export type { FetchState, FetchAction };
