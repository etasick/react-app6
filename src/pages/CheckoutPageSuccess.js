import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet-async';

function CheckoutPageSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    if (location.state && location.state.order_id) {
      const fetchOrderDetails = async () => {
        try {
          const response = await fetch(`https://supplement-app-d151447d38d4.herokuapp.com/api/orders/${location.state.order_id}`);
          if (response.ok) {
            const data = await response.json();
            setOrderDetails(data);
          } else {
            console.error("Failed to fetch order details.");
          }
        } catch (error) {
          console.error("Error fetching order details:", error);
        }
      };
      fetchOrderDetails();
    }
  }, [location.state]);

  if (!orderDetails) {
    return <p className="text-center mt-10 text-gray-600">Loading order details...</p>;
  }

  const { buyer = {}, items = [], totalAmount, couponCode, shippingMethod = {}, paymentMethod = {} } = orderDetails;

  return (
    <div className="checkout-page-success container mx-auto p-6">
       <Helmet>
                <title>Checkout success</title>
                <meta name="description" content="Checkout success page"/>
            </Helmet>
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Order Confirmation</h2>
      <p className="mb-10 text-center text-gray-600">Thank you for your order! Below are your order details:</p>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Order Summary */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Order Summary</h3>
          <p className="text-gray-600">Order ID: <span className="font-medium">{orderDetails._id}</span></p>
          <p className="text-gray-600">Order Status: <span className="font-medium">{orderDetails.status}</span></p>
          <p className="text-gray-600">Total Amount: <span className="font-medium">${totalAmount.toFixed(2)}</span></p>
          {couponCode && (
            <p className="text-gray-600">Coupon Code: <span className="font-medium">{couponCode}</span></p>
          )}
          <h4 className="text-md font-semibold mt-4 text-gray-700">Items:</h4>
          <ul className="list-disc pl-5">
            {items.map((item, index) => (
              <li key={index} className="text-gray-600">
                {item.name} - Quantity: {item.quantity} - Price: ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>

        {/* Buyer Details */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Buyer Details</h3>
          <ul>
            <li className="text-gray-600">Name: <span className="font-medium">{buyer.firstName || "N/A"}</span></li>
            <li className="text-gray-600">Email: <span className="font-medium">{buyer.email || "N/A"}</span></li>
            <li className="text-gray-600">Phone: <span className="font-medium">{buyer.phone || "N/A"}</span></li>
            <li className="text-gray-600">Address: <span className="font-medium">{buyer.streetAddress || "N/A"}</span></li>
          </ul>
        </div>

        {/* Payment Details */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Payment Details</h3>
          
              <p className="text-gray-600">Name: <span className="font-medium">{paymentMethod.name || "N/A"}</span></p>
              <p className="text-gray-600">Description: <span className="font-medium">{paymentMethod.description || "N/A"}</span></p>
             < div className="flex items-center">
  {paymentMethod.picture && (
    <img 
      src={paymentMethod.picture} 
      alt={paymentMethod.name} 
      className="w-24 h-24 mr-4 rounded-md object-cover"
    />
  )}
  <div>
            </div>
          </div>
        </div>
        {console.log(paymentMethod)}
        {/* Shipping Details */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Shipping Details</h3>
          <p className="text-gray-600">Method: <span className="font-medium">{shippingMethod.name || "N/A"}</span></p>
          <p className="text-gray-600">Cost: <span className="font-medium">${shippingMethod.cost?.toFixed(2) || "0.00"}</span></p>
          <p className="text-gray-600">Estimated Delivery: <span className="font-medium">{shippingMethod.estimatedDeliveryTime || "Unknown"}</span></p>
        </div>
      </div>

      {/* Navigation Button */}
      <div className="text-center mt-8">
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 text-white px-6 py-3 rounded shadow-md hover:bg-blue-600 transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default CheckoutPageSuccess;
