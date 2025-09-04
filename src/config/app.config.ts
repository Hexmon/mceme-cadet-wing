import { Medal, Star, Award } from "lucide-react";

export const CommandersData = [
  {
    id: 1,
    name: "Brig Atul Jaiswal",
    image: "../assets/commander-placeholder.jpg",
    service: "Indian Army",
    rank: "Commander, CTW",
    tenure: "Present",
    note: "Leading with excellence and dedication to shape future military leaders through innovative training methodologies.",
    achievements: [
      "Modernized MCEME curriculum with advanced engineering technologies",
      "Established international partnerships with 15+ military academies",
      "Led digital transformation initiative across all training programs",
      "Increased graduation rates by 35% through innovative teaching methods",
      "Implemented comprehensive leadership development program"
    ],
    legacy:
      "General Mitchell transformed MCEME into a world-class institution through his visionary leadership and commitment to excellence. His modernization efforts established new standards for military engineering education, while his emphasis on international collaboration expanded the college's global influence. Under his command, MCEME became a beacon of innovation in military education.",
    message:
      "Excellence is not a destination, but a journey of continuous improvement. Every engineer we train carries forward our commitment to serve with honor and distinction."
  },
  {
    id: 2,
    name: "Brig Rajesh Kumar",
    image: "/commander-placeholder.jpg",
    service: "Indian Army",
    rank: "Former Commander, CTW",
    tenure: "2020-2023",
    note: "Instrumental in modernizing training infrastructure and implementing digital learning platforms.",
    achievements: [
      "Modernized MCEME curriculum with advanced engineering technologies",
      "Established international partnerships with 15+ military academies",
      "Led digital transformation initiative across all training programs",
      "Increased graduation rates by 35% through innovative teaching methods",
      "Implemented comprehensive leadership development program"
    ],
    legacy:
      "General Mitchell transformed MCEME into a world-class institution through his visionary leadership and commitment to excellence. His modernization efforts established new standards for military engineering education, while his emphasis on international collaboration expanded the college's global influence. Under his command, MCEME became a beacon of innovation in military education.",
    message:
      "Excellence is not a destination, but a journey of continuous improvement. Every engineer we train carries forward our commitment to serve with honor and distinction."
  },
  {
    id: 3,
    name: "Brig Suresh Sharma",
    image: "/commander-placeholder.jpg",
    service: "Indian Army",
    rank: "Former Commander, CTW",
    tenure: "2017-2020",
    note: "Pioneered advanced field training exercises and inter-service cooperation programs.",
    achievements: [
      "Modernized MCEME curriculum with advanced engineering technologies",
      "Established international partnerships with 15+ military academies",
      "Led digital transformation initiative across all training programs",
      "Increased graduation rates by 35% through innovative teaching methods",
      "Implemented comprehensive leadership development program"
    ],
    legacy:
      "General Mitchell transformed MCEME into a world-class institution through his visionary leadership and commitment to excellence. His modernization efforts established new standards for military engineering education, while his emphasis on international collaboration expanded the college's global influence. Under his command, MCEME became a beacon of innovation in military education.",
    message:
      "Excellence is not a destination, but a journey of continuous improvement. Every engineer we train carries forward our commitment to serve with honor and distinction."
  }
]


export const platoons = [
    {
        id: 1,
        name: "ARJUN",
        tradition: "Embodies precision, strength, and discipline in all training exercises. Known for tactical excellence and unwavering commitment to duty.",
        color: "bg-gradient-to-br from-red-500 to-red-600"
    },
    {
        id: 2,
        name: "CHANDRAGUPT",
        tradition: "Strategic thinking and leadership under pressure. Masters of planning and execution with a focus on innovative solutions.",
        color: "bg-gradient-to-br from-blue-500 to-blue-600"
    },
    {
        id: 3,
        name: "RANAPRATAP",
        tradition: "Courage, resilience, and duty before self. Exemplifies the warrior spirit and protective instincts of true defenders.",
        color: "bg-gradient-to-br from-green-500 to-green-600"
    },
    {
        id:4,
        name: "SHIVAJI",
        tradition: "Ingenuity, rapid maneuver, and mission focus. Known for quick thinking and adaptive strategies in challenging scenarios.",
        color: "bg-gradient-to-br from-purple-500 to-purple-600"
    },
    {
        id: 5,
        name: "KARNA",
        tradition: "Honor, generosity, and steadfast commitment. Upholds the highest standards of integrity and selfless service.",
        color: "bg-gradient-to-br from-orange-500 to-orange-600"
    },
    {
        id: 6,
        name: "PRITHVIRAJ",
        tradition: "Valor, integrity, and esprit de corps. Fosters unity and brotherhood while maintaining operational excellence.",
        color: "bg-gradient-to-br from-indigo-500 to-indigo-600"
    }
]

export const awards = [
    {
        id: 1,
        name: "Param Vir Chakra",
        description: "India's highest military decoration for acts of most conspicuous bravery in the presence of the enemy.",
        icon: Medal,
        category: "Wartime Gallantry"
    },
    {
        id: 2,
        name: "Maha Vir Chakra",
        description: "Second highest military decoration for acts of conspicuous gallantry in the presence of the enemy.",
        icon: Star,
        category: "Wartime Gallantry"
    },
    {
        id:3,
        name: "Vir Chakra",
        description: "Third highest wartime gallantry award for acts of bravery in the face of the enemy.",
        icon: Award,
        category: "Wartime Gallantry"
    },
    {
        id:4,
        name: "Ashok Chakra",
        description: "Highest peacetime military decoration for most conspicuous bravery or daring.",
        icon: Medal,
        category: "Peacetime Gallantry"
    },
    {
        id:5,
        name: "Kirti Chakra",
        description: "Second highest peacetime gallantry award for conspicuous gallantry.",
        icon: Star,
        category: "Peacetime Gallantry"
    },
    {
        id:6,
        name: "Shaurya Chakra",
        description: "Third highest peacetime gallantry decoration for gallantry not in the face of the enemy.",
        icon: Award,
        category: "Peacetime Gallantry"
    }
]

export const historydata = [
    {id: 1, year: "1943", event: "Establishment of MCEME as a premier military engineering institution" },
    {id: 2, year: "1947", event: "Post-independence expansion and modernization of training programs" },
    {id: 3, year: "1965", event: "Introduction of specialized electronics and mechanical engineering courses" },
    {id: 4, year: "1980", event: "Formation of the Cadets Training Wing (CTW) structure" },
    {id: 5, year: "2000", event: "Digital transformation and modern training methodologies implementation" },
    {id: 6, year: "2020", event: "Integration of AI and advanced technology in military training" }
]