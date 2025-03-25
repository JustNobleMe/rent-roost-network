
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from 'react-helmet';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Star } from "lucide-react";

const agentsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Senior Real Estate Agent",
    location: "Los Angeles, CA",
    phone: "+1 (323) 555-7890",
    email: "sarah.johnson@estateelit.com",
    rating: 4.9,
    reviews: 142,
    listings: 38,
    experience: "12 years",
    specialization: "Luxury Properties",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    title: "Commercial Property Specialist",
    location: "New York, NY",
    phone: "+1 (212) 555-4321",
    email: "michael.rodriguez@estateelit.com",
    rating: 4.8,
    reviews: 98,
    listings: 24,
    experience: "8 years",
    specialization: "Office Spaces",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Jennifer Chen",
    title: "Residential Property Expert",
    location: "San Francisco, CA",
    phone: "+1 (415) 555-6543",
    email: "jennifer.chen@estateelit.com",
    rating: 5.0,
    reviews: 87,
    listings: 19,
    experience: "6 years",
    specialization: "Urban Apartments",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "David Williams",
    title: "Luxury Estate Agent",
    location: "Miami, FL",
    phone: "+1 (305) 555-8765",
    email: "david.williams@estateelit.com",
    rating: 4.7,
    reviews: 113,
    listings: 27,
    experience: "15 years",
    specialization: "Waterfront Properties",
    image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Olivia Martinez",
    title: "Vacation Rental Specialist",
    location: "Austin, TX",
    phone: "+1 (512) 555-2345",
    email: "olivia.martinez@estateelit.com",
    rating: 4.9,
    reviews: 76,
    listings: 22,
    experience: "7 years",
    specialization: "Vacation Homes",
    image: "https://images.unsplash.com/photo-1598257006626-48b0c252070d?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "James Wilson",
    title: "Investment Property Advisor",
    location: "Chicago, IL",
    phone: "+1 (312) 555-9876",
    email: "james.wilson@estateelit.com",
    rating: 4.8,
    reviews: 92,
    listings: 31,
    experience: "10 years",
    specialization: "Multi-family Properties",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop"
  }
];

const Agents = () => {
  return (
    <>
      <Helmet>
        <title>Our Agents | EstateElite</title>
      </Helmet>
      <Navbar />
      <div className="pt-24 pb-16 min-h-screen">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-bold tracking-tight mb-4">Our Expert Agents</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our team of experienced real estate professionals is dedicated to helping you find your perfect property.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agentsData.map((agent) => (
              <Card key={agent.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={agent.image} 
                    alt={agent.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-5">
                  <div className="text-center mb-4">
                    <h3 className="font-bold text-xl mb-1">{agent.name}</h3>
                    <p className="text-muted-foreground">{agent.title}</p>
                  </div>
                  
                  <div className="flex items-center justify-center mb-4">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium ml-1">{agent.rating}</span>
                    <span className="text-muted-foreground text-sm ml-1">({agent.reviews} reviews)</span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{agent.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{agent.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm truncate">{agent.email}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 text-center mb-4">
                    <div>
                      <p className="font-bold">{agent.listings}</p>
                      <p className="text-xs text-muted-foreground">Listings</p>
                    </div>
                    <div>
                      <p className="font-bold">{agent.experience}</p>
                      <p className="text-xs text-muted-foreground">Experience</p>
                    </div>
                    <div>
                      <p className="font-bold">{agent.specialization.split(' ')[0]}</p>
                      <p className="text-xs text-muted-foreground">Specialty</p>
                    </div>
                  </div>
                  
                  <Button className="w-full">Contact Agent</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Agents;
