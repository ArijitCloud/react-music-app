import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useFetchReducer } from "./state";
import App from "./App";

/** Mocks */
jest.mock("./state", () => ({
  ...jest.requireActual("./state"),
  useFetchReducer: jest.fn(),
  SearchProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

/** Mock Components */
jest.mock("./layouts", () => ({
  HeaderBar: () => <div data-testid="header-bar">HeaderBar</div>,
  FilterNav: ({ categories, loading }: any) => (
    <div data-testid="filter-nav">
      {loading ? "Loading Filters..." : categories.join(", ")}
    </div>
  ),
  QuickNav: ({ onShowSaved }: any) => (
    <button data-testid="quick-nav" onClick={() => onShowSaved(false)}>
      Toggle Saved
    </button>
  ),
  Content: ({ error, loading, showSaved }: any) => (
    <div data-testid="content">
      {loading && "Loading Content..."}
      {error && `Error: ${error}`}
      {!loading && !error && showSaved && "Showing Saved Albums"}
      {!loading && !error && !showSaved && "Showing All Albums"}
    </div>
  ),
}));

describe("App Integration Tests", () => {
  const mockUseFetchReducer = useFetchReducer as jest.Mock;

  const defaultMockState = {
    query: "",
    setQuery: jest.fn(),
    selectedFilter: "All",
    setSelectedFilter: jest.fn(),
    savedIds: [],
    setSavedIds: jest.fn(),
    sortOption: "default",
    setSortOption: jest.fn(),
    dataView: "grid",
    setDataView: jest.fn(),
    loading: false,
    error: null,
    data: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseFetchReducer.mockReturnValue(defaultMockState);
  });

  it("renders without crashing at the beginning", () => {
    render(<App />);

    expect(screen.getByTestId("header-bar")).toBeInTheDocument();
    expect(screen.getByTestId("filter-nav")).toHaveTextContent("All");
    expect(screen.getByTestId("quick-nav")).toBeInTheDocument();
    expect(screen.getByTestId("content")).toHaveTextContent(
      "Showing All Albums"
    );
  });

  it("renders correctly during loading state", () => {
    mockUseFetchReducer.mockReturnValue({
      ...defaultMockState,
      loading: true,
      data: null,
    });

    render(<App />);

    expect(screen.getByTestId("header-bar")).toBeInTheDocument();
    expect(screen.getByTestId("filter-nav")).toHaveTextContent(
      "Loading Filters..."
    );
    expect(screen.getByTestId("quick-nav")).toBeInTheDocument();
    expect(screen.getByTestId("content")).toHaveTextContent(
      "Loading Content..."
    );
  });

  it("renders correctly when there is an error", () => {
    mockUseFetchReducer.mockReturnValue({
      ...defaultMockState,
      loading: false,
      error: "Failed to fetch data",
      data: null,
    });

    render(<App />);

    expect(screen.getByTestId("filter-nav")).toHaveTextContent("All");
    expect(screen.getByTestId("content")).toHaveTextContent(
      "Error: Failed to fetch data"
    );
  });

  it("renders correctly with fetched data", () => {
    const mockData = [
      { category: { label: "Rock" }, id: "1", name: "Rock Album 1" },
      { category: { label: "Jazz" }, id: "2", name: "Jazz Album 1" },
    ];

    mockUseFetchReducer.mockReturnValue({
      ...defaultMockState,
      loading: false,
      error: null,
      data: mockData,
    });

    render(<App />);

    expect(screen.getByTestId("filter-nav")).toHaveTextContent(
      "All, Rock, Jazz"
    );
    expect(screen.getByTestId("content")).toHaveTextContent(
      "Showing All Albums"
    );
  });

  it("toggles showSaved when QuickNav button is clicked", async () => {
    const mockData = [
      { category: { label: "Rock" }, id: "1", name: "Rock Album 1" },
      { category: { label: "Jazz" }, id: "2", name: "Jazz Album 1" },
    ];

    mockUseFetchReducer.mockReturnValue({
      ...defaultMockState,
      loading: false,
      error: null,
      data: mockData,
    });

    render(<App />);

    // Initially showing all albums
    expect(screen.getByTestId("content")).toHaveTextContent(
      "Showing All Albums"
    );

    // Click QuickNav to toggle showSaved
    fireEvent.click(screen.getByTestId("quick-nav"));

    // Since onShowSaved(false) is called, showSaved should be true
    await waitFor(() => {
      expect(screen.getByTestId("content")).toHaveTextContent(
        "Showing Saved Albums"
      );
    });
  });

  it("sets categories correctly based on fetched data", () => {
    const mockData = [
      { category: { label: "Rock" }, id: "1", name: "Rock Album 1" },
      { category: { label: "Jazz" }, id: "2", name: "Jazz Album 1" },
      { category: { label: "Pop" }, id: "3", name: "Pop Album 1" },
      { category: { label: "Rock" }, id: "4", name: "Rock Album 2" },
    ];

    mockUseFetchReducer.mockReturnValue({
      ...defaultMockState,
      loading: false,
      error: null,
      data: mockData,
    });

    render(<App />);

    // Categories should be unique and include 'All'
    expect(screen.getByTestId("filter-nav")).toHaveTextContent(
      "All, Rock, Jazz, Pop"
    );
  });

  it("handles empty data correctly", () => {
    mockUseFetchReducer.mockReturnValue({
      ...defaultMockState,
      loading: false,
      error: null,
      data: [],
    });

    render(<App />);

    expect(screen.getByTestId("filter-nav")).toHaveTextContent("All");
    expect(screen.getByTestId("content")).toHaveTextContent(
      "Showing All Albums"
    );
  });

  it("does not include non-string category labels", () => {
    const mockData = [
      { category: { label: "Rock" }, id: "1", name: "Rock Album 1" },
      { category: { label: null }, id: "2", name: "Unknown Album" }, // Non-string category
      { category: { label: "Jazz" }, id: "3", name: "Jazz Album 1" },
    ];

    mockUseFetchReducer.mockReturnValue({
      ...defaultMockState,
      loading: false,
      error: null,
      data: mockData,
    });

    render(<App />);

    expect(screen.getByTestId("filter-nav")).toHaveTextContent(
      "All, Rock, Jazz"
    );
  });
});
