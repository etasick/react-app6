import React, { useState } from "react";
import { Helmet } from 'react-helmet-async';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  const handleInputChange = (e) => {
    setOrderId(e.target.value);
  };

  const handleTrackOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setOrderDetails(null);

    try {
      const res = await fetch(`${apiUrl}/api/orders/${orderId}`);
      if (res.ok) {
        const data = await res.json();
        setOrderDetails(data);
      } else {
        setError("Order not found. Please check the Order ID and try again.");
      }
    } catch (error) {
      setError("An error occurred while fetching the order details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      
<Helmet>
                <title>Track order</title>
                <meta name="description" content="track order page"/>
            </Helmet>
      <h1 className="text-2xl font-semibold mb-4">Track Your Order</h1>

      <form onSubmit={handleTrackOrder} className="mb-6">
        <label htmlFor="orderId" className="block text-gray-700 mb-2">
          Enter Order ID:
        </label>
        <input
          type="text"
          id="orderId"
          value={orderId}
          onChange={handleInputChange}
          placeholder="Order ID"
          className="border border-gray-300 rounded-md p-2 w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-600"
        >
          {loading ? "Loading..." : "Track Order"}
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      {orderDetails && (
        <div className="order-details bg-gray-100 p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-2">Order Details</h2>
          <p><strong>Order ID:</strong> {orderDetails._id}</p>
          <p><strong>Status:</strong> {orderDetails.status}</p>
          <p><strong>Date:</strong> {new Date(orderDetails.date).toLocaleDateString()}</p>
          <h3 className="text-lg font-semibold mt-4">Items:</h3>
          <ul className="list-disc list-inside">
            {orderDetails.items.map((item, index) => (
              <li key={index}>
                {item.name} - Quantity: {item.quantity} - Price: ${item.price}
              </li>
            ))}
          </ul>
          <p className="mt-4"><strong>Total Price:</strong> ${orderDetails.totalAmount}</p>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
