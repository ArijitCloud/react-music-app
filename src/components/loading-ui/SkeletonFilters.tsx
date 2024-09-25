const SkeletonFilters = () => {
    const filterSkeletons = Array(10).fill(null); // Adjust the number of skeleton buttons if needed.
  
    return (
      <div className="flex gap-2 overflow-x-auto">
        {filterSkeletons.map((_, index) => (
          <div
            key={index}
            className="w-20 h-8 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md"
          ></div>
        ))}
      </div>
    );
  };
  
  export { SkeletonFilters };
  