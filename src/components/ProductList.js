import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const itemsPerPage = 6; // Customize this value as needed

  // Filter, sort, and paginate products
  useEffect(() => {
    let updatedProducts = products;

    // Search functionality
    if (searchQuery) {
      updatedProducts = updatedProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sorting functionality
    if (sortOrder === "price-asc") {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-desc") {
      updatedProducts.sort((a, b) => b.price - a.price);
    } else if (sortOrder === "name-asc") {
      updatedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "name-desc") {
      updatedProducts.sort((a, b) => b.name.localeCompare(a.name));
    }

    // Pagination functionality
    const startIdx = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = updatedProducts.slice(startIdx, startIdx + itemsPerPage);
    
    setFilteredProducts(paginatedProducts);
  }, [searchQuery, sortOrder, currentPage, products]);

  // Total pages for pagination
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className="p-4">
      {/* Search Bar */}
      <div className="flex mb-4 space-x-2">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* Sorting Dropdown */}
      <div className="flex justify-end mb-4">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="default">Sort by</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard  product={product} />

        ))}
        
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 border rounded-lg"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2 border rounded-lg">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-4 py-2 border rounded-lg"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
