import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Users } from "lucide-react";

const platoons = [
  {
    name: "ARJUN",
    tradition: "Embodies precision, strength, and discipline in all training exercises. Known for tactical excellence and unwavering commitment to duty.",
    color: "bg-gradient-to-br from-red-500 to-red-600"
  },
  {
    name: "CHANDRAGUPT", 
    tradition: "Strategic thinking and leadership under pressure. Masters of planning and execution with a focus on innovative solutions.",
    color: "bg-gradient-to-br from-blue-500 to-blue-600"
  },
  {
    name: "RANAPRATAP",
    tradition: "Courage, resilience, and duty before self. Exemplifies the warrior spirit and protective instincts of true defenders.",
    color: "bg-gradient-to-br from-green-500 to-green-600"
  },
  {
    name: "SHIVAJI",
    tradition: "Ingenuity, rapid maneuver, and mission focus. Known for quick thinking and adaptive strategies in challenging scenarios.",
    color: "bg-gradient-to-br from-purple-500 to-purple-600"
  },
  {
    name: "KARNA",
    tradition: "Honor, generosity, and steadfast commitment. Upholds the highest standards of integrity and selfless service.",
    color: "bg-gradient-to-br from-orange-500 to-orange-600"
  },
  {
    name: "PRITHVIRAJ",
    tradition: "Valor, integrity, and esprit de corps. Fosters unity and brotherhood while maintaining operational excellence.",
    color: "bg-gradient-to-br from-indigo-500 to-indigo-600"
  }
];

const PlatoonsSection = () => {
  return (
    <section id="platoons" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
            Platoons & Traditions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Six distinguished platoons, each with their own heritage and tradition of excellence
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platoons.map((platoon) => (
            <Card key={platoon.name} className="group hover:shadow-command transition-all duration-300 border-2 hover:border-accent/20">
              <CardHeader className="pb-3">
                <div className={`w-full h-3 rounded-t-lg ${platoon.color} mb-4`}></div>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Shield className="h-6 w-6 text-primary" />
                  {platoon.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {platoon.tradition}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>Active Platoon</span>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <a href="">
                      More →
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatoonsSection;