const SkeletonGridCard = () => {
  return (
    <div className="relative flex flex-col items-center p-4 bg-very-light-gray dark:bg-card-bg rounded-md shadow-md w-full">
      {/* Image Placeholder */}
      <div className="w-full h-48 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md"></div>

      {/* Title Placeholder */}
      <div className="mt-2 w-3/4 h-6 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>

      {/* Tooltip Placeholder */}
      <div className="mt-1 w-1/2 h-4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>

      {/* Release Year and Artist Placeholder */}
      <div className="mt-1 w-1/2 h-4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
    </div>
  );
};

export { SkeletonGridCard };
