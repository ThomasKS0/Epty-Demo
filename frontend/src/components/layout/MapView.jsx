import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";
const MapView = ({ apartments, currentCity }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    mapInstance.current = L.map(mapRef.current).setView([59.9139, 10.7522], 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstance.current);

    // Cleanup
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstance.current || !apartments.length) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add new markers
    apartments.forEach((apartment) => {
      if (apartment.latitude && apartment.longitude) {
        const marker = L.marker([apartment.latitude, apartment.longitude])
          .addTo(mapInstance.current)
          .bindPopup(`<b>${apartment.title}</b><br>${apartment.price} kr`);

        markersRef.current.push(marker);
      }
    });

    // Fit bounds to show all markers
    if (apartments.length > 0 && apartments[0].latitude) {
      const bounds = L.latLngBounds(
        apartments.map((apt) => [apt.latitude, apt.longitude])
      );
      mapInstance.current.fitBounds(bounds);
    }
  }, [apartments]);

  return (
    <div
      ref={mapRef}
      className="h-[500px] rounded-lg shadow-md border border-gray-200"
    />
  );
};

export default MapView;
