import React from "react";
import { Link } from "react-router-dom";
import CategoryDropdown from './CategoryDropdown';

function Footer({ cart }) {
  return (
    <footer className="bg-base-200/60 p-10">
      <div className="container mx-auto grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Column 1: Branding and Newsletter */}
        <div>
          <div className="flex items-center gap-2 text-xl font-bold">
            
            <span>PerthCannaco</span>
          </div>
          <p className="text-base-content/90 mt-4">
          Perthcannaco is Australia's top cannabis dispensary for weed, extracts, oils, edibles and accessories.Order online and we deliver discreetly to all major cities: Perth,Melbourne, Adelaide,Sidney.
          </p>
          <p>Perth,Australia,info@PerthCannaco.com</p>
          <form className="mt-6">
            <fieldset>
              <label className="label label-text" htmlFor="subscribeLetter">
                Join our mailing list for weekly info
              </label>
              <div className="flex w-full flex-wrap gap-1 sm:flex-nowrap">
                <input
                  className="input input-sm flex-1"
                  id="subscribeLetter"
                  placeholder="johndoe@gmail.com"
                />
                <button className="btn btn-sm btn-primary" type="submit">
                  Subscribe
                </button>
              </div>
            </fieldset>
          </form>
        </div>

        {/* Column 2: Services and Company */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <nav>
            <h6 className="footer-title">Company</h6>
            <Link to="/" className="block p-2 hover:underline">
              Home
            </Link>
            <Link to="/about-us" className="block p-2 link link-hover">
              About us
            </Link>
            <Link to="/contact-us" className="block p-2 link link-hover">
              Contact
            </Link>
            <Link to="/shop" className="block p-2 hover:underline">
              Shop
            </Link>
            <CategoryDropdown />
            <Link to="/cart" className="block p-2 hover:underline">
              Cart ({cart.length})
            </Link>
            <Link to="/checkout" className="block p-2 hover:underline">
              Checkout
            </Link>
            <Link to="/track_order" className="block p-2 hover:underline">
              Track Order
            </Link>
          </nav>
        </div>

        {/* Column 3: Legal */}
        <div>
          <nav>
            <h6 className="footer-title">Legal</h6>
            <p>Disclaimer: All cannabis products sold on this website are for medicinal purposes only.

</p>

          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
