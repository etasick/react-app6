import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductList from "../components/ProductList";
import { Helmet } from 'react-helmet-async';

const CategoryPage = () => {
  const { id } = useParams(); // Get the category ID from the URL
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await fetch(
          `https://supplement-app-d151447d38d4.herokuapp.com/api/categories/${id}/products`
        );
        const data = await response.json();
        setCategory(data.category);
        setProducts(data.productsWithReviews);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching category products:", error);
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="category-page container mx-auto px-4 py-8">
      {/* Category Header */}
           <Helmet>
                <title>{category.name}</title>
                <meta name="description" content={category.description} />
            </Helmet>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">{category.name}</h1>
        <p className="text-lg text-gray-600 mt-2">{category.description}</p>
      </div>

      {/* Product List */}
      <div>
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Products in "{category.name}"
        </h2>
        {products.length > 0 ? (
          <ProductList products={products} />
        ) : (
          <p className="text-center text-gray-500">No products available for this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
