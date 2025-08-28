import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import GallantryAwards from "@/components/GallantryAwards";
import PlatoonsSection from "@/components/PlatoonsSection";
import EventsNews from "@/components/EventsNews";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, History, Users2 } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <GallantryAwards />
      
      {/* History Section */}
      <section id="history" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              Our History
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A legacy of excellence in military engineering education
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {[
                { year: "1943", event: "Establishment of MCEME as a premier military engineering institution" },
                { year: "1947", event: "Post-independence expansion and modernization of training programs" },
                { year: "1965", event: "Introduction of specialized electronics and mechanical engineering courses" },
                { year: "1980", event: "Formation of the Cadets Training Wing (CTW) structure" },
                { year: "2000", event: "Digital transformation and modern training methodologies implementation" },
                { year: "2020", event: "Integration of AI and advanced technology in military training" }
              ].map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-20 text-right">
                    <span className="inline-flex items-center justify-center w-16 h-8 bg-primary text-primary-foreground text-sm font-semibold rounded">
                      {item.year}
                    </span>
                  </div>
                  <div className="flex-1 pb-4 border-l-2 border-primary/20 pl-6 relative">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-2 top-1"></div>
                    <p className="text-foreground leading-relaxed">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <EventsNews />
      
      {/* Schedules Section */}
      <section id="schedules" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              Training Schedules
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Weekly training schedule and important academic calendar
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { day: "Monday", activity: "Physical Training & Parade", time: "0600-0800", type: "PT" },
              { day: "Tuesday", activity: "Electronics Theory", time: "0900-1200", type: "Academic" },
              { day: "Wednesday", activity: "Mechanical Workshop", time: "1400-1700", type: "Practical" },
              { day: "Thursday", activity: "Field Training Exercise", time: "0800-1600", type: "Field" },
              { day: "Friday", activity: "Assessment & Review", time: "0900-1200", type: "Assessment" },
              { day: "Saturday", activity: "Sports & Recreation", time: "1500-1800", type: "Sports" }
            ].map((schedule, index) => (
              <Card key={index} className="hover:shadow-elegant transition-all duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Calendar className="h-5 w-5 text-primary" />
                    {schedule.day}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium mb-2">{schedule.activity}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Clock className="h-4 w-4" />
                    <span>{schedule.time}</span>
                  </div>
                  <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    {schedule.type}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <PlatoonsSection />
      
      {/* Commander's Corner */}
      <section id="commanders-corner" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              Commander's Corner
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Messages and insights from current and former commanders
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                name: "Brig Atul Jaiswal",
                rank: "Commander, CTW",
                tenure: "Present",
                note: "Leading with excellence and dedication to shape future military leaders through innovative training methodologies."
              },
              {
                name: "Brig Rajesh Kumar",
                rank: "Former Commander, CTW", 
                tenure: "2020-2023",
                note: "Instrumental in modernizing training infrastructure and implementing digital learning platforms."
              },
              {
                name: "Brig Suresh Sharma",
                rank: "Former Commander, CTW",
                tenure: "2017-2020", 
                note: "Pioneered advanced field training exercises and inter-service cooperation programs."
              }
            ].map((commander, index) => (
              <Card key={index} className="group hover:shadow-command transition-all duration-300">
                <CardHeader className="text-center pb-3">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-hover rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users2 className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg">{commander.name}</CardTitle>
                  <p className="text-sm text-primary font-medium">{commander.rank}</p>
                  <p className="text-xs text-muted-foreground">{commander.tenure}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center leading-relaxed">
                    {commander.note}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            For official MCEME internal use only. © 2024 Military College of Electronics & Mechanical Engineering
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;