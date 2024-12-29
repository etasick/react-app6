import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

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
    <section className="py-16 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8">Shop Top Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4 md:px-16">
        {categories.map((category) => (
          <div
            key={category._id}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-all"
            onClick={() => navigate(`/category/${category._id}`)}
          >
            <h3 className="text-2xl font-semibold mb-2">{category.name}</h3>
            
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Explore Products
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryList;
