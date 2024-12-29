import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CategoryDropdown = () => {
  const [categories, setCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://supplement-app-d151447d38d4.herokuapp.com/api/categories/by-store/677002f923896fcda6ab960d"
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="relative">
      <button
        className="text-white bg-red-500 px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        Shop by Category
      </button>
      {isDropdownOpen && (
        <ul className="absolute bg-white text-black mt-2 w-48 shadow-lg rounded-md">
          {categories.map((category) => (
            <li key={category._id} className="hover:bg-gray-200">
              <Link
                to={`/category/${category._id}`}
                className="block px-4 py-2"
                onClick={() => setIsDropdownOpen(false)}
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryDropdown;
