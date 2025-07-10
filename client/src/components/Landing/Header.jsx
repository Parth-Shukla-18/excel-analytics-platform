import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Sheetly
        </div>
        <div className="space-x-4">
          <Link
            to="/login"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-white px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
