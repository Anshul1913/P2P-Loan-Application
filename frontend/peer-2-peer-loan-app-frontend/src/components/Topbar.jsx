import React from 'react';

const Topbar = () => {
  return (
    <div className="flex justify-between items-center p-4 border-b bg-white">
      <nav className="space-x-6 font-medium text-gray-700">
        <a href="#" className="text-blue-600">Credit Score</a>
        <a href="#">Loans</a>
      </nav>
      <div className="flex items-center gap-4">
        <input type="text" placeholder="Search" className="border px-3 py-1 rounded" />
        <img src="/profile.png" alt="Profile" className="w-8 h-8 rounded-full" />
      </div>
    </div>
  );
};

export default Topbar;
