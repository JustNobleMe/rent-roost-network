import React from "react";
import UserSidebar from "@/components/dashboards/UserSidebar";
import UserTopbar from "@/components/dashboards/UserTopbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Heart, Home, ShoppingBag, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
//User Data
import Data from "@/users.json";

const Dashboard = () => {

  const userId = Number(localStorage.getItem("userId"));

  const dashboardData = Data.find((user) => user.user.id === userId);

  if (!dashboardData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-xl font-semibold">User data not found. Return <Link to={"/"} className="text-muted-foreground"> Home</Link></div>
      </div>
    );
  }

  const { user, savedProperties, purchases, rentals } = dashboardData;

  return (
    <div className="flex min-h-screen bg-muted">
      <UserSidebar />
      <div className="flex-1 ml-20 flex flex-col">
        <UserTopbar user={user} />
        <main className="flex-1 pt-6 pb-10 px-4 md:px-6">

          {/* Quick Actions */}
          <div className="flex gap-4 mb-8">
            <Link to="/properties">
                <Button variant="default" className="flex items-center gap-2">
                        <Home className="h-4 w-4" /> Browse Properties
                </Button>
            </Link>
            <Button variant="outline" className="flex items-center gap-2">
              <Mail className="h-4 w-4" /> Contact Support
            </Button>
          </div>

          {/* Dashboard Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
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
        </main>
      </div>
    </div>
  );
};

export default Dashboard;