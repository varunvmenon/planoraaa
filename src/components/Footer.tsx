import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">PLANORA</h3>
            <p className="text-gray-600">
              Making your dream wedding a reality with AI-powered planning and premium services.
              planorawedding@gmail.com
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/categories/dresses" className="text-gray-600 hover:text-pink-500">Wedding Attire</Link></li>
              <li><Link to="/categories/decorations" className="text-gray-600 hover:text-pink-500">Decorations</Link></li>
              <li><Link to="/categories/photography" className="text-gray-600 hover:text-pink-500">Photography</Link></li>
              <li><Link to="/venue-analysis" className="text-gray-600 hover:text-pink-500">Venue Analysis</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-gray-600 hover:text-pink-500">Contact Us</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-pink-500">FAQ</Link></li>
              <li><Link to="/shipping" className="text-gray-600 hover:text-pink-500">Shipping Info</Link></li>
              <li><Link to="/returns" className="text-gray-600 hover:text-pink-500">Returns</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-pink-500">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-pink-500">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-pink-500">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Planora. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;