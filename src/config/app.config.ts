import { Medal, Star, Award } from "lucide-react";

export const CommandersData = [
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
]

export const platoons = [
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
]

export const awards = [
    {
        name: "Param Vir Chakra",
        description: "India's highest military decoration for acts of most conspicuous bravery in the presence of the enemy.",
        icon: Medal,
        category: "Wartime Gallantry"
    },
    {
        name: "Maha Vir Chakra",
        description: "Second highest military decoration for acts of conspicuous gallantry in the presence of the enemy.",
        icon: Star,
        category: "Wartime Gallantry"
    },
    {
        name: "Vir Chakra",
        description: "Third highest wartime gallantry award for acts of bravery in the face of the enemy.",
        icon: Award,
        category: "Wartime Gallantry"
    },
    {
        name: "Ashok Chakra",
        description: "Highest peacetime military decoration for most conspicuous bravery or daring.",
        icon: Medal,
        category: "Peacetime Gallantry"
    },
    {
        name: "Kirti Chakra",
        description: "Second highest peacetime gallantry award for conspicuous gallantry.",
        icon: Star,
        category: "Peacetime Gallantry"
    },
    {
        name: "Shaurya Chakra",
        description: "Third highest peacetime gallantry decoration for gallantry not in the face of the enemy.",
        icon: Award,
        category: "Peacetime Gallantry"
    }
]

export const historydata = [
    { year: "1943", event: "Establishment of MCEME as a premier military engineering institution" },
    { year: "1947", event: "Post-independence expansion and modernization of training programs" },
    { year: "1965", event: "Introduction of specialized electronics and mechanical engineering courses" },
    { year: "1980", event: "Formation of the Cadets Training Wing (CTW) structure" },
    { year: "2000", event: "Digital transformation and modern training methodologies implementation" },
    { year: "2020", event: "Integration of AI and advanced technology in military training" }
]

export const scheduledata = [
    { day: "Monday", activity: "Physical Training & Parade", time: "0600-0800", type: "PT" },
    { day: "Tuesday", activity: "Electronics Theory", time: "0900-1200", type: "Academic" },
    { day: "Wednesday", activity: "Mechanical Workshop", time: "1400-1700", type: "Practical" },
    { day: "Thursday", activity: "Field Training Exercise", time: "0800-1600", type: "Field" },
    { day: "Friday", activity: "Assessment & Review", time: "0900-1200", type: "Assessment" },
    { day: "Saturday", activity: "Sports & Recreation", time: "1500-1800", type: "Sports" }
]

export const events = [
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
]