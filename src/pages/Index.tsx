
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturedProperties from '@/components/FeaturedProperties';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { MapPin, MessageCircle, User, Heart } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        
        <FeaturedProperties />
        
        {/* How It Works Section */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Finding your dream property is simple with our streamlined process
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <MapPin className="h-10 w-10" />,
                  title: 'Find Properties',
                  description: 'Browse our extensive collection of premium properties across desirable locations'
                },
                {
                  icon: <MessageCircle className="h-10 w-10" />,
                  title: 'Connect with Agents',
                  description: 'Chat directly with our expert agents to discuss properties and arrange viewings'
                },
                {
                  icon: <Heart className="h-10 w-10" />,
                  title: 'Secure Your Dream Home',
                  description: 'Complete the process smoothly with our support every step of the way'
                }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center p-6 glass-morphism rounded-lg hover:shadow-xl transition-shadow">
                  <div className="mb-4 p-4 rounded-full bg-foreground text-primary">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&auto=format&fit=crop&q=80" 
              alt="Luxury interior" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          
          <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">Ready to Find Your Perfect Property?</h2>
              <p className="text-white/80 mb-8">
                Join thousands of satisfied clients who found their dream homes with EstateElite
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="rounded-full px-8 bg-white text-foreground hover:bg-white/90">
                  <User className="h-4 w-4 mr-2" />
                  Register Now
                </Button>
                <Button variant="outline" className="rounded-full px-8 border-white text-white hover:bg-white/20">
                  Browse Properties
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
