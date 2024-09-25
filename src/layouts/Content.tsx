import { GridCard,ListView, SkeletonGridCard } from "../components";
import { AlbumEntry } from "../data/response.types";
import { useSearchContext } from "../state";

type ContentProps = {
  loading: boolean;
  error: string | null;
  data: AlbumEntry[] | null;
  showSaved?: boolean;
};

type FilterCondition = {
  query: string;
  filter: string;
  album: AlbumEntry;
  showSaved?: boolean;
  savedIds?: string[];
};

const filterCondition = ({
  album,
  filter,
  query,
  savedIds,
}: FilterCondition) => {
  let matchesSaved = true;
  if (savedIds) {
    matchesSaved = !!album.id?.id && savedIds.includes(album.id?.id);
  }

  const matchesQuery =
    !query ||
    album.name.toLowerCase().includes(query.toLowerCase()) ||
    album.artist.name.toLowerCase().includes(query.toLowerCase());
  const matchesFilter = filter === "All" || album.category?.label === filter;

  return matchesQuery && matchesFilter && matchesSaved;
};

const sortCondition = (
  a: AlbumEntry,
  b: AlbumEntry,
  sortOption: string
): number => {
  switch (sortOption) {
    case "releaseDate-desc":
      return (
        new Date(b.releaseDate.date).getTime() -
        new Date(a.releaseDate.date).getTime()
      );
    case "releaseDate-asc":
      return (
        new Date(a.releaseDate.date).getTime() -
        new Date(b.releaseDate.date).getTime()
      );
    case "default":
      return 0;
  }
  return 0;
};

const Content = (props: ContentProps) => {
  const { loading, error, data } = props;
  const { query, selectedFilter, savedIds, sortOption, dataView } = useSearchContext();

  const filteredData = data
    ?.filter((album) =>
      filterCondition({
        query,
        filter: selectedFilter,
        album,
        savedIds: props.showSaved ? savedIds : undefined,
      })
    )
    .sort((a, b) => sortCondition(a, b, sortOption));

  if (loading) {
    return (
      <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
        {Array.from({ length: 20 }).map((_, index) => (
          <SkeletonGridCard key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-span-full text-center text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!loading && !filteredData?.length) {
    return (
      <div className="col-span-full text-center text-gray-500">
        No results found{query ? ` for your search "${query}"` : ""}.
      </div>
    );
  }

  return (
    <>
      {dataView === "grid" ? (
        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(240px,1fr))]  mb-4">
          {filteredData &&
            filteredData.map((album, index) => (
              <GridCard
                key={index}
                album={album}
                isFavorite={!!album.id?.id && savedIds?.includes(album.id.id)}
              />
            ))}
        </div>
      ) : (
        <ListView filteredData={filteredData} savedIds={savedIds} />
      )}
    </>
  );
};

export { Content };
