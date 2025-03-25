
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from 'react-helmet';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | EstateElite</title>
      </Helmet>
      <Navbar />
      <div className="pt-24 pb-16 min-h-screen">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl font-bold tracking-tight mb-8">About EstateElite</h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg mb-6">
              EstateElite is a premier real estate platform dedicated to connecting property owners, 
              agents, and buyers in a seamless marketplace.
            </p>
            <p className="mb-6">
              Our mission is to transform the real estate experience by leveraging technology 
              to create transparent, efficient, and enjoyable property transactions.
            </p>
            <p className="mb-6">
              Founded with a vision to revolutionize the real estate industry, EstateElite combines 
              cutting-edge technology with industry expertise to deliver an unparalleled experience 
              for all stakeholders in the property market.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
