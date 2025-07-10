import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-purple-600 text-center py-4 mt-12">
      <p className="text-white text-sm">
        &copy; {new Date().getFullYear()} Sheetly. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
