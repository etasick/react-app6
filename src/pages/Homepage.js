import React, { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import CategoryList from "../components/CategoryList";
import BestSellerProducts from "../components/BestSellerProducts";
import LatestProducts from "../components/LatestProducts";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';

const Homepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    "https://www.butterflyassets.online/vapencartsinstore.webp",
    "https://www.butterflyassets.online/vapesandcartsinstore2.webp",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, [images.length]);
  const [products, setProducts] = useState([]);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const navigate = useNavigate();
  const heroImage = products.length > 0 ? products[0].picture : "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://supplement-app-d151447d38d4.herokuapp.com/api/products/store/677002f923896fcda6ab960d"
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <div className="homepage">
       <Helmet>
                <title>Michigan's #1 Cannabis Dispensary & Retailer VapesNcarts
                </title>
                <meta name="description" content="Michigan best Cannabis retail dispensary for weed, extracts, oils, edibles and accessories. Buy pot online at 100+ stores: Michigan, New York, Los angeles" />
            </Helmet>
      <div className="relative w-full h-80 overflow-hidden">
  <div
    className="absolute inset-0 flex transition-transform duration-1000"
    style={{
      transform: `translateX(-${currentSlide * 100}%)`,
    }}
  >
    {images.map((src, index) => (
      <div
        key={index}
        className="relative w-full h-80 flex-shrink-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${src})`,
        }}
      >
        {/* Shop Now Button */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <button
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700"
            onClick={() => {
              window.location.href = "/shop";
            }}
          >
            Shop Now
          </button>
        </div>
      </div>
    ))}
  </div>

  {/* Previous Button */}
  <button
    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
    onClick={() =>
      setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)
    }
  >
    &#8249;
  </button>

  {/* Next Button */}
  <button
    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
    onClick={() => setCurrentSlide((prev) => (prev + 1) % images.length)}
  >
    &#8250;
  </button>
</div>

      {/* Hero Section */}
      <BestSellerProducts />
      <LatestProducts />
      <CategoryList/>
       {/* Promotional Section */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-6"> Why VapesCarts?</h2>
        <div className="flex flex-wrap justify-center space-x-6">
          <div className="w-full md:w-1/3 p-4 bg-white shadow rounded">
            <h3 className="text-xl font-semibold">We are the fastest in delivery</h3>
            <p className="text-gray-600">
              We have a 24h delivery span for all online orders.
            </p>
          </div>
          <div className="w-full md:w-1/3 p-4 bg-white shadow rounded">
            <h3 className="text-xl font-semibold">Affordable Prices</h3>
            <p className="text-gray-600">
              Get the best deals on every product.
            </p>
          </div>
          <div className="w-full md:w-1/3 p-4 bg-white shadow rounded">
            <h3 className="text-xl font-semibold">Fast and discreet Shipping</h3>
            <p className="text-gray-600">
              Delivered by mail.
            </p>
          </div>
        </div>
      </section>
      <div className="card max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
  <div className="p-6">
    <h3 className="text-xl font-semibold text-gray-800 mb-3">Michigan's #1 Cannabis Dispensary & Retailer VapesNcarts</h3>
    <p className="text-gray-600 mb-4">
    Michigan best Cannabis retail dispensary for weed, extracts, oils, edibles and accessories. Buy pot online at 100+ stores: Michigan, New York, Los angeles
    </p>
  </div>
</div>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-6">Are you new to cannabis? We are here to help.</h2>
        <div>
          {[
            {
              question: "What is the best way to consume cannabis?",
              answer:
                "The most popular method of weed consumption is edibles mostly weed gummies",
            },
            {
              question: "What is your refund policy?",
              answer:
                "We have a 30-day money back guarantee",
            },
            {
              question: "What is THC",
              answer:
                "THC is the active compound that causes the high in weed",
            },
            {
              question: "Do you deliver only in Michigan?",
              answer:
                "If you order online we deliver all over the coutry from Michigan to Los Angeles,we also have store in over 100+ locations",
            },
          ].map((faq, index) => (
            <div key={index} className="border border-gray-300 rounded-md mb-4">
              <button
                onClick={() => toggleAccordion(index)}
                className="flex justify-between w-full p-4 text-lg font-semibold focus:outline-none"
              >
                {faq.question}
                <span>{activeAccordion === index ? "-" : "+"}</span>
              </button>
              {activeAccordion === index && (
                <div className="p-4 text-gray-600">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
