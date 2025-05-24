import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import { sampleApartments } from "../../data";
import MapView from "../layout/MapView";

export default function MapPage() {
  const [filters, setFilters] = useState({
    bedrooms: 1,
    bathrooms: 1,
    size: [0, 500],
    types: {
      apartment: true,
      detached: true,
      townhouse: false,
      semiDetached: false,
    },
    status: "",
  });
  const [apartments, setApartments] = useState(sampleApartments);
  const [currentCity, setCurrentCity] = useState("Arendal");
  const [viewMode, setViewMode] = useState("map");
  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  return (
    <div className="flex h-screen" >
      {/* Sidebar */}
      <div className="w-96 p-6 bg-white shadow-lg space-y-4">
        <div className="space-y-2">
          <Link
            to="/list"
            className="flex items-center text-blue-600 hover:text-blue-800 border rounded p-2 font-semibold"
          >
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            Se som Liste
          </Link>
          <input
            type="text"
            placeholder="Adresse"
            className="w-full px-4 py-2 border rounded"
          />
          <div className="flex items-center justify-between">
            <span>Antall soverom</span>
            <div className="flex space-x-2">
              <button
                onClick={() =>
                  setFilters((f) => ({
                    ...f,
                    bedrooms: Math.max(0, f.bedrooms - 1),
                  }))
                }
              >
                -
              </button>
              <span>{filters.bedrooms}</span>
              <button
                onClick={() =>
                  setFilters((f) => ({ ...f, bedrooms: f.bedrooms + 1 }))
                }
              >
                +
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span>Antall bad</span>
            <div className="flex space-x-2">
              <button
                onClick={() =>
                  setFilters((f) => ({
                    ...f,
                    bathrooms: Math.max(0, f.bathrooms - 1),
                  }))
                }
              >
                -
              </button>
              <span>{filters.bathrooms}</span>
              <button
                onClick={() =>
                  setFilters((f) => ({ ...f, bathrooms: f.bathrooms + 1 }))
                }
              >
                +
              </button>
            </div>
          </div>
          <div>
            <span>Størrelse</span>
            <input
              type="range"
              min="0"
              max="500"
              value={filters.size[1]}
              onChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  size: [0, parseInt(e.target.value)],
                }))
              }
              className="w-full"
            />
            <div className="flex justify-between text-sm">
              <input
                type="number"
                value={filters.size[0]}
                readOnly
                className="border px-2 py-1 w-20"
              />{" "}
              m²
              <input
                type="number"
                value={filters.size[1]}
                onChange={(e) =>
                  setFilters((f) => ({
                    ...f,
                    size: [f.size[0], parseInt(e.target.value)],
                  }))
                }
                className="border px-2 py-1 w-20"
              />{" "}
              m²
            </div>
          </div>
          <div>
            <p>Boligtype</p>
            {["Leilighet", "Enebolig", "Rekkehus", "Tomannsbolig"].map(
              (type, idx) => (
                <label key={idx} className="block">
                  <input
                    type="checkbox"
                    checked={filters.types[type.toLowerCase()]}
                    onChange={(e) =>
                      setFilters((f) => ({
                        ...f,
                        types: {
                          ...f.types,
                          [type.toLowerCase()]: e.target.checked,
                        },
                      }))
                    }
                  />{" "}
                  {type}
                </label>
              )
            )}
          </div>
          <div>
            <label>Markedsstatus</label>
            <select className="w-full border px-2 py-1 mt-1">
              <option value="">Velg markedsstatus</option>
              <option value="til-salgs">Til salgs</option>
              <option value="solgt">Solgt</option>
            </select>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="flex-grow h-full">
        <MapContainer
          center={[59.9139, 10.7522]}
          zoom={13}
          className="h-full w-full z-0"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* Example marker */}
          <Marker position={[59.9139, 10.7522]}>
            <Popup>
              3 soverom, 2 bad <br /> 120m² Leilighet
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Main Content */}
      <div className="lg:w-3/4">
        <div className="flex justify-center items-center mb-4 mt-12">
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
  );
}
