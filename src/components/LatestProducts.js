import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const LatestProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const response = await fetch("https://supplement-app-d151447d38d4.herokuapp.com/api/products/store/677002f923896fcda6ab960d/latest");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching latest products:", error);
      }
    };

    fetchLatestProducts();
  }, []);

  return (
    <section className="py-10 bg-white">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">New Arrivals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {products.map((product) => (
         <ProductCard product={product}/>
        ))}
      </div>
    </section>
  );
};

export default LatestProducts;
