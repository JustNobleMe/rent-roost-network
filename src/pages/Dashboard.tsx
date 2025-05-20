import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Heart, Home, ShoppingBag, Mail } from "lucide-react";
import dashboardData from "@/users.json";

const Dashboard = () => {
  const { user, savedProperties, purchases, rentals } = dashboardData;

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 md:px-6 pt-24 pb-16 min-h-screen">
        {/* Welcome Banner */}
        <div className="flex items-center gap-4 mb-8">
          <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full border-2 border-primary" />
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user.name}!</h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-4 mb-8">
          <Button variant="default" className="flex items-center gap-2">
            <Home className="h-4 w-4" /> Browse Properties
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Mail className="h-4 w-4" /> Contact Support
          </Button>
        </div>

        {/* Dashboard Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Profile */}
          <Card>
            <CardContent className="pt-6 flex flex-col items-center">
              <User className="h-8 w-8 text-primary mb-2" />
              <h2 className="text-lg font-semibold mb-1">Profile</h2>
              <p className="text-muted-foreground mb-2">{user.email}</p>
              <Button size="sm" variant="outline">Edit Profile</Button>
            </CardContent>
          </Card>
          {/* Saved Properties */}
          <Card className="md:col-span-2">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="h-5 w-5 text-pink-500" />
                <h2 className="text-lg font-semibold">Saved Properties</h2>
              </div>
              {savedProperties.length === 0 ? (
                <p className="text-muted-foreground">No saved properties.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {savedProperties.map((prop) => (
                    <div key={prop.id} className="flex items-center gap-4 bg-secondary rounded-lg p-3">
                      <img src={prop.image} alt={prop.title} className="w-20 h-16 object-cover rounded" />
                      <div>
                        <div className="font-medium">{prop.title}</div>
                        <div className="text-sm text-muted-foreground">{prop.location}</div>
                        <div className="text-sm">{prop.price}</div>
                        <Button size="sm" variant="outline" className="mt-2">View</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Purchases and Rentals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <ShoppingBag className="h-5 w-5 text-green-500" />
                <h2 className="text-lg font-semibold">Purchase History</h2>
              </div>
              {purchases.length === 0 ? (
                <p className="text-muted-foreground">No purchases yet.</p>
              ) : (
                <ul>
                  {purchases.map((purchase) => (
                    <li key={purchase.id} className="mb-2">
                      <span className="font-medium">{purchase.title}</span> — {purchase.location} — <span className="text-muted-foreground">{purchase.price}</span> <span className="text-xs text-muted-foreground">({purchase.date})</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Home className="h-5 w-5 text-blue-500" />
                <h2 className="text-lg font-semibold">Rental History</h2>
              </div>
              {rentals.length === 0 ? (
                <p className="text-muted-foreground">No rentals yet.</p>
              ) : (
                <ul>
                  {rentals.map((rental) => (
                    <li key={rental.id} className="mb-2">
                      <span className="font-medium">{rental.title}</span> — {rental.location} — <span className="text-muted-foreground">{rental.price}</span> <span className="text-xs text-muted-foreground">({rental.leaseStart} to {rental.leaseEnd})</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;