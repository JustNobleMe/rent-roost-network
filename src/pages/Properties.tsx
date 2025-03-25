
import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from 'react-helmet';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, MapPin, Bed, Bath, Square } from "lucide-react";

const PropertiesData = [
  {
    id: "1",
    title: "Modern Luxury Villa",
    location: "Beverly Hills, CA",
    price: "$5,200,000",
    type: "Sale",
    beds: 5,
    baths: 6,
    size: "6,200 sq ft",
    image: "https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "2",
    title: "Downtown Penthouse",
    location: "Manhattan, NY",
    price: "$12,500/month",
    type: "Rent",
    beds: 3,
    baths: 3.5,
    size: "3,100 sq ft",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "3",
    title: "Waterfront Estate",
    location: "Miami Beach, FL",
    price: "$7,800,000",
    type: "Sale",
    beds: 6,
    baths: 8,
    size: "8,500 sq ft",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "4",
    title: "Urban Loft Apartment",
    location: "Chicago, IL",
    price: "$4,200/month",
    type: "Rent",
    beds: 2,
    baths: 2,
    size: "1,800 sq ft",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "5",
    title: "Coastal Mediterranean Villa",
    location: "Santa Barbara, CA",
    price: "$4,500,000",
    type: "Sale",
    beds: 4,
    baths: 4.5,
    size: "4,700 sq ft",
    image: "https://images.unsplash.com/photo-1598228723793-52759bba239c?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "6",
    title: "Mountain View Cabin",
    location: "Aspen, CO",
    price: "$6,500/week",
    type: "Lease",
    beds: 3,
    baths: 2,
    size: "2,200 sq ft",
    image: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=1200&auto=format&fit=crop"
  }
];

const Properties = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter properties based on search term and active tab
  const filteredProperties = PropertiesData.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "all" || property.type.toLowerCase() === activeTab.toLowerCase();
    return matchesSearch && matchesTab;
  });

  return (
    <>
      <Helmet>
        <title>Properties | EstateElite</title>
      </Helmet>
      <Navbar />
      <div className="pt-24 pb-16 min-h-screen">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-4 md:mb-0">Properties</h1>
            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Search by location or property name..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 w-full md:w-1/2 lg:w-1/3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="sale">For Sale</TabsTrigger>
              <TabsTrigger value="rent">For Rent</TabsTrigger>
              <TabsTrigger value="lease">For Lease</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={property.image} 
                      alt={property.title} 
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                      {property.type}
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-xl">{property.title}</h3>
                      <p className="font-bold text-primary">{property.price}</p>
                    </div>
                    <div className="flex items-center text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                      <span className="text-sm">{property.location}</span>
                    </div>
                    <div className="flex justify-between border-t pt-4">
                      <div className="flex items-center">
                        <Bed className="h-4 w-4 mr-1" />
                        <span className="text-sm">{property.beds} Beds</span>
                      </div>
                      <div className="flex items-center">
                        <Bath className="h-4 w-4 mr-1" />
                        <span className="text-sm">{property.baths} Baths</span>
                      </div>
                      <div className="flex items-center">
                        <Square className="h-4 w-4 mr-1" />
                        <span className="text-sm">{property.size}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No properties found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Properties;
