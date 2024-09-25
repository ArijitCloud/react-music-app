// ListRow.jsx
import { useState } from "react";
import { AlbumEntry } from "../../data/response.types";
import { MenuButton } from "../menu-button/MenuButton";
import { FavoriteManager, useSearchContext } from "../../state";

type ListRowProps = {
  album: AlbumEntry;
  isFavorite?: boolean;
};

const ListRow = ({ album, isFavorite }: ListRowProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const releaseYear = new Date(album.releaseDate.label).getFullYear();
  const { setSavedIds } = useSearchContext();

  const handleSave = () => {
    if (!album.id?.id) {
      console.error("Album id not found! This item cannot be saved");
      return;
    }

    const favoriteManager = new FavoriteManager();
    favoriteManager.save(album.id.id);
    setSavedIds(favoriteManager.get());
  };

  const handleRemove = () => {
    if (!album.id?.id) return;
    const favoriteManager = new FavoriteManager();
    favoriteManager.remove(album.id.id);
    setSavedIds(favoriteManager.get());
  };

  return (
    <div
      className="flex justify-between sm:grid sm:grid-cols-12 items-center p-4 bg-white
     dark:bg-card-bg border-b border-gray-200 dark:border-gray-600 hover:bg-light-gray dark:hover:bg-card-hover-bg hover:cursor-pointer"
    >
      {/* Album Column */}
      <div className="flex items-center gap-4 sm:col-span-6 md:col-span-5">
        <img
          src={album.images[2].label}
          alt={album.name}
          className="w-12 h-12 object-cover rounded-md"
        />
        <a
          href={album.link?.href}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-lg hover:underline cursor-pointer relative"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <div className="line-clamp-1">{album.name}</div>
          {showTooltip && (
            <div className="absolute top-full left-0 mt-1 bg-light-gray dark:bg-tooltip-bg text-sm p-2 rounded shadow-lg z-10 min-w-max">
              {album.name}
            </div>
          )}
        </a>
      </div>

      {/* Artist Column */}
      <div
        className="text-sm text-gray-700 dark:text-gray-300 hidden sm:block 
      sm:col-span-4 md:col-span-3"
      >
        {album.artist.name}
      </div>

      {/* Release Year Column */}
      <div
        className="text-sm text-gray-700 dark:text-gray-300 hidden md:block 
      md:col-span-3"
      >
        {releaseYear}
      </div>

      {/* Actions Column */}
      <div className="flex justify-end w-16">
        <MenuButton
          label="actions"
          icon={{ name: "More" }}
          iconOnly={true}
          menuItems={[
            isFavorite
              ? {
                  label: "Remove from favorites",
                  iconName: "XMark",
                  onClick: handleRemove,
                }
              : {
                  label: "Add to favorites",
                  iconName: "Heart",
                  onClick: handleSave,
                },
          ]}
        />
      </div>
    </div>
  );
};

export { ListRow };
