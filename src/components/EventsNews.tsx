import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin } from "lucide-react";

const events = [
  {
    date: "2024-12-15",
    title: "Annual Passing Out Parade",
    description: "Graduation ceremony for the current batch of Officer Cadets",
    location: "Main Parade Ground",
    type: "ceremony"
  },
  {
    date: "2024-12-10", 
    title: "Inter-Platoon Sports Competition",
    description: "Annual sports competition between all six platoons",
    location: "Sports Complex",
    type: "sports"
  },
  {
    date: "2024-12-08",
    title: "Technical Symposium on Modern Warfare",
    description: "Expert lectures on electronic warfare and modern military technology",
    location: "Auditorium",
    type: "academic"
  },
  {
    date: "2024-12-05",
    title: "Field Training Exercise - Phase II",
    description: "Advanced tactical training in field conditions",
    location: "Training Area Alpha",
    type: "training"
  },
  {
    date: "2024-12-01",
    title: "Commandant's Inspection",
    description: "Quarterly inspection and review of cadet progress",
    location: "All Areas",
    type: "inspection"
  },
  {
    date: "2024-11-28",
    title: "Alumni Guest Lecture Series",
    description: "Distinguished alumni sharing experiences and insights",
    location: "Conference Hall",
    type: "academic"
  },
  {
    date: "2024-11-25",
    title: "Equipment Maintenance Workshop",
    description: "Hands-on training for electronic and mechanical systems",
    location: "Workshop Complex",
    type: "training"
  },
  {
    date: "2024-11-20",
    title: "Cultural Evening - Mess Night",
    description: "Traditional military mess night with cultural performances",
    location: "Officers' Mess",
    type: "cultural"
  }
];

const getTypeColor = (type: string) => {
  const colors = {
    ceremony: "bg-purple-100 text-purple-800",
    sports: "bg-green-100 text-green-800", 
    academic: "bg-blue-100 text-blue-800",
    training: "bg-orange-100 text-orange-800",
    inspection: "bg-red-100 text-red-800",
    cultural: "bg-pink-100 text-pink-800"
  };
  return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800";
};

const EventsNews = () => {
  return (
    <section id="events-news" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
            Important Events & News
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest events, training schedules, and important announcements
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {events.map((event, index) => (
            <Card key={index} className="hover:shadow-elegant transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(event.date).toLocaleDateString('en-IN', {
                      weekday: 'short',
                      year: 'numeric', 
                      month: 'short',
                      day: 'numeric'
                    })}</span>
                  </div>
                  <Badge className={getTypeColor(event.type)}>
                    {event.type}
                  </Badge>
                </div>
                <CardTitle className="text-lg leading-tight">
                  {event.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  {event.description}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsNews;