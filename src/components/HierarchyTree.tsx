import { CommandersData } from "@/config/app.config";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import commanderImage from "@/assets/commander-placeholder.jpg";

export default function HierarchyTree (){
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-primary mb-4">Leadership Hierarchy</h3>
      <div className="space-y-3">
        {CommandersData.map((commander, index) => (
          <Card 
            key={commander.id}
            className="p-4 cursor-pointer hover:shadow-card transition-all duration-300 hover:border-accent/40 group"
            onClick={() => navigate(`/commander/${commander.id}`)}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-15 flex-shrink-0">
                <img 
                  src={commanderImage}
                  alt={commander.name}
                  className="w-full h-full object-cover rounded border-2 border-accent/20 group-hover:border-accent/50 transition-all duration-300"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-primary text-sm group-hover:text-accent transition-colors duration-300">
                  {commander.name}
                </h4>
                <p className="text-xs text-muted-foreground">{commander.rank}</p>
                <Badge variant="secondary" className="text-xs mt-1">
                  {commander.tenure}
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-gradient-subtle rounded-lg border border-accent/20">
        <h4 className="text-sm font-semibold text-primary mb-2">Legacy Timeline</h4>
        <p className="text-xs text-muted-foreground">
          Each commander built upon the excellence of their predecessors, creating a continuous legacy of innovation and leadership in military engineering education.
        </p>
      </div>
    </div>
  );
};