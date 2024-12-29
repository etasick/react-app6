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
            
            <span>VapeandCarts</span>
          </div>
          <p className="text-base-content/90 mt-4">
            Michigan's #1 cannbis dispensary with over 100+ locations.
          </p>
          <p>Michigan,USA,info@vapesandcarts.com</p>
          <form className="mt-6">
            <fieldset>
              <label className="label label-text" htmlFor="subscribeLetter">
                Subscribe to our newsletter
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
            <p>Disclaimer: Our products have intoxicating effects and may be habit forming. Cannabis can impair concentration, coordination, and judgement. Do not operate a vehicle or machinery under the influence of cannabis. There may be health risks associated with consumption of cannabis infused products. For use only by adults nineteen and older. Keep out of the reach of children.

</p>

          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
