import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Filter } from '../Filter';
import { sampleApartments } from '../../data';

const ListView = () => {
  const location = useLocation();
  const [filters, setFilters] = useState({
    bedrooms: null,
    bathrooms: null,
    type: null,
    priceRange: [0, 10000000],
    sortBy: 'dateNewest',
  });
  
  const [currentCity, setCurrentCity] = useState('Arendal');
  const [apartments, setApartments] = useState(sampleApartments);

  // Apply filters when they change
  useEffect(() => {
    const filtered = sampleApartments.filter(apartment => {
      // Bedrooms filter
      if (filters.bedrooms) {
        if (filters.bedrooms === '5+' && apartment.bedrooms < 5) return false;
        if (filters.bedrooms !== '5+' && apartment.bedrooms !== filters.bedrooms) return false;
      }
      
      // Bathrooms filter
      if (filters.bathrooms) {
        if (filters.bathrooms === '4+' && apartment.bathrooms < 4) return false;
        if (filters.bathrooms !== '4+' && apartment.bathrooms !== filters.bathrooms) return false;
      }
      
      // Type filter
      if (filters.type && apartment.type !== filters.type) return false;
      
      // Price range filter
      if (apartment.price < filters.priceRange[0] || apartment.price > filters.priceRange[1]) return false;
      
      return true;
    });

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      if (filters.sortBy === 'dateNewest') {
        return new Date(b.date) - new Date(a.date);
      }
      if (filters.sortBy === 'priceLowest') {
        return a.price - b.price;
      }
      if (filters.sortBy === 'priceHighest') {
        return b.price - a.price;
      }
      return 0;
    });

    setApartments(sorted);
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Panel - Same as before but with sorting options */}
          <div className="lg:w-1/4">
            <Filter
              filters={filters} 
              onFilterChange={handleFilterChange} 
              currentCity={currentCity}
              showSortOptions={true}
            />
          </div>
          
          {/* Main Content - List View */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-800">
                Fant {apartments.length} boliger
              </h1>
              
              <Link 
                to="/mapview" 
                className="flex items-center text-blue-600 font-bold hover:text-blue-800"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="orangered" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Se på kart
              </Link>
            </div>
            
            {/* Apartment List */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {apartments.map(apartment => (
                <div key={apartment.id} className="border-b border-gray-200 last:border-b-0">
                  <div className="p-4 hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex flex-col md:flex-row md:items-center">
                      {/* Date */}
                      <div className="text-sm text-gray-500 mb-2 md:mb-0 md:w-24">
                        22 Mai 2025
                      </div>
                      
                      {/* Main Content */}
                      <div className="flex-1 md:ml-4">
                        <div className="flex flex-col md:flex-row md:items-center">
                          {/* Address and Info */}
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800">{apartment.address}</h3>
                            <div className="flex items-center mt-1 text-sm text-gray-600">
                              {apartment.postalCode && (
                                <span className="mr-2">{apartment.postalCode}</span>
                              )}
                              <span className="mr-2">{apartment.size} m²</span>
                              <span className="mr-2">{apartment.type}</span>
                            </div>
                          </div>
                          
                          {/* Bedrooms and Bathrooms */}
                          <div className="flex items-center mt-2 md:mt-0 md:w-32">
                            <span className="flex items-center mr-4">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                              </svg>
                              {apartment.bedrooms}
                            </span>
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {apartment.bathrooms}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Details Button */}
                      <div className="mt-3 md:mt-0 md:ml-4">
                        <Link to="/details" className='cursor-pointer'> 
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-300 text-white rounded-md text-sm font-medium transition-colors">
                          DETAILS
                        </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListView;