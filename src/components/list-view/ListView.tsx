// ListView.jsx
import { AlbumEntry } from "../../data/response.types";
import { ListRow } from "../list-row/ListRow";

const columns = [
  { key: "Album", className: "sm:col-span-6 md:col-span-5" },
  { key: "Artist", className: "sm:col-span-5 md:col-span-3" },
  { key: "Release Year", className: "hidden md:grid md:col-span-3" },
  { key: "Actions", className: "sm:col-span-1 w-16" },
];

type ListViewProps = {
  filteredData?: AlbumEntry[];
  savedIds: string[];
};

const ListView = ({ filteredData, savedIds }: ListViewProps) => {
  return (
    <div className="w-full mb-4">
      {/* Table Header */}
      <div
        className={`hidden sm:grid grid-cols-12 sticky top-45 z-30 px-4 py-2
       bg-gray-200 dark:bg-gray-bg font-semibold`}
      >
        {columns.map((column, index) => (
          <div key={`column-${index}`} className={column.className}>
            {column.key}
          </div>
        ))}
      </div>

      {/* List of albums */}
      <div className="flex flex-col gap-2">
        {filteredData &&
          filteredData.map((album) => (
            <ListRow
              key={album.id?.id || album.name} // Use unique key if available
              album={album}
              isFavorite={!!album.id?.id && savedIds?.includes(album.id.id)}
            />
          ))}
      </div>
    </div>
  );
};
export { ListView };
