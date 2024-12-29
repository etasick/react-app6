import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import Reviews from "./Reviews"; // Import Reviews component
import { Helmet } from 'react-helmet-async';

const ProductDetails = () => {
  const { id } = useParams(); // Retrieve product ID from URL
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null); // For clean notification
  const [review, setReview] = useState({ name: "", rating: "", review: "" });

  useEffect(() => {
    // Fetch product details
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://supplement-app-d151447d38d4.herokuapp.com/api/products/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product details.");
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product.isVariable && !selectedVariation) {
      setNotification("Please select a variation before adding to the cart.");
      return;
    }

    const itemToAdd = product.isVariable
      ? { ...product, selectedVariation }
      : product;

    addToCart(itemToAdd);
    setNotification("Product added to cart!");
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://supplement-app-d151447d38d4.herokuapp.com/api/products/${id}/reviews`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(review),
        }
      );

      if (!response.ok) throw new Error("Failed to submit review.");

      setNotification("Review submitted! Pending admin approval.");
      setReview({ name: "", rating: "", review: "" });
    } catch (err) {
      setNotification(err.message);
    }
  };

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
       <Helmet>
                <title>{product.name}</title>
                <meta name="description" content={product.description} />
            </Helmet>
      {/* Notification */}
      {notification && (
        <div className="mb-4 bg-green-500 text-white p-4 rounded">
          {notification}
        </div>
      )}

      <div className="flex flex-wrap">
        {/* Product Image */}
        <div className="w-full md:w-1/2">
          <img
            src={product.picture || "/path/to/default-image.jpg"}
            alt={product.name}
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 p-6">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="mt-4 text-slate-600">{product.description}</p>

          <div className="mt-4 text-lg font-semibold">
            Price:{" "}
            {product.isVariable
              ? `From $${Math.min(
                  ...product.variations.map((v) => v.price)
                ).toFixed(2)}`
              : `$${(product.price || 0).toFixed(2)}`}
          </div>

          {product.isVariable && (
            <div className="mt-4">
              <label htmlFor="variation" className="block mb-2">
                Select Variation:
              </label>
              <select
                id="variation"
                className="w-full border rounded p-2"
                onChange={(e) =>
                  setSelectedVariation(
                    product.variations.find(
                      (v) => v.size === e.target.value
                    )
                  )
                }
              >
                <option value="">-- Select --</option>
                {product.variations.map((variation) => (
                  <option key={variation.size} value={variation.size}>
                    {variation.size} - ${variation.price.toFixed(2)}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <Reviews productId={id} />

      {/* Add Review Section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Add a Review</h2>
        <form onSubmit={handleReviewSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">
              Your Name:
            </label>
            <input
              type="text"
              id="name"
              className="w-full border rounded p-2"
              value={review.name}
              onChange={(e) => setReview({ ...review, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="rating" className="block mb-2">
              Rating (1-5):
            </label>
            <input
              type="number"
              id="rating"
              className="w-full border rounded p-2"
              min="1"
              max="5"
              value={review.rating}
              onChange={(e) => setReview({ ...review, rating: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="review" className="block mb-2">
              Review:
            </label>
            <textarea
              id="review"
              className="w-full border rounded p-2"
              value={review.review}
              onChange={(e) => setReview({ ...review, review: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductDetails;
