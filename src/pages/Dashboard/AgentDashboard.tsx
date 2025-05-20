import React from "react";
import AgentSidebar from "@/components/dashboards/AgentSidebar";
import AgentTopbar from "@/components/dashboards/AgentTopbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import dashboardData from "@/agentsData.json";
import { Line } from "react-chartjs-2";
import { Chart, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from "chart.js";
import { Mail } from "lucide-react";

Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const AgentDashboard = () => {
  const { user, stats, revenueOverview, messages, activeProperties } = dashboardData;

  // Chart Data
  const chartData = {
    labels: revenueOverview.map((d) => d.month),
    datasets: [
      {
        label: "Expense",
        data: revenueOverview.map((d) => d.expense),
        borderColor: "#6366f1",
        backgroundColor: "rgba(99,102,241,0.1)",
        tension: 0.4,
      },
      {
        label: "Income",
        data: revenueOverview.map((d) => d.income),
        borderColor: "#22c55e",
        backgroundColor: "rgba(34,197,94,0.1)",
        tension: 0.4,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index' as const, intersect: false }
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  return (
    <div className="flex min-h-screen bg-muted">
      <AgentSidebar />
      <div className="flex-1 ml-20 flex flex-col">
        <AgentTopbar user={user} />
        <main className="flex-1 pt-6 pb-10 px-4 md:px-6">
          {/* Top Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-muted-foreground">Total property</span>
                  <Button size="sm" variant="outline">See Details</Button>
                </div>
                <div className="text-3xl font-bold">{stats.totalProperty}</div>
                <div className="flex items-center text-xs mt-2 text-green-600">
                  <span>▲ {stats.propertyGrowth}%</span>
                  <span className="ml-2 text-muted-foreground">in last 7 days</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-muted-foreground">Total income</span>
                  <Button size="sm" variant="outline">See Details</Button>
                </div>
                <div className="text-3xl font-bold">${stats.totalIncome.toLocaleString()}</div>
                <div className="flex items-center text-xs mt-2 text-red-600">
                  <span>▼ {Math.abs(stats.incomeGrowth)}%</span>
                  <span className="ml-2 text-muted-foreground">in last 7 days</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-muted-foreground">Total sales</span>
                  <Button size="sm" variant="outline">See Details</Button>
                </div>
                <div className="text-3xl font-bold">${stats.totalSales.toLocaleString()}</div>
                <div className="flex items-center text-xs mt-2 text-green-600">
                  <span>▲ {stats.salesGrowth}%</span>
                  <span className="ml-2 text-muted-foreground">in last 7 days</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Overview & Messages */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-2">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Property revenue overview</h2>
                  <Button size="sm" variant="outline">This Week</Button>
                </div>
                <div className="h-64">
                  <Line data={chartData} options={chartOptions} />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Message</h2>
                  <Button size="sm" variant="outline">Today</Button>
                </div>
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className="flex items-center gap-3">
                      <img src={msg.avatar} alt={msg.name} className="w-10 h-10 rounded-full" />
                      <div className="flex-1">
                        <div className="font-medium">{msg.name}</div>
                        <div className="text-xs text-muted-foreground">{msg.message}</div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-xs text-muted-foreground">{msg.time}</span>
                        {msg.unread > 0 && (
                          <span className="bg-primary text-white text-xs rounded-full px-2 mt-1">{msg.unread}</span>
                        )}
                      </div>
                    </div>
                  ))}
                  <Button variant="link" className="w-full mt-2">View all messages →</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Active Properties Table */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Active Property</h2>
                <Button size="sm" variant="outline">Filter</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-muted-foreground">
                      <th className="p-2 text-left">Property</th>
                      <th className="p-2 text-left">Location</th>
                      <th className="p-2 text-left">Contact</th>
                      <th className="p-2 text-left">Date</th>
                      <th className="p-2 text-left">Engagement</th>
                      <th className="p-2 text-left">Price</th>
                      <th className="p-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeProperties.map((prop) => (
                      <tr key={prop.id} className="border-b last:border-none">
                        <td className="p-2 flex items-center gap-2">
                          <img src={prop.image} alt={prop.title} className="w-12 h-10 object-cover rounded" />
                          <div>
                            <div className="font-medium">{prop.title}</div>
                            <div className="text-xs text-muted-foreground">{prop.beds} beds • {prop.baths} bath • {prop.size}</div>
                          </div>
                        </td>
                        <td className="p-2">{prop.location}</td>
                        <td className="p-2">{prop.contact}</td>
                        <td className="p-2">{prop.date}</td>
                        <td className="p-2">{prop.engagement.toLocaleString()} Views</td>
                        <td className="p-2">${prop.price.toLocaleString()}</td>
                        <td className="p-2">
                          <Button size="sm" variant="outline">Edit</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AgentDashboard;