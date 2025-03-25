
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from 'react-helmet';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon } from "lucide-react";

const Search = () => {
  return (
    <>
      <Helmet>
        <title>Search Properties | EstateElite</title>
      </Helmet>
      <Navbar />
      <div className="pt-24 pb-16 min-h-screen">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl font-bold tracking-tight mb-8">Search Properties</h1>
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex gap-2">
              <Input placeholder="Search properties by location, name, features..." className="flex-1" />
              <Button>
                <SearchIcon className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
          <div className="text-center py-12">
            <p className="text-muted-foreground">Search functionality coming soon...</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Search;
