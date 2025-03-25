
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from 'react-helmet';

const PropertyDetails = () => {
  const { id } = useParams();

  return (
    <>
      <Helmet>
        <title>Property Details | EstateElite</title>
      </Helmet>
      <Navbar />
      <div className="pt-24 pb-16 min-h-screen">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl font-bold tracking-tight mb-8">Property Details</h1>
          <div className="bg-card rounded-lg border shadow-sm p-6">
            <p className="text-muted-foreground mb-4">Property ID: {id}</p>
            <p className="text-muted-foreground">Property details coming soon...</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PropertyDetails;
