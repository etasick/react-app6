import React, { useEffect, useState } from "react";
import ProductList from "../components/ProductList"; // Assuming you have a ProductCard component
import { Helmet } from 'react-helmet-async';

function Shop() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://supplement-app-d151447d38d4.herokuapp.com/api/products/store/677002f923896fcda6ab960d");
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Error fetching products:", await response.text());
        }
      } catch (error) {
        console.error("Network error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Helmet>
                <title>Shop</title>
                <meta name="description" content="Shop page"/>
            </Helmet>
      <h1 className="text-3xl font-bold mb-6">Shop</h1>
      <div>
          <ProductList products={products}/>
      </div>
    </div>
  );
}

export default Shop;
