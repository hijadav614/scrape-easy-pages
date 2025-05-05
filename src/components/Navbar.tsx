
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 py-4 fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-brand-blue to-brand-purple text-transparent bg-clip-text">
            ScrapeEasy
          </span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-600 hover:text-brand-blue transition-colors">
            Home
          </Link>
          <Link to="/dashboard" className="text-gray-600 hover:text-brand-blue transition-colors">
            Dashboard
          </Link>
          <Link to="/builder" className="text-gray-600 hover:text-brand-blue transition-colors">
            New Scraper
          </Link>
          <Button variant="default" asChild>
            <Link to="/builder" className="font-medium">
              Get Started
            </Link>
          </Button>
        </div>
        
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 absolute w-full z-50">
          <div className="flex flex-col p-4 space-y-4">
            <Link 
              to="/"
              className="text-gray-600 hover:text-brand-blue transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/dashboard"
              className="text-gray-600 hover:text-brand-blue transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/builder"
              className="text-gray-600 hover:text-brand-blue transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              New Scraper
            </Link>
            <Button variant="default" className="w-full" asChild>
              <Link to="/builder" onClick={() => setIsMenuOpen(false)}>
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
