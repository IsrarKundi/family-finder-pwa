import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Shield, MapPin, ArrowRight, UserPlus, LayoutDashboard } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Welcome to Community Connect
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join our vibrant community and connect with members from around the world
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="bg-secondary hover:bg-secondary-light text-white shadow-strong">
                  <UserPlus className="w-5 h-5 mr-2" />
                  Register Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/admin">
                <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                  <LayoutDashboard className="w-5 h-5 mr-2" />
                  Admin Access
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Why Join Our Community?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 bg-gradient-card shadow-medium hover:shadow-strong transition-all duration-300 animate-slide-up">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Connect with Members</h3>
              <p className="text-muted-foreground">
                Build meaningful connections with community members who share your interests and values.
              </p>
            </Card>

            <Card className="p-6 bg-gradient-card shadow-medium hover:shadow-strong transition-all duration-300 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Clan Organization</h3>
              <p className="text-muted-foreground">
                Find your clan and sub-clan to connect with members from your specific group.
              </p>
            </Card>

            <Card className="p-6 bg-gradient-card shadow-medium hover:shadow-strong transition-all duration-300 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Global Network</h3>
              <p className="text-muted-foreground">
                Connect with members from different locations and expand your network worldwide.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-accent">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Registration takes just a few minutes. Join us today and become part of something special.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-gradient-primary hover:opacity-90 shadow-medium">
              Start Your Registration
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
