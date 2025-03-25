
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, MapPin, Bed, Bath, Home } from 'lucide-react';

interface PropertyCardProps {
  id: string;
  title: string;
  address: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  imageUrl: string;
  propertyType: 'rent' | 'sale' | 'lease';
  isFeatured?: boolean;
}

const PropertyCard = ({ 
  id, 
  title, 
  address, 
  price, 
  bedrooms, 
  bathrooms, 
  sqft, 
  imageUrl, 
  propertyType,
  isFeatured = false 
}: PropertyCardProps) => {
  // Generate a placeholder if no image is provided
  const imageSrc = imageUrl || 'placeholder.svg';
  
  return (
    <Link to={`/property/${id}`}>
      <Card className={`overflow-hidden transition-all duration-300 h-full hover:shadow-lg ${
        isFeatured ? 'border-2 border-primary' : ''
      }`}>
        <div className="relative overflow-hidden aspect-[4/3]">
          <img 
            src={imageSrc} 
            alt={title}
            className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge className={`
              ${propertyType === 'rent' ? 'bg-blue-500 hover:bg-blue-600' : 
                propertyType === 'sale' ? 'bg-green-500 hover:bg-green-600' : 
                'bg-purple-500 hover:bg-purple-600'}`}
            >
              {propertyType === 'rent' ? 'For Rent' : 
               propertyType === 'sale' ? 'For Sale' : 'For Lease'}
            </Badge>
            {isFeatured && (
              <Badge variant="outline" className="bg-white/80">Featured</Badge>
            )}
          </div>
          <button className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors">
            <Heart className="h-4 w-4 text-gray-500 hover:text-red-500 transition-colors" />
          </button>
        </div>
        
        <CardContent className="p-4">
          <div className="flex flex-col space-y-2">
            <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>
            <div className="flex items-center text-muted-foreground text-sm">
              <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
              <span className="truncate">{address}</span>
            </div>
            <p className="text-xl font-semibold mt-1">{price}</p>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            <span>{bedrooms} Bed{bedrooms !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            <span>{bathrooms} Bath{bathrooms !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center">
            <Home className="h-4 w-4 mr-1" />
            <span>{sqft} sqft</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PropertyCard;
