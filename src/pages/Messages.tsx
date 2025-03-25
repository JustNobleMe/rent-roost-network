
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from 'react-helmet';

const Messages = () => {
  return (
    <>
      <Helmet>
        <title>Messages | EstateElite</title>
      </Helmet>
      <Navbar />
      <div className="pt-24 pb-16 min-h-screen">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl font-bold tracking-tight mb-8">Messages</h1>
          <div className="bg-card rounded-lg border shadow-sm p-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Message functionality coming soon. This is where you'll be able to chat with agents and owners.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Messages;
