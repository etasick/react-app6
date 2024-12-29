import React from "react";
import { Helmet } from 'react-helmet-async';

function AboutUs() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
              <Helmet>
                <title>About us</title>
                <meta name="description" content="About us" />
            </Helmet>
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="text-gray-700 mb-4">
        Welcome to PerthCannaco. Perthcannaco is Australia's top cannabis dispensary for weed, extracts, oils, edibles and accessories.Order online and we deliver discreetly to all major cities: Perth,Melbourne, Adelaide,Sidney..
      </p>
      <p className="text-gray-700">
        We have a huge collection of THC vape cartridges ,THC gummies & ediles and also flowers.
      </p>
      <p>All our cannabis products are sold for medicinal purposes only</p>
    </div>
  );
}

export default AboutUs;
