import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SearchContextProvider } from "./SearchContextProvider";
import { useSearchReducer } from "./useSearchReducer";
import { useSearchContext } from "./useSearchContext";

/** Mocks */
jest.mock("./useSearchReducer");

const mockSetSavedIds = jest.fn();
const mockSetSortOption = jest.fn();

(useSearchReducer as jest.Mock).mockReturnValue({
  query: "",
  setQuery: jest.fn(),
  selectedFilter: "All",
  setSelectedFilter: jest.fn(),
  savedIds: [],
  setSavedIds: mockSetSavedIds,
  sortOption: "default",
  setSortOption: mockSetSortOption,
  dataView: "grid",
  setDataView: jest.fn(),
});

/** Use the test component to test all the context update and value */
const TestComponent = () => {
  const {
    query,
    setQuery,
    selectedFilter,
    setSelectedFilter,
    savedIds,
    setSavedIds,
    sortOption,
    setSortOption,
    dataView,
    setDataView,
  } = useSearchContext();

  return (
    <div>
      <div data-testid="query">{query}</div>
      <button onClick={() => setQuery("rock")}>Set Query</button>

      <div data-testid="selectedFilter">{selectedFilter}</div>
      <button onClick={() => setSelectedFilter("Pop")}>Set Filter</button>

      <div data-testid="savedIds">{savedIds.join(",")}</div>
      <button onClick={() => setSavedIds(["id1", "id2"])}>Set Saved IDs</button>

      <div data-testid="sortOption">{sortOption}</div>
      <button onClick={() => setSortOption("test_ascending")}>
        Set Sort Option
      </button>

      <div data-testid="dataView">{dataView}</div>
      <button onClick={() => setDataView("list")}>Set Data View</button>
    </div>
  );
};

describe("SearchContext", () => {
  it("provides initial state correctly", () => {
    render(
      <SearchContextProvider>
        <TestComponent />
      </SearchContextProvider>
    );

    expect(screen.getByTestId("query")).toHaveTextContent("");
    expect(screen.getByTestId("selectedFilter")).toHaveTextContent("All");
    expect(screen.getByTestId("savedIds")).toHaveTextContent("");
    expect(screen.getByTestId("sortOption")).toHaveTextContent("default");
    expect(screen.getByTestId("dataView")).toHaveTextContent("grid");
  });

  it("updates query when setQuery is called", () => {
    render(
      <SearchContextProvider>
        <TestComponent />
      </SearchContextProvider>
    );

    fireEvent.click(screen.getByText("Set Query"));
    expect(useSearchReducer().setQuery).toHaveBeenCalledWith("rock");
  });

  it("updates selectedFilter when setSelectedFilter is called", () => {
    render(
      <SearchContextProvider>
        <TestComponent />
      </SearchContextProvider>
    );

    fireEvent.click(screen.getByText("Set Filter"));
    expect(useSearchReducer().setSelectedFilter).toHaveBeenCalledWith("Pop");
  });

  it("updates savedIds when setSavedIds is called", () => {
    render(
      <SearchContextProvider>
        <TestComponent />
      </SearchContextProvider>
    );

    fireEvent.click(screen.getByText("Set Saved IDs"));
    expect(mockSetSavedIds).toHaveBeenCalledWith(["id1", "id2"]);
  });

  it("updates sortOption when setSortOption is called", () => {
    render(
      <SearchContextProvider>
        <TestComponent />
      </SearchContextProvider>
    );

    fireEvent.click(screen.getByText("Set Sort Option"));
    expect(mockSetSortOption).toHaveBeenCalledWith("test_ascending");
  });

  it("updates dataView when setDataView is called", () => {
    render(
      <SearchContextProvider>
        <TestComponent />
      </SearchContextProvider>
    );

    fireEvent.click(screen.getByText("Set Data View"));
    expect(useSearchReducer().setDataView).toHaveBeenCalledWith("list");
  });
});
