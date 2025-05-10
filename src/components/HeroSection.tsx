
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop" 
          alt="Luxury property" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
      </div>
      
      {/* Content */}
      <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 animate-fade-in" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
          Find Your Perfect Home
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-10 animate-fade-in [animation-delay:200ms]" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
          Discover exclusive properties for rent, lease, or sale with EstateElite's curated collection
        </p>
        
        {/* Search Bar */}
        <div className="w-full max-w-3xl glass-morphism rounded-full p-2 flex items-center animate-fade-in [animation-delay:400ms]">
          <div className="flex-1 relative flex items-center">
            <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="City, neighborhood, or address"
              className="w-full h-12 pl-12 pr-4 bg-transparent rounded-full focus:outline-none text-foreground"
            />
          </div>
          <div className="flex-shrink-0 pl-2">
            <Button className="h-12 px-8 rounded-full bg-foreground text-primary hover:bg-foreground/90 transition-colors">
              Search
            </Button>
          </div>
        </div>
        
        {/* Property Types */}
        <div className="flex flex-wrap justify-center gap-4 mt-10 animate-fade-in [animation-delay:600ms]">
          {['Buy', 'Rent', 'Lease', 'Luxury', 'New'].map((type) => (
            <Button
              key={type}
              variant="outline"
              className="glass-morphism border-white/30 text-foreground hover:bg-white/20 hover:border-white/50"
            >
              {type}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/70 rounded-full animate-float" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
