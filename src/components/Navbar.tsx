
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Home, Search, User, MessageCircle } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-morphism py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-semibold tracking-tight">EstateElite</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-foreground/80">
              Home
            </Link>
            <Link to="/properties" className="text-sm font-medium transition-colors hover:text-foreground/80">
              Properties
            </Link>
            <Link to="/agents" className="text-sm font-medium transition-colors hover:text-foreground/80">
              Agents
            </Link>
            <Link to="/about" className="text-sm font-medium transition-colors hover:text-foreground/80">
              About
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link to="/search">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Search className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/messages">
              <Button variant="ghost" size="icon" className="rounded-full">
                <MessageCircle className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="rounded-full">
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
