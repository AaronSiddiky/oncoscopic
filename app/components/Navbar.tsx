'use client';

import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="absolute top-0 w-full p-6 z-30">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo on the left */}
        <Link href="/" className="text-xl font-bold">
          Oncoscopic
        </Link>

        {/* Desktop menu - moved to the right */}
        <div className="hidden md:flex md:space-x-8 items-center">
          <Link href="/about" className="text-black hover:text-gray-600 transition-colors text-sm">
            About Us
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-black"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {isOpen && (
          <div className="md:hidden absolute top-16 right-6 bg-white/80 backdrop-blur-md p-4 rounded-md shadow-lg">
            <div className="flex flex-col space-y-4">
              <Link href="/about" className="text-black hover:text-gray-600 transition-colors text-sm">
                About Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 