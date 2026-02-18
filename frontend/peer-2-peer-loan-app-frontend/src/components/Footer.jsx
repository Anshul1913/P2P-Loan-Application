import React from 'react';

const Footer = () => {
  return (
    <footer className="text-center py-6 bg-gray-100 mt-20">
      <p className="text-sm text-gray-600">
        © {new Date().getFullYear()} MyApp. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
