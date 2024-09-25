import { useState } from "react";
import { Icon, MenuButton } from "../components";
import { FavoriteManager, useSearchContext } from "../state";

const sortingOptions = [
  { label: "Top album", value: "default" },
  { label: "Recent release", value: "releaseDate-desc" },
  { label: "Oldest release", value: "releaseDate-asc" },
];

type QuickNavProps = {
  onShowSaved: (reset?: boolean) => void;
};

const QuickNav = ({ onShowSaved }: QuickNavProps) => {
  const [selected, setSelected] = useState(false);
  const { sortOption, setSortOption, setSavedIds, dataView, setDataView } =
  useSearchContext();

  const sortMenuItems = sortingOptions.map((option) => ({
    label: option.label,
    onClick: () => setSortOption(option.value),
    iconName: sortOption === option.value ? "Check" : undefined,
  }));

  const handleFavoritesClick = () => {
    if (selected) {
      setSavedIds([]);
    } else {
      const favoriteManager = new FavoriteManager();
      setSavedIds(favoriteManager.get());
    }
    setSelected(!selected);
    onShowSaved(selected);
  };

  return (
    <div className="flex gap-2 justify-end mt-6 mb-2 z-50">
      <button
        onClick={handleFavoritesClick}
        className={`${
          selected ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-800"
        } px-3 py-1 rounded whitespace-nowrap focus:outline-none`}
      >
        <div className="flex items-center gap-1">
          <Icon name="Heart" classNames="w-4 h-4" />
          Favorites
        </div>
      </button>
      <MenuButton
        label="Sort"
        icon={{ name: "BarsArrowDown" }}
        menuItems={sortMenuItems}
      />
      <MenuButton
        label="View"
        icon={{ name: dataView === "grid" ? "Grid" : "List" }}
        menuItems={[
          {
            label: "Grid",
            iconName: "Grid",
            onClick: () => setDataView("grid"),
          },
          {
            label: "List",
            iconName: "List",
            onClick: () => setDataView("list"),
          },
        ]}
      />
    </div>
  );
};

export { QuickNav };
