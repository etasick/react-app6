import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet-async';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  //console.log(cart);
  const handleQuantityChange = (productId, variation, amount) => {
    const cartItem = cart.find(
      (item) =>
        item.product._id === productId &&
        item.selectedVariation?._id === variation?._id // Compare using unique identifiers
    );
    if (cartItem && cartItem.quantity + amount > 0) {
      updateQuantity(productId, variation, amount); // Ensure variation is passed
    }
  };

  const totalAmount = cart.reduce(
    (total, item) =>
      total +
      ((item.selectedVariation?.price ?? item.product?.price ?? 0) *
        item.quantity),
    0
  );
  
  // Calculate total amount based on the price of each variation
 

  const proceedToCheckout = () => {
    if (cart.length === 0) return; // Prevent navigation if cart is empty
    navigate("/checkout", { state: { cartItems: cart, totalAmount } });
  };

  return (
    
    <div className="container mx-auto p-6">
       <Helmet>
                <title>Your Cart</title>
                <meta name="description" content="Your cart" />
            </Helmet>
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-slate-500">Your cart is empty</p>
      ) : (
        <div className="grid gap-4">
          {cart.map((item) => (
            <div
              key={`${item.product._id}-${item.selectedVariation?.size || "simple"}`}
              className="flex items-center justify-between bg-white shadow-md rounded-lg p-4"
            >
              {/* Product Info */}
              <div className="flex items-center">
                {/* <img
                  src={item.product.picture || "/path/to/default-image.jpg"}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />**/}
                <div className="ml-4">
                  <h3 className="font-bold text-lg">{item.product.name}</h3>
                  {item.selectedVariation && (
                    <p className="text-slate-500">Size: {item.selectedVariation.size}</p>
                  )}
                  <p className="text-slate-600">
                    Price: AU$
                    {(
                      item.selectedVariation?.price ??
                      item.product?.price ??
                      0
                    ).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center">
                <button
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300"
                  onClick={() =>
                    handleQuantityChange(item.product._id,item.selectedVariation, -1)
                  }
                >
                  -
                </button>
                <p className="mx-3">{item.quantity}</p>
                <button
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300"
                  onClick={() =>
                    handleQuantityChange(item.product._id,item.selectedVariation, 1)
                  }
                >
                  +
                </button>
              </div>

              {/* Remove Button */}
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                onClick={() =>
                  removeFromCart(item.product._id, item.selectedVariation)
                }
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      {cart.length > 0 && (
        <div className="mt-6">
          <p className="text-xl font-bold">
            Total Amount: AU${totalAmount.toFixed(2)}
          </p>
          <button
            onClick={proceedToCheckout}
            className={`mt-4 px-6 py-3 text-white font-semibold rounded-lg ${
              cart.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={cart.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default CartPage;
