import { useState } from "react";
import React from "react";
const FilterPanel = ({ filters, onFilterChange, currentCity }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleApplyFilters = () => {
    onFilterChange(localFilters);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      bedrooms: null,
      bathrooms: null,
      type: null,
      distance: 50,
      priceRange: [0, 10000000],
    };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Filters</h2>

      <div className="space-y-6">
        {/* Bedrooms */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Bedrooms</h3>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, "5+"].map((num) => (
              <button
                key={num}
                onClick={() =>
                  setLocalFilters({ ...localFilters, bedrooms: num })
                }
                className={`px-3 py-1 rounded-full text-sm ${localFilters.bedrooms === num ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"}`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Bathrooms */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Bathrooms</h3>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, "4+"].map((num) => (
              <button
                key={num}
                onClick={() =>
                  setLocalFilters({ ...localFilters, bathrooms: num })
                }
                className={`px-3 py-1 rounded-full text-sm ${localFilters.bathrooms === num ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"}`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Property Type */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Property Type
          </h3>
          <div className="space-y-2">
            {["Apartment", "House", "Townhouse", "Cabin"].map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="radio"
                  name="propertyType"
                  checked={localFilters.type === type}
                  onChange={() => setLocalFilters({ ...localFilters, type })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Distance */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Distance from {currentCity} (max {localFilters.distance} km)
          </h3>
          <input
            type="range"
            min="1"
            max="100"
            value={localFilters.distance}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, distance: e.target.value })
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Price Range */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Price Range
          </h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              {localFilters.priceRange[0].toLocaleString()} kr
            </span>
            <span className="text-sm text-gray-600">
              {localFilters.priceRange[1].toLocaleString()} kr
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              value={localFilters.priceRange[0]}
              onChange={(e) =>
                setLocalFilters({
                  ...localFilters,
                  priceRange: [
                    parseInt(e.target.value),
                    localFilters.priceRange[1],
                  ],
                })
              }
              className="w-1/2 p-2 border border-gray-300 rounded-md text-sm"
              placeholder="Min"
            />
            <input
              type="number"
              value={localFilters.priceRange[1]}
              onChange={(e) =>
                setLocalFilters({
                  ...localFilters,
                  priceRange: [
                    localFilters.priceRange[0],
                    parseInt(e.target.value),
                  ],
                })
              }
              className="w-1/2 p-2 border border-gray-300 rounded-md text-sm"
              placeholder="Max"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-2">
          <button
            onClick={handleResetFilters}
            className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Reset
          </button>
          <button
            onClick={handleApplyFilters}
            className="flex-1 py-2 px-4 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
