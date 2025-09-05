import { useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import HierarchyTree from "@/components/HierarchyTree";
import { CommandersData } from "@/config/app.config";
import { ArrowLeft, MessageCircle } from "lucide-react";
import commanderImage from "@/assets/commander-placeholder.jpg";

export default function CommanderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const commanderId = Number(id);
  const commander = CommandersData[commanderId];

  if (!commander) {
    return <Navigate to="/commander/0" replace />;
  }
console.log({commander});

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-[#0D3156] text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 bg-yellow-500"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Overview
            </Button>
          </div>
          <h1 className="text-4xl font-bold text-center">MCEME Leadership Legacy</h1>
          <p className="text-center mt-2 opacity-90">Military College of Engineering and Management Excellence</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Commander Profile */}
          <div className="lg:col-span-2 space-y-6">
            {/* Commander Card */}
            <Card className="p-6 shadow-elegant">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img 
                      src={commanderImage}
                      alt={commander.name}
                      className="w-48 h-60 object-cover rounded-lg border-4 border-accent/20 shadow-card"
                    />
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute bottom-4 left-4 shadow-glow"
                      onClick={() => setIsModalOpen(true)}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                  </div>
                </div>
                
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-primary mb-2">{commander.name}</h2>
                  <p className="text-xl text-accent font-semibold mb-2">{commander.rank}</p>
                  <p className="text-muted-foreground mb-2">{commander.service}</p>
                  <Badge variant="outline" className="mb-4">
                    Tenure: {commander.tenure}
                  </Badge>
                  
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-primary">Key Achievements</h3>
                    <ul className="space-y-2">
                      {commander.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Card>

            {/* Legacy Section */}
            <Card className="p-6 shadow-elegant">
              <h3 className="text-2xl font-bold text-primary mb-4">Legacy & Impact</h3>
              <p className="text-foreground leading-relaxed">{commander.legacy}</p>
            </Card>

            {/* Leadership Notes */}
            <Card className="p-6 shadow-elegant bg-gradient-subtle">
              <h3 className="text-2xl font-bold text-primary mb-4">Leadership Notes</h3>
              <p className="text-foreground leading-relaxed italic">"{commander.note}"</p>
            </Card>
          </div>

          {/* Hierarchy */}
          <div className="lg:col-span-1">
            <Card className="p-6 shadow-elegant">
              <HierarchyTree />
            </Card>
          </div>
        </div>
      </div>

      {/* Message Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-primary">Message from {commander.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <img 
                src={commanderImage}
                alt={commander.name}
                className="w-16 h-20 object-cover rounded border-2 border-accent/20"
              />
              <div>
                <p className="font-semibold text-primary">{commander.name}</p>
                <p className="text-sm text-muted-foreground">{commander.rank}</p>
              </div>
            </div>
            <blockquote className="italic text-foreground border-l-4 border-accent pl-4">
              "{commander.message}"
            </blockquote>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}