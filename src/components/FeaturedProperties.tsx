
import React from 'react';
import { Button } from '@/components/ui/button';
import PropertyCard from './PropertyCard';
import { Link } from 'react-router-dom';

// Sample property data
const featuredProperties = [
  {
    id: '1',
    title: 'Modern Beachfront Villa',
    address: '123 Oceanview Drive, Malibu, CA 90210',
    price: '$5,250,000',
    bedrooms: 5,
    bathrooms: 5.5,
    sqft: 4500,
    imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format&fit=crop&q=80',
    propertyType: 'sale' as const,
    isFeatured: true
  },
  {
    id: '2',
    title: 'Luxury Downtown Penthouse',
    address: '789 5th Avenue, New York, NY 10022',
    price: '$12,000/month',
    bedrooms: 3,
    bathrooms: 3,
    sqft: 2800,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80',
    propertyType: 'rent' as const,
    isFeatured: true
  },
  {
    id: '3',
    title: 'Contemporary Office Space',
    address: '456 Business Center Blvd, Chicago, IL 60601',
    price: '$8,500/month',
    bedrooms: 0,
    bathrooms: 2,
    sqft: 3200,
    imageUrl: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&auto=format&fit=crop&q=80',
    propertyType: 'lease' as const,
    isFeatured: true
  },
  {
    id: '4',
    title: 'Mountain View Retreat',
    address: '101 Alpine Way, Aspen, CO 81611',
    price: '$3,750,000',
    bedrooms: 4,
    bathrooms: 3.5,
    sqft: 3800,
    imageUrl: 'https://images.unsplash.com/photo-1506126944674-00c6c192e0a3?w=800&auto=format&fit=crop&q=80',
    propertyType: 'sale' as const,
    isFeatured: true
  }
];

const FeaturedProperties = () => {
  return (
    <section className="py-20 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Featured Properties</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium properties that offer exceptional value and unique features
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredProperties.map((property) => (
            <div key={property.id} className="animate-fade-in hover:-translate-y-1 transition-transform duration-300">
              <PropertyCard {...property} />
            </div>
          ))}
        </div>
        
        <Link to="/properties">
          <div className="text-center">
            <Button className="rounded-full px-8">
              View All Properties
            </Button>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProperties;
