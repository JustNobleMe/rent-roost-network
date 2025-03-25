
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from 'react-helmet';

const Properties = () => {
  return (
    <>
      <Helmet>
        <title>Properties | EstateElite</title>
      </Helmet>
      <Navbar />
      <div className="pt-24 pb-16 min-h-screen">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl font-bold tracking-tight mb-8">Properties</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Property listings will go here */}
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">Property listings coming soon...</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Properties;
