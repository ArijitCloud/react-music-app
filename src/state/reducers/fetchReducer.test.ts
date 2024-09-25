import {
  fetchReducer,
  initialState,
  FetchState,
  FetchAction,
} from "./fetchReducer";
import { AlbumEntry } from "../../data/response.types";

describe("fetchReducer", () => {
  it('should handle "init" action', () => {
    const action: FetchAction = { type: "init" };
    const expectedState: FetchState = {
      ...initialState,
      loading: true,
      error: null,
    };
    const state = fetchReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it('should handle "success" action', () => {
    const mockData: AlbumEntry[] = [
      {
        name: "Test Album",
        images: [],
        artist: { name: "Test Artist", url: undefined },
        releaseDate: { date: "2023-01-01", label: "January 1, 2023" },
      },
    ];
    const action: FetchAction = { type: "success", payload: mockData };
    const expectedState: FetchState = {
      ...initialState,
      loading: false,
      data: mockData,
      error: null,
    };
    const state = fetchReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it('should handle "failure" action', () => {
    const errorMessage = "An error occurred";
    const action: FetchAction = { type: "failure", error: errorMessage };
    const expectedState: FetchState = {
      ...initialState,
      loading: false,
      error: errorMessage,
    };
    const state = fetchReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });
});
