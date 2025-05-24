import React from 'react'
import { Link } from 'react-router-dom'

export default function PropertyCard({ property }) {
  if (!property) return null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/property/${property.id ?? ''}`}>
        <div className="relative pb-[75%]">
          <img 
            src={property.image || '/placeholder-property.jpg'} 
            alt={property.title || 'Property image'}
            className="absolute h-full w-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-1">{property.title || 'No title'}</h3>
          <p className="text-gray-600 mb-2">{property.location || 'No location'}</p>
          <div className="flex justify-between items-center">
            <span className="font-bold text-blue-600">
              {property.price ? property.price.toLocaleString() : 'N/A'} NOK
            </span>
            <span className="text-sm text-gray-500">
              {property.squareMeters ? `${property.squareMeters} m²` : 'N/A'}
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}