import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 text-center">
      <h1 className="text-9xl font-bold text-gray-300 mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved
      </p>
      <Link to="/">
        <Button className="px-8 py-3">Return Home</Button>
      </Link>
    </div>
  );
}
