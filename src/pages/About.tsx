import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/shared/Navigation";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">About VCConnect</h1>
          <p className="text-xl text-muted-foreground">
            We're on a mission to revolutionize how startups connect with venture capital.
            Our platform leverages AI technology to create meaningful connections and drive success.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center p-6">
            <CardContent>
              <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Our Team</h3>
              <p className="text-muted-foreground">
                A diverse group of experts in venture capital, technology, and startup growth.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent>
              <Award className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
              <p className="text-muted-foreground">
                To democratize access to venture capital and help startups reach their full potential.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent>
              <Heart className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Our Values</h3>
              <p className="text-muted-foreground">
                Innovation, transparency, and commitment to startup success guide everything we do.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button size="lg" asChild>
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;