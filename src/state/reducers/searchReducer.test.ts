import {
  searchReducer,
  initialState,
  SearchState,
  SearchAction,
} from "./searchReducer";

describe("searchReducer", () => {
  it("should return same state when action is not in the list of SearchAction", () => {
    const unknownAction = { type: "UNKNOWN_ACTION" } as unknown as SearchAction;
    const newState = searchReducer(initialState, unknownAction);
    expect(newState).toEqual(initialState);
  });

  it("should handle SET_QUERY action", () => {
    const action: SearchAction = { type: "SET_QUERY", payload: "rock" };
    const expectedState: SearchState = { ...initialState, query: "rock" };
    const newState = searchReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it("should handle SET_SELECTED_FILTER action", () => {
    const action: SearchAction = {
      type: "SET_SELECTED_FILTER",
      payload: "Pop",
    };
    const expectedState: SearchState = {
      ...initialState,
      selectedFilter: "Pop",
    };
    const newState = searchReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it("should handle SET_SAVED_IDS action", () => {
    const savedIds = ["id1", "id2", "id3"];
    const action: SearchAction = { type: "SET_SAVED_IDS", payload: savedIds };
    const expectedState: SearchState = { ...initialState, savedIds };
    const newState = searchReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it("should handle SET_SORT_OPTION action", () => {
    const action: SearchAction = {
      type: "SET_SORT_OPTION",
      payload: "test_ascending",
    };
    const expectedState: SearchState = {
      ...initialState,
      sortOption: "test_ascending",
    };
    const newState = searchReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it("should handle SET_DATA_VIEW action", () => {
    const action: SearchAction = { type: "SET_DATA_VIEW", payload: "list" };
    const expectedState: SearchState = { ...initialState, dataView: "list" };
    const newState = searchReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it("should not mutate the original state", () => {
    const action: SearchAction = { type: "SET_QUERY", payload: "jazz" };
    const newState = searchReducer(initialState, action);
    expect(newState).not.toBe(initialState);
  });

  it("should handle multiple sequential state actions correctly", () => {
    const actions: SearchAction[] = [
      { type: "SET_QUERY", payload: "classical" },
      { type: "SET_SELECTED_FILTER", payload: "Jazz" },
      { type: "SET_SAVED_IDS", payload: ["id4", "id5"] },
      { type: "SET_SORT_OPTION", payload: "descending" },
      { type: "SET_DATA_VIEW", payload: "grid" },
    ];

    const expectedState: SearchState = {
      query: "classical",
      selectedFilter: "Jazz",
      savedIds: ["id4", "id5"],
      sortOption: "descending",
      dataView: "grid",
    };

    let state = initialState;
    actions.forEach((action) => {
      state = searchReducer(state, action);
    });

    expect(state).toEqual(expectedState);
  });

  it("should ignore actions without a payload when required", () => {
    const action = { type: "SET_QUERY" } as unknown as SearchAction;
    const newState = searchReducer(initialState, action);
    // Since payload is undefined, it should set query to undefined
    const expectedState: SearchState = {
      ...initialState,
      query: undefined as any,
    };
    expect(newState).toEqual(expectedState);
  });
});
