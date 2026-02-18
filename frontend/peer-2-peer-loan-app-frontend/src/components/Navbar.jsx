import React from "react";
const Navbar = () => {
  return (
    <nav className="flex justify-between  px-8 py-4 shadow-md bg-white">
      <div className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        Study Fund
      </div>

      <ul className="flex space-x-6 items-center">
        <li>
          <a href="#features" className="hover:text-[#6366f1]">
            How it works
          </a>
        </li>
        <li>
          <a href="#features" className="hover:text-[#6366f1]">
            For Lender
          </a>
        </li>
        <li>
          <a href="#features" className="hover:text-[#6366f1]">
            For Student
          </a>
        </li>
        <li>
          <a href="#contact" className="hover:text-[#6366f1]">
            Support
          </a>
        </li>
        <li className="flex space-x-4">
          <a
            href="/login"
            className="text-[#6366f1] font-semibold border border-primary px-4 py-2 rounded-2xl hover:bg-[#6366f1] hover:text-white transition transform hover:-translate-y-1 duration-300"
          >
            Sign in
          </a>

          <a
            href="#get-started"
            className="text-white font-bold border bg-primary border-primary px-4 py-2 rounded-xl  hover:text-white transition transform hover:-translate-y-1 duration-300"
          >
            Get Started
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
