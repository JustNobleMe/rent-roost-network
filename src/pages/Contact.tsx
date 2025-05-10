
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from 'react-helmet';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | EstateElite</title>
      </Helmet>
      <Navbar />
      <div className="pt-24 pb-16 min-h-screen">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl font-bold tracking-tight mb-8">Contact Us</h1>
          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">Get In Touch</h2>
                <p className="mb-4">
                  Have questions or need assistance? Fill out the form and our team 
                  will get back to you as soon as possible.
                </p>
                <div className="space-y-2">
                  <p><strong>Address:</strong> 123 Estate Avenue, Suite 400, New York, NY 10010</p>
                  <p><strong>Phone:</strong> +1 (212) 555-1234</p>
                  <p><strong>Email:</strong> info@estateelite.com</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium">Name</label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
                  <Input id="email" type="email" placeholder="Your email" className='outline-none'/>
                </div>
                <div>
                  <label htmlFor="message" className="block mb-2 text-sm font-medium">Message</label>
                  <Textarea id="message" placeholder="Your message" rows={4} />
                </div>
                <Button className="w-full">Send Message</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
