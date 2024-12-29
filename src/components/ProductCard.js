import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { name, price, picture, reviewSummary } = product;

  /*const averageRating =
    product.reviews && product.reviews.length > 0
      ? (
          product.reviews.reduce((sum, review) => sum + review.rating, 0) /
          product.reviews.length
        ).toFixed(1)
      : null;
  **/
  // Determine the minimum price for variable products or fall back to product price
  const minPrice =
    product.isVariable && product.variations && product.variations.length > 0
      ? Math.min(...product.variations.map((v) => v.price))
      : product.price;

  return (
    <div className="flex flex-col font-sans bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition duration-300 ease-in-out">
      {/* Product Image */}
      <Link to={`/product/${product._id}`} className="relative">
        <img
          src={product.picture || "/path/to/default-image.jpg"} // Use default image if picture is missing
          alt={product.name}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <div className="absolute top-2 left-2 bg-black text-white text-xs font-semibold px-2 py-1 rounded">
          {minPrice !== undefined
            ? `From $${minPrice.toFixed(2)}`
            : "Price not available"}
        </div>
      </Link>

      {/* Product Details */}
      <div className="flex-auto p-4">
        <h2 className="text-lg font-semibold text-slate-900">
          <Link to={`/product/${product._id}`}>{product.name}</Link>
        </h2>

        {/* Product Rating */}
        {reviewSummary.count>0? (
        <div className="mt-2 text-sm text-yellow-500">
          <span className="font-bold">{reviewSummary.averageRating}</span> ★
          ({reviewSummary.count} reviews)
        </div>
      ) : (
        <p className="text-sm text-gray-500"></p>
      )}
    </div>
      </div>
  );
};

export default ProductCard;
