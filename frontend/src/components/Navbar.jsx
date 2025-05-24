import React from "react";
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  UserIcon,
  HeartIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Logo from "./ui/Logo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".navbar-container")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Buy", path: "/buy" },
    { name: "Rent", path: "/rent" },
    { name: "Sell", path: "/sell" },
    { name: "Map", path: "/mapview" },
    { name: "Agents", path: "/agents" },
  ];

  return (
    <header
      className={`navbar-container fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-white/90 backdrop-blur-sm"}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md font-medium transition-colors ${
                    isActive
                      ? "bg-blue-900 text-white"
                      : "text-blue-900 hover:bg-blue-50 hover:text-blue-800"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Side Controls */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-blue-900 hover:text-orange-500 transition-colors">
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
            <button className="p-2 text-blue-900 hover:text-orange-500 transition-colors">
              <HeartIcon className="h-5 w-5" />
            </button>
            <NavLink to="/login" onClick={scrollToTop}>
              <button className="flex items-center space-x-1 px-3 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors">
                <UserIcon className="h-4 w-4" />
                <span className="font-bold">Sign In</span>
              </button>{" "}
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-blue-900"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen ? "max-h-9/12 py-4" : "max-h-0 py-0"
          }`}
        >
          <div className="flex flex-col space-y-2 px-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-md font-medium ${
                    isActive
                      ? "bg-blue-900 text-white"
                      : "text-blue-900 hover:bg-blue-50"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
            <div className="pt-2 mt-2 border-t border-gray-200">
              <NavLink to="/login" onClick={scrollToTop}>
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600">
                  <UserIcon className="h-5 w-5" />
                  <span>Sign In</span>
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
