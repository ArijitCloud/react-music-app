import { useState } from "react";
import { AlbumEntry } from "../../data/response.types";
import { MenuButton } from "../menu-button/MenuButton";
import { FavoriteManager, useSearchContext } from "../../state";

type GridCardProps = {
  album: AlbumEntry;
  isFavorite?: boolean;
};

const GridCard = ({ album, isFavorite }: GridCardProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const releaseYear = new Date(album.releaseDate.label).getFullYear();
  const { setSavedIds } = useSearchContext();

  const handleSave = () => {
    if (!album.id?.id) {
      console.error("Album id not found! this item cannot be saved");
      return;
    }

    const favoriteManager = new FavoriteManager();
    favoriteManager.save(album.id.id);
  };

  const handleRemove = () => {
    const favoriteManager = new FavoriteManager();
    favoriteManager.remove(album.id!.id);
    setSavedIds(favoriteManager.get());
  };

  return (
    <div
      tabIndex={0}
      className="relative flex flex-col items-center p-4  bg-very-light-gray
      dark:bg-card-bg rounded-md shadow-md w-full hover:bg-light-gray
      dark:hover:bg-card-hover-bg  hover:cursor-pointer"
    >
      {/* Grid image */}
      <img
        src={album.images[2].label}
        alt={album.name}
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
        className={`w-full h-48 object-cover rounded-md ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Primary text line*/}
      <div className="flex items-center my-2 w-full">
        <a
          href={album.link?.href}
          target="_blank"
          rel="noreferrer"
          className="flex-grow text-lg font-semibold cursor-pointer relative hover:underline"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <div className="line-clamp-1">{album.name}</div>

          {/* Tooltip */}
          {showTooltip && (
            <div
              aria-label={album.name}
              className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-light-gray dark:bg-tooltip-bg
            text-sm p-2 rounded shadow-lg z-10 min-w-max"
            >
              {album.name}
            </div>
          )}
        </a>
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
          className="ml-auto"
        />
      </div>

      {/* Secondary text line*/}
      <div className="text-left mt-1 secondary-text text-sm line-clamp-1 hover:whitespace-normal hover:overflow-visible w-full">
        {releaseYear} &bull; {album.artist.name}
      </div>
    </div>
  );
};

export { GridCard };
