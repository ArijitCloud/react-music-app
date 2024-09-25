import { useMemo } from "react";
import { OverflowCarousel, SkeletonFilters } from "../components";
import { useSearchContext } from "../state";

type FilterNavProps = {
  categories: string[];
  loading?: boolean;
};

const FilterNav = ({ categories, loading }: FilterNavProps) => {
  const { selectedFilter, setSelectedFilter } = useSearchContext();
  if (loading) return <SkeletonFilters />;
  const categoryButtons = useMemo(
    () =>
      categories &&
      categories.map((category, index) => (
        <button
          key={`category${index}`}
          type="button"
          onClick={() =>
            setSelectedFilter(selectedFilter === category ? "All" : category)
          }
          className={`px-3 py-1 rounded whitespace-nowrap cursor-pointer ${
            selectedFilter === category
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          }`}
        >
          {category}
        </button>
      )),
    [categories, selectedFilter]
  );
  return (
    <nav className="flex gap-4 my-2 overflow-x-hidden">
      <OverflowCarousel>{categoryButtons}</OverflowCarousel>
    </nav>
  );
};

export { FilterNav };
