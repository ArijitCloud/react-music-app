import { useEffect, useState } from "react";
import { HeaderBar, FilterNav, Content, QuickNav } from "./layouts";
import { useFetchReducer, SearchContextProvider } from "./state";
import { Footer } from "./layouts/Footer";

const allFilter = "All";

function App() {
  const { loading, error, data } = useFetchReducer(100);
  const [categories, setCategories] = useState<string[]>([allFilter]);
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    if (data) {
      const uniqueCategories = Array.from(
        new Set(
          data
            .map((album) => album.category?.label)
            .filter((label): label is string => typeof label === "string")
        )
      );
      setCategories([allFilter, ...uniqueCategories]);
    }
  }, [data]);

  return (
    <div
      style={{ scrollbarGutter: "stable" }}
      className="h-screen flex flex-col flex-grow overflow-auto px-2 sm:px-10 text-black dark:text-white"
    >
      <SearchContextProvider>
        <header className="sticky top-0 z-40 bg-white dark:bg-gray-bg py-4 px-6">
          <HeaderBar />
          <FilterNav categories={categories} loading={loading} />
          <QuickNav onShowSaved={(reset) => setShowSaved(!reset)} />
        </header>

        <main className="px-6">
          <Content
            data={data}
            error={error}
            loading={loading}
            showSaved={showSaved}
          />
        </main>
      </SearchContextProvider>
      <footer className="py-4 text-center text-gray-500 dark:text-gray-400 mt-auto">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
