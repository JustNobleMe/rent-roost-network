import {useState} from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import AgentSidebar from "@/components/dashboards/AgentSidebar";
import AgentTopbar from "@/components/dashboards/AgentTopbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Chart, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from "chart.js";
import { Search, Filter, MapPin, Bed, Bath, Square, X, PlusIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PropertiesData from "@/data.json";
// Data
import Data from "@/agents.json"; 

Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const AgentDashboard = () => {

  const userId = Number(localStorage.getItem("userId"));

  const dashboardData = Data.find((agent) => agent.user.id === userId);

  //properties functions
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search") || ""; // Extract the search term from the query parameters

  const [searchTerm, setSearchTerm] = useState(searchQuery); // Initialize with the search query
  const [activeTab, setActiveTab] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  
  // Filter state
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [propertyType, setPropertyType] = useState("");
  
  // For price text display
  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`;
    }
    return `$${price}`;
  };
  
  // Clear all filters
  const clearFilters = () => {
    setPriceRange([0, 10000000]);
    setBedrooms("");
    setBathrooms("");
    setPropertyType("");
  };
  
  // Extract out properties for the user
  const Properties = []
  const userProperties = PropertiesData.find((property) => {
    if (property.agent.id === userId) {
      Properties.push(property)
    }
  })

  // Filter properties based on search term, active tab, and filters
  const filteredProperties = Properties.filter((property) => {
          const matchesSearch =
            property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            property.location.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesTab =
            activeTab === "all" || property.type.toLowerCase() === activeTab.toLowerCase();
      
          const matchesPrice =
            property.priceNumeric >= priceRange[0] && property.priceNumeric <= priceRange[1];
          const matchesBedrooms =
            bedrooms === "" || property.beds >= parseInt(bedrooms);
          const matchesBathrooms =
            bathrooms === "" || property.baths >= parseFloat(bathrooms);
          const matchesPropertyType =
            propertyType === "" || property.type === propertyType;
          return (
            matchesSearch &&
            matchesTab &&
            matchesPrice &&
            matchesBedrooms &&
            matchesBathrooms &&
            matchesPropertyType
          );
  });

  // Are any filters active?
  const hasActiveFilters = bedrooms !== "" || bathrooms !== "" || propertyType !== "" || 
                          priceRange[0] > 0 || priceRange[1] < 10000000;




  if (!dashboardData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-xl font-semibold">Agent data not found.</div>
      </div>
    );
  }

  const { user, stats, revenueOverview, messages, activeProperties } = dashboardData;

  return (
    <div className="min-h-screen bg-muted max-sm:pb-10">
      <AgentSidebar />
      <div className="flex-1 ml-20 flex flex-col max-sm:ml-0">
        <AgentTopbar user={user} />
        <main className="flex-1 pt-6 pb-10 px-4 md:px-6">
          {/* Top Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-sm:flex max-sm:flex-col">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center"> 
                  <span className="font-medium text-muted-foreground">Total property</span>
                  <div className="flex items-center text-xs mt-2 text-green-600">
                    <span>▲ {stats.propertyGrowth}%</span>
                    <span className="ml-2 text-muted-foreground">in last 7 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-muted-foreground">Total income</span>
                  <div className="flex items-center text-xs mt-2 text-red-600">
                    <span>▼ {Math.abs(stats.incomeGrowth)}%</span>
                    <span className="ml-2 text-muted-foreground">in last 7 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                    <span className="font-medium text-muted-foreground">Total sales</span>
                    <div className="flex items-center text-xs mt-2 text-green-600">
                        <span>▲ {stats.salesGrowth}%</span>
                        <span className="ml-2 text-muted-foreground">in last 7 days</span>
                    </div>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Properties page */}
          <div className="pt-8 pb-16 min-h-screen bg-white rounded-lg">
                  <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-end mb-8">
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
                        <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={hasActiveFilters ? "border-primary text-primary" : ""}
                            >
                              <Filter className="h-4 w-4 mr-2" />
                              {hasActiveFilters
                                ? `Filters (${
                                    (bedrooms !== "" ? 1 : 0) +
                                    (bathrooms !== "" ? 1 : 0) +
                                    (propertyType !== "" ? 1 : 0) +
                                    ((priceRange[0] > 0 || priceRange[1] < 10000000) ? 1 : 0)
                                  })`
                                : "Filters"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="p-4 mr-10 z-0">
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <h3 className="font-medium">Filters</h3>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={clearFilters}
                                  className="h-8 px-2 text-xs"
                                >
                                  <X className="h-3 w-3 mr-1" />
                                  Clear all
                                </Button>
                              </div>
          
                              {/* Property Type Filter */}
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Property Type</label>
                                <Select value={propertyType} onValueChange={setPropertyType}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Any" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="any">Any</SelectItem>
                                    <SelectItem value="Sale">For Sale</SelectItem>
                                    <SelectItem value="Rent">For Rent</SelectItem>
                                    <SelectItem value="Lease">For Lease</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
          
                              {/* Price Range Filter */}
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <label className="text-sm font-medium">Price Range</label>
                                  <span className="text-sm text-muted-foreground">
                                    {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                                  </span>
                                </div>
                                <Slider
                                  value={priceRange}
                                  min={0}
                                  max={10000000}
                                  step={50000}
                                  onValueChange={setPriceRange}
                                  className="py-4"
                                />
                              </div>
          
                              {/* Bedrooms Filter */}
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Bedrooms</label>
                                <Select value={bedrooms} onValueChange={setBedrooms}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Any" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="any">Any</SelectItem>
                                    <SelectItem value="1">1+</SelectItem>
                                    <SelectItem value="2">2+</SelectItem>
                                    <SelectItem value="3">3+</SelectItem>
                                    <SelectItem value="4">4+</SelectItem>
                                    <SelectItem value="5">5+</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
          
                              {/* Bathrooms Filter */}
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Bathrooms</label>
                                <Select value={bathrooms} onValueChange={setBathrooms}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Any" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="any">Any</SelectItem>
                                    <SelectItem value="1">1+</SelectItem>
                                    <SelectItem value="2">2+</SelectItem>
                                    <SelectItem value="3">3+</SelectItem>
                                    <SelectItem value="4">4+</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
          
                              <Button className="w-full" onClick={() => setIsFilterOpen(false)}>
                                Apply Filters
                              </Button>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <div className="container flex justify-between">
                        <Tabs defaultValue="all" className="mb-8 w-full" onValueChange={setActiveTab}>
                          <TabsList className="grid grid-cols-4 w-full md:w-1/2 lg:w-1/3">
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="sale">For Sale</TabsTrigger>
                            <TabsTrigger value="rent">For Rent</TabsTrigger>
                            <TabsTrigger value="lease">For Lease</TabsTrigger>
                          </TabsList>
                        </Tabs>
                      <Popover open={isAddOpen} onOpenChange={setIsAddOpen}>
                        <PopoverTrigger asChild >
                          <Button
                            variant="outline"
                            className={hasActiveFilters ? "border-primary text-primary" : ""}
                          >
                            <PlusIcon className="h-4 w-4 mr-2" />
                            {hasActiveFilters
                              ? `Filters (${
                                  (bedrooms !== "" ? 1 : 0) +
                                  (bathrooms !== "" ? 1 : 0) +
                                  (propertyType !== "" ? 1 : 0) +
                                  ((priceRange[0] > 0 || priceRange[1] < 10000000) ? 1 : 0)
                                })`
                              : "Add Property"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[calc(100vw-20vw)] p-4 mr-10 z-0" >
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">Add Property</h3>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={clearFilters}
                                className="h-8 px-2 text-xs"
                              >
                                <X className="h-3 w-3 mr-1" />
                                Clear all
                              </Button>
                            </div>
        
                            {/* Property Type Filter */}
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Property Type</label>
                              <Select value={propertyType} onValueChange={setPropertyType}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Any" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="any">Any</SelectItem>
                                  <SelectItem value="Sale">For Sale</SelectItem>
                                  <SelectItem value="Rent">For Rent</SelectItem>
                                  <SelectItem value="Lease">For Lease</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
        
                            {/* Price Range Filter */}
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <label className="text-sm font-medium">Price Range</label>
                                <span className="text-sm text-muted-foreground">
                                  {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                                </span>
                              </div>
                              <Slider
                                value={priceRange}
                                min={0}
                                max={10000000}
                                step={50000}
                                onValueChange={setPriceRange}
                                className="py-4"
                              />
                            </div>
        
                            {/* Bedrooms Filter */}
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Bedrooms</label>
                              <Select value={bedrooms} onValueChange={setBedrooms}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Any" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="any">Any</SelectItem>
                                  <SelectItem value="1">1+</SelectItem>
                                  <SelectItem value="2">2+</SelectItem>
                                  <SelectItem value="3">3+</SelectItem>
                                  <SelectItem value="4">4+</SelectItem>
                                  <SelectItem value="5">5+</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
        
                            {/* Bathrooms Filter */}
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Bathrooms</label>
                              <Select value={bathrooms} onValueChange={setBathrooms}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Any" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="any">Any</SelectItem>
                                  <SelectItem value="1">1+</SelectItem>
                                  <SelectItem value="2">2+</SelectItem>
                                  <SelectItem value="3">3+</SelectItem>
                                  <SelectItem value="4">4+</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
        
                            <Button className="w-full" onClick={() => setIsFilterOpen(false)}>
                              Apply Filters
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredProperties.length > 0 ? (
                        filteredProperties.map((property) => (
                          <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(`/property/${property.id}`)}>
                            <div className="aspect-video relative overflow-hidden">
                              <img 
                                src={property.images[0]} 
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
                                <p className="font-bold text-foreground/50">{property.price}</p>
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
                          {hasActiveFilters && (
                            <Button variant="outline" className="mt-4" onClick={clearFilters}>
                              Clear Filters
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
        </main>
      </div>
    </div>
  );
};

export default AgentDashboard;