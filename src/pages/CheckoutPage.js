import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet-async';

function CheckoutPage() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [activeShippingMethods, setActiveShippingMethods] = useState([]);
  const [activePaymentMethods, setActivePaymentMethods] = useState([]);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [discountType, setDiscountType] = useState(null);
  const [discountValue, setDiscountValue] = useState(0);
  const [billingDetails, setBillingDetails] = useState({
    firstName: "",
    lastName: "",
    country: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState({});

  // Fetch active methods on load
  useEffect(() => {
    const fetchActiveMethods = async () => {
      try {
        const shippingRes = await fetch(`https://supplement-app-d151447d38d4.herokuapp.com/api/admin/shipping_methods`);
        const paymentRes = await fetch(`https://supplement-app-d151447d38d4.herokuapp.com/api/admin/payment_methods`);

        if (shippingRes.ok && paymentRes.ok) {
          const shippingData = await shippingRes.json();
          const paymentData = await paymentRes.json();
          setActiveShippingMethods(shippingData.filter((method) => method.isActive));
          setActivePaymentMethods(paymentData.filter((method) => method.isActive));
        }
      } catch (error) {
        console.error("Error fetching methods:", error);
      }
    };
    fetchActiveMethods();
  }, []);

  useEffect(() => {
    if (activeShippingMethods.length > 0) {
      setSelectedShippingMethod(activeShippingMethods[0]);
    }
    if (activePaymentMethods.length > 0) {
      setSelectedPaymentMethod(activePaymentMethods[0]);
    }
  }, [activeShippingMethods, activePaymentMethods]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const calculateCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.selectedVariation?.price ?? item.product.price;
      return total + price * item.quantity;
    }, 0);
  };

  const calculateDiscountAmount = () => {
    if (discountType === "percentage") {
      return (calculateCartTotal() * discountValue) / 100;
    } else if (discountType === "fixed") {
      return discountValue;
    }
    return 0;
  };

  const calculateTotalAmount = () => {
    const discount = calculateDiscountAmount();
    const shippingCost = selectedShippingMethod?.cost ?? 0;
    return calculateCartTotal() + shippingCost - discount;
  };

  const validateFields = () => {
    const newErrors = {};
    const requiredFields = [
      "firstName",
      "lastName",
      "country",
      "streetAddress",
      "city",
      "state",
      "zipCode",
      "phone",
      "email",
    ];

    requiredFields.forEach((field) => {
      if (!billingDetails[field]) {
        newErrors[field] = `${field.replace(/([A-Z])/g, " $1")} is required`;
      }
    });

    if (!selectedShippingMethod) {
      newErrors.shippingMethod = "Please select a shipping method";
    }
    if (!selectedPaymentMethod) {
      newErrors.paymentMethod = "Please select a payment method";
    }
    if (cart.length === 0) {
      newErrors.cart = "Your cart is empty. Add items before proceeding.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = async () => {
    if (!validateFields()) return;

    const orderDetails = {
      buyer: {
        ...billingDetails,
        address: `${billingDetails.streetAddress}, ${billingDetails.city}, ${billingDetails.state}, ${billingDetails.zipCode}`,
      },
      items: cart.map((item) => ({
        productId: item.product._id,
        name: item.product.name,
        price: item.selectedVariation?.price ?? item.product.price,
        quantity: item.quantity,
        variation: item.selectedVariation?.size || "default",
      })),
      totalAmount: calculateTotalAmount(),
      discount: calculateDiscountAmount(),
      couponCode,
      shippingMethod: selectedShippingMethod,
      paymentMethod: selectedPaymentMethod,
    };
   console.log(orderDetails);
    try {
      const response = await fetch(`https://supplement-app-d151447d38d4.herokuapp.com/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderDetails),
      });

      if (response.ok) {
        const { orderId } = await response.json();
        clearCart();
        navigate("/checkoutpagesuccess", { state: { order_id: orderId } });
      } else {
        alert("Failed to place order. Try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const handleCouponApply = async () => {
    try {
      const response = await fetch(`https://supplement-app-d151447d38d4.herokuapp.com/api/validate-coupon`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode }),
      });
      if (response.ok) {
        const data = await response.json();
        setDiscountType(data.discountType);
        setDiscountValue(data.discountValue);
      } else {
        alert("Invalid coupon code.");
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      <Helmet>
                <title>Checkout Page</title>
                <meta name="description" content="Checkout Page"/>
            </Helmet>
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-3">Order Summary</h3>
        {cart.map((item) => (
          <div key={`${item.product._id}-${item.selectedVariation?.size || "simple"}`} className="mb-3">
            <p>
              {item.product.name} - {item.selectedVariation?.size || "Default"}: {item.quantity} x $
              {(item.selectedVariation?.price || item.product.price).toFixed(2)}
            </p>
          </div>
        ))}
        <p>Subtotal: ${calculateCartTotal().toFixed(2)}</p>
        <p>Discount: -${calculateDiscountAmount().toFixed(2)}</p>
        <p>Shipping: ${selectedShippingMethod?.cost || 0}</p>
        <p>Total: ${calculateTotalAmount().toFixed(2)}</p>
        {errors.cart && <p className="text-red-500">{errors.cart}</p>}
      </div>

      {/* Coupon Code */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="p-2 border rounded"
        />
        <button onClick={handleCouponApply} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
          Apply Coupon
        </button>
      </div>

      {/* Billing Details */}
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-3">Billing Details</h3>
        {Object.keys(billingDetails).map((field) => (
          <div key={field} className="mb-3">
            <input
              type="text"
              name={field}
              placeholder={`${field.replace(/([A-Z])/g, " $1")}`}
              value={billingDetails[field]}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
            />
            {errors[field] && <p className="text-red-500">{errors[field]}</p>}
          </div>
        ))}
      </div>

      {/* Shipping and Payment Methods */}
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-3">Shipping Method</h3>
        {activeShippingMethods.map((method) => (
          <div key={method._id} className="mb-3">
            <label>
              <input
                type="radio"
                name="shippingMethod"
                checked={selectedShippingMethod?._id === method._id}
                onChange={() => setSelectedShippingMethod(method)}
              />
              {` ${method.name} - $${method.cost}`}
            </label>
          </div>
        ))}
        {errors.shippingMethod && <p className="text-red-500">{errors.shippingMethod}</p>}

        <h3 className="text-xl font-bold mb-3">Payment Method</h3>
        {activePaymentMethods.map((method) => (
          <div key={method._id} className="mb-3">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                checked={selectedPaymentMethod?._id === method._id}
                onChange={() => setSelectedPaymentMethod(method)}
              />
              {` ${method.name}`}
            </label>
          </div>
        ))}
        {errors.paymentMethod && <p className="text-red-500">{errors.paymentMethod}</p>}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmitOrder}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Place Order
      </button>
    </div>
  );
}

export default CheckoutPage;
