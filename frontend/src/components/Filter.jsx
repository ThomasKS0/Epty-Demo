import React from "react";
export const Filter = ({
  filters,
  onFilterChange,
  currentCity,
  showSortOptions = false,
}) => {
  // ... existing code ...

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Filter your Preferences</h2>

      {/* Sorting Options */}
      {showSortOptions && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Sorter etter
          </h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="sortBy"
                value="dateNewest"
                checked={filters.sortBy === "dateNewest"}
                onChange={() => onFilterChange({ sortBy: "dateNewest" })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Dato nyeste</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="sortBy"
                value="priceLowest"
                checked={filters.sortBy === "priceLowest"}
                onChange={() => onFilterChange({ sortBy: "priceLowest" })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Pris lavest</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="sortBy"
                value="priceHighest"
                checked={filters.sortBy === "priceHighest"}
                onChange={() => onFilterChange({ sortBy: "priceHighest" })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Pris høyest</span>
            </label>
          </div>
        </div>
      )}

      {/* Rest of the existing filter controls... */}
    </div>
  );
};
