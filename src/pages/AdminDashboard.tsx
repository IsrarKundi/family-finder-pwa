import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/StatsCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users, MapPin, Shield, TrendingUp, LogOut } from "lucide-react";
import { CLANS, SUB_CLANS } from "@/types/form";
import { toast } from "sonner";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [members, setMembers] = useState<any[]>([]);
  const [filterClan, setFilterClan] = useState<string>("all");
  const [filterSubClan, setFilterSubClan] = useState<string>("all");

  useEffect(() => {
    // Check authentication
    if (localStorage.getItem("adminAuth") !== "true") {
      navigate("/admin");
      return;
    }

    // Load members from localStorage
    const data = JSON.parse(localStorage.getItem("communityMembers") || "[]");
    setMembers(data);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    toast.success("Logged out successfully");
    navigate("/admin");
  };

  const filteredMembers = members.filter((member) => {
    if (filterClan !== "all" && member.clan !== filterClan) return false;
    if (filterSubClan !== "all" && member.subClan !== filterSubClan) return false;
    return true;
  });

  const totalMembers = filteredMembers.length;
  
  const clanCounts = CLANS.reduce((acc, clan) => {
    acc[clan] = filteredMembers.filter((m) => m.clan === clan).length;
    return acc;
  }, {} as Record<string, number>);

  const locationCounts = filteredMembers.reduce((acc, member) => {
    const location = member.address.country;
    acc[location] = (acc[location] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const ageGroups = {
    "0-18": filteredMembers.filter((m) => parseInt(m.contactDetails.age) <= 18).length,
    "19-35": filteredMembers.filter(
      (m) => parseInt(m.contactDetails.age) > 18 && parseInt(m.contactDetails.age) <= 35
    ).length,
    "36-60": filteredMembers.filter(
      (m) => parseInt(m.contactDetails.age) > 35 && parseInt(m.contactDetails.age) <= 60
    ).length,
    "60+": filteredMembers.filter((m) => parseInt(m.contactDetails.age) > 60).length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-soft">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Community Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage and monitor community members</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="p-6 mb-8 shadow-soft">
          <h2 className="text-lg font-semibold text-foreground mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Filter by Clan</label>
              <Select value={filterClan} onValueChange={setFilterClan}>
                <SelectTrigger>
                  <SelectValue placeholder="All Clans" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Clans</SelectItem>
                  {CLANS.map((clan) => (
                    <SelectItem key={clan} value={clan}>
                      {clan}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Filter by Sub-Clan</label>
              <Select
                value={filterSubClan}
                onValueChange={setFilterSubClan}
                disabled={filterClan === "all"}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Sub-Clans" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sub-Clans</SelectItem>
                  {filterClan !== "all" &&
                    SUB_CLANS[filterClan]?.map((subClan) => (
                      <SelectItem key={subClan} value={subClan}>
                        {subClan}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Members"
            value={totalMembers}
            icon={Users}
            trend="+12% this month"
          />
          <StatsCard
            title="Active Clans"
            value={Object.keys(clanCounts).filter((c) => clanCounts[c] > 0).length}
            icon={Shield}
            trend={`${CLANS.length} total clans`}
          />
          <StatsCard
            title="Locations"
            value={Object.keys(locationCounts).length}
            icon={MapPin}
            trend={`${Object.keys(locationCounts).length} countries`}
          />
          <StatsCard
            title="Growth Rate"
            value="24%"
            icon={TrendingUp}
            trend="Year over year"
          />
        </div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Clan Distribution */}
          <Card className="p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-foreground mb-4">Members by Clan</h3>
            <div className="space-y-3">
              {CLANS.map((clan) => (
                <div key={clan} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{clan}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-primary"
                        style={{
                          width: `${totalMembers > 0 ? (clanCounts[clan] / totalMembers) * 100 : 0}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-bold text-foreground w-8 text-right">
                      {clanCounts[clan] || 0}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Age Distribution */}
          <Card className="p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-foreground mb-4">Age Distribution</h3>
            <div className="space-y-3">
              {Object.entries(ageGroups).map(([range, count]) => (
                <div key={range} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{range} years</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-secondary"
                        style={{
                          width: `${totalMembers > 0 ? (count / totalMembers) * 100 : 0}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-bold text-foreground w-8 text-right">
                      {count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Location Distribution */}
          <Card className="p-6 shadow-soft lg:col-span-2">
            <h3 className="text-lg font-semibold text-foreground mb-4">Members by Location</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(locationCounts).map(([location, count]) => (
                <div
                  key={location}
                  className="p-4 bg-accent rounded-lg flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-accent-foreground" />
                    <span className="font-medium text-foreground">{location}</span>
                  </div>
                  <span className="text-lg font-bold text-primary">{count as number}</span>
                </div>
              ))}
              {Object.keys(locationCounts).length === 0 && (
                <div className="col-span-full">
                  <p className="text-muted-foreground text-center py-4">
                    No location data available
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
