
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from 'react-helmet';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Star } from "lucide-react";
//API fetch for real data
import agentsData from "@/agents.json";

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
              <Card key={agent.user.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={agent.user.image} 
                    alt={agent.user.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-5">
                  <div className="text-center mb-4">
                    <h3 className="font-bold text-xl mb-1">{agent.user.name}</h3>
                    <p className="text-muted-foreground">{agent.user.title}</p>
                  </div>
                  
                  <div className="flex items-center justify-center mb-4">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium ml-1">{agent.user.rating}</span>
                    <span className="text-muted-foreground text-sm ml-1">({agent.user.reviews} reviews)</span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{agent.user.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{agent.user.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm truncate">{agent.user.email}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 text-center mb-4">
                    <div>
                      <p className="font-bold">{agent.user.listings}</p>
                      <p className="text-xs text-muted-foreground">Listings</p>
                    </div>
                    <div>
                      <p className="font-bold">{agent.user.experience}</p>
                      <p className="text-xs text-muted-foreground">Experience</p>
                    </div>
                    <div>
                      <p className="font-bold">{agent.user.specialization.split(' ')[0]}</p>
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
