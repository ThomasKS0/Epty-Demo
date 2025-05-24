import React from "react";
import { useState } from "react";
import FilterPanel from "../layout/FilterPanel";
import MapView from "../layout/MapView";
import ApartmentCard from "../property/ApartmentCard";
import { sampleApartments } from "../../data";

const Leaflet = () => {
  const [filters, setFilters] = useState({
    bedrooms: null,
    bathrooms: null,
    type: null,
    distance: 50, // km
    priceRange: [0, 10000000],
  });

  const [currentCity, setCurrentCity] = useState("Oslo");
  const [viewMode, setViewMode] = useState("map"); // 'map' or 'list'
 
  const [apartments] = useState(sampleApartments); // This is just Sample apartments' data. 

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
    // Here you would typically filter the apartments based on the new filters
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Panel */}
          <div className="lg:w-1/4">
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              currentCity={currentCity}
            />
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="flex justify-center items-center mb-4">
              <h1 className="flex text-2xl text-center font-bold text-gray-800">
                Apartments in {currentCity} and nearby areas
              </h1>
            </div>

            {viewMode === "map" ? (
              <MapView apartments={apartments} currentCity={currentCity} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {apartments.map((apartment) => (
                  <ApartmentCard key={apartment.id} apartment={apartment} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaflet;
