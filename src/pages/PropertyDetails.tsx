
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from 'react-helmet';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Calendar, 
  Home, 
  Car, 
  Tag, 
  Heart, 
  Share2,
  ArrowLeft, 
  Phone, 
  Mail, 
  MessageCircle 
} from "lucide-react";

// Sample property data (in a real app, this would come from an API)
const propertyData = {
  id: "1",
  title: "Modern Luxury Villa",
  description: "This stunning modern villa offers luxurious living with panoramic views of the city and ocean. Featuring an open floor plan, high ceilings, and floor-to-ceiling windows, this property bathes in natural light throughout the day. The gourmet kitchen includes top-of-the-line appliances, custom cabinetry, and a large center island. The primary suite boasts a spa-like bathroom and a private balcony. Additional amenities include a home theater, wine cellar, infinity pool, and a spacious outdoor entertainment area.",
  location: "Beverly Hills, CA 90210",
  price: "$5,200,000",
  type: "Sale",
  status: "Available",
  yearBuilt: 2019,
  lotSize: "0.75 acres",
  beds: 5,
  baths: 6,
  size: "6,200 sq ft",
  garage: "3 Cars",
  features: [
    "Infinity Pool",
    "Home Theater",
    "Wine Cellar",
    "Smart Home System",
    "Gourmet Kitchen",
    "Outdoor Kitchen",
    "Fireplace",
    "Walk-in Closets",
    "Spa/Hot Tub",
    "Balcony/Deck",
    "Ocean View",
    "Security System"
  ],
  images: [
    "https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop"
  ],
  agent: {
    id: 1,
    name: "Sarah Johnson",
    title: "Senior Real Estate Agent",
    phone: "+1 (323) 555-7890",
    email: "sarah.johnson@estateelit.com",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop"
  }
};

const PropertyDetails = () => {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  
  // In a real app, we would fetch the property data based on the ID
  const property = propertyData;

  return (
    <>
      <Helmet>
        <title>{property.title} | EstateElite</title>
      </Helmet>
      <Navbar />
      <div className="pt-24 pb-16 min-h-screen">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-6">
            <Link to="/properties" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Properties
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Property Images */}
              <div className="mb-8">
                <div className="aspect-video overflow-hidden rounded-lg mb-4">
                  <img 
                    src={property.images[activeImage]} 
                    alt={property.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {property.images.map((image, index) => (
                    <div 
                      key={index}
                      className={`cursor-pointer flex-shrink-0 w-24 h-16 overflow-hidden rounded ${activeImage === index ? 'ring-2 ring-primary' : 'opacity-70'}`}
                      onClick={() => setActiveImage(index)}
                    >
                      <img 
                        src={image} 
                        alt={`${property.title} view ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Property Title & Actions */}
              <div className="mb-8">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center mb-2">
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium mr-2">
                        {property.type}
                      </span>
                      <span className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-xs font-medium">
                        {property.status}
                      </span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">{property.title}</h1>
                    <div className="flex items-center text-muted-foreground mt-2">
                      <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                      <span>{property.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-foreground">{property.price}</p>
                    <p className="text-muted-foreground text-sm">ID: {id}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Button variant="outline" className="gap-2">
                    <Heart className="h-4 w-4" />
                    Save
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
              
              {/* Property Details */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Property Details</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex flex-col items-center p-4 bg-secondary rounded-lg">
                    <Bed className="h-6 w-6 mb-2 text-primary" />
                    <span className="font-bold">{property.beds}</span>
                    <span className="text-xs text-muted-foreground">Bedrooms</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-secondary rounded-lg">
                    <Bath className="h-6 w-6 mb-2 text-primary" />
                    <span className="font-bold">{property.baths}</span>
                    <span className="text-xs text-muted-foreground">Bathrooms</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-secondary rounded-lg">
                    <Square className="h-6 w-6 mb-2 text-primary" />
                    <span className="font-bold">{property.size}</span>
                    <span className="text-xs text-muted-foreground">Living Area</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-secondary rounded-lg">
                    <Car className="h-6 w-6 mb-2 text-primary" />
                    <span className="font-bold">{property.garage}</span>
                    <span className="text-xs text-muted-foreground">Garage</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
                  <div className="flex items-center">
                    <Tag className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span className="text-sm font-medium mr-2">Price:</span>
                    <span>{property.price}</span>
                  </div>
                  <div className="flex items-center">
                    <Home className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span className="text-sm font-medium mr-2">Property Type:</span>
                    <span>{property.type}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span className="text-sm font-medium mr-2">Year Built:</span>
                    <span>{property.yearBuilt}</span>
                  </div>
                  <div className="flex items-center">
                    <Square className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span className="text-sm font-medium mr-2">Lot Size:</span>
                    <span>{property.lotSize}</span>
                  </div>
                </div>
              </div>
              
              {/* Tabs for Description and Features */}
              <Tabs defaultValue="description" className="mb-8">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="features">Features & Amenities</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="mt-4">
                  <Card>
                    <CardContent className="pt-6">
                      <p className="whitespace-pre-line">{property.description}</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="features" className="mt-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {property.features.map((feature, index) => (
                          <div key={index} className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
              
              {/* Map Placeholder */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Location</h2>
                <div className="bg-secondary aspect-video rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Map view coming soon</p>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Agent Info */}
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <img 
                      src={property.agent.image} 
                      alt={property.agent.name} 
                      className="h-16 w-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-semibold">{property.agent.name}</h3>
                      <p className="text-sm text-muted-foreground">{property.agent.title}</p>
                    </div>
                  </div>
                  <Separator className="mb-4" />
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{property.agent.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{property.agent.email}</span>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Button className="w-full">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Agent
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      Email Agent
                    </Button>
                    <Link to="/messages">
                      <Button variant="secondary" className="w-full">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message Agent
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
              
              {/* Request Viewing Form */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Schedule a Viewing</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Fill out the form below to schedule a viewing of this property.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        placeholder="Your email"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        placeholder="Your phone number"
                      />
                    </div>
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium mb-1">Preferred Date</label>
                      <input 
                        type="date" 
                        id="date" 
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                      <textarea 
                        id="message" 
                        rows={3} 
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[80px]"
                        placeholder="Additional details or questions..."
                      ></textarea>
                    </div>
                    <Button className="w-full">Request Viewing</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PropertyDetails;
