import React from "react";
import { ModeToggle } from "./ThemeToggler";

const Navbar = () => {
  return (
    <nav className=" shadow-lg px-8 py-4 flex items-center justify-between">
      {/* Left: Logo and Text */}
      <div className="flex items-center space-x-2">
        <img
          src="https://cdn.vectorstock.com/i/1000v/08/56/clinic-care-logo-icon-design-vector-22560856.jpg"
          alt="CareMe Logo"
          className="h-8 w-8"
        />
        <span className="text-2xl font-bold text-gray-800">CareMe</span>
      </div>

      {/* Right: Button */}
      <div>
      <ModeToggle/>
      </div>
    </nav>
  );
};

export default Navbar;
