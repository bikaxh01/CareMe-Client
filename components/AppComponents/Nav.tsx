"use client"
import React from "react";
import { ModeToggle } from "./ThemeToggler";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter()
  
  return (
    <nav className=" shadow-lg px-8 py-1 flex items-center justify-between">
      {/* Left: Logo and Text */}
      <div className="flex items-center space-x-2">
        <span className="text-2xl font-bold">CareMe</span>
      </div>

      {/* Right: Button */}
      <div className=" flex gap-10">
        <Button onClick={()=>{
          router.push('/book-appointment')
        }}>Book Appointment</Button>
      <ModeToggle/>
      </div>
    </nav>
  );
};

export default Navbar;
