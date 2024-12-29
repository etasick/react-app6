import React, { useState } from "react";
import { Link } from "react-router-dom";
import CategoryDropdown from "./CategoryDropdown";

function Header({ cart }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-red-500 text-white shadow-lg">
      <nav className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-wide">
          <Link to="/" className="hover:text-gray-400">
            PerthCannaco
          </Link>
        </h1>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <ul
          className={`md:flex space-x-6 ${
            menuOpen ? "block" : "hidden"
          } absolute md:relative md:block bg-black md:bg-transparent w-full md:w-auto top-16 md:top-auto left-0 z-20`}
        >
          <li>
            <Link to="/" className="block px-4 py-2 hover:text-gray-400">
              Home
            </Link>
          </li>
          <li>
            <Link to="/account" className="block px-4 py-2 hover:text-gray-400">
              Account
            </Link>
          </li>
          <li>
            <Link to="/about-us" className="block px-4 py-2 hover:text-gray-400">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/contact-us" className="block px-4 py-2 hover:text-gray-400">
              Contact Us
            </Link>
          </li>
          <li>
            <Link to="/shop" className="block px-4 py-2 hover:text-gray-400">
              Shop
            </Link>
          </li>
          <li>
            <CategoryDropdown />
          </li>
          <li>
            <Link to="/cart" className="block px-4 py-2 hover:text-gray-400">
              Cart ({cart.length})
            </Link>
          </li>
          <li>
            <Link to="/checkout" className="block px-4 py-2 hover:text-gray-400">
              Checkout
            </Link>
          </li>
          <li>
            <Link to="/track_order" className="block px-4 py-2 hover:text-gray-400">
              Track Order
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
