import { Medal, Star, Award } from "lucide-react";
import {
  FileText,
  BookOpen,
  Users,
  UserCheck,
  Settings,
  Shield,
  HelpCircle
} from "lucide-react";

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
    id: 4,
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
    id: 3,
    name: "Vir Chakra",
    description: "Third highest wartime gallantry award for acts of bravery in the face of the enemy.",
    icon: Award,
    category: "Wartime Gallantry"
  },
  {
    id: 4,
    name: "Ashok Chakra",
    description: "Highest peacetime military decoration for most conspicuous bravery or daring.",
    icon: Medal,
    category: "Peacetime Gallantry"
  },
  {
    id: 5,
    name: "Kirti Chakra",
    description: "Second highest peacetime gallantry award for conspicuous gallantry.",
    icon: Star,
    category: "Peacetime Gallantry"
  },
  {
    id: 6,
    name: "Shaurya Chakra",
    description: "Third highest peacetime gallantry decoration for gallantry not in the face of the enemy.",
    icon: Award,
    category: "Peacetime Gallantry"
  }
]

export const historydata = [
  { id: 1, year: "1943", event: "Establishment of MCEME as a premier military engineering institution" },
  { id: 2, year: "1947", event: "Post-independence expansion and modernization of training programs" },
  { id: 3, year: "1965", event: "Introduction of specialized electronics and mechanical engineering courses" },
  { id: 4, year: "1980", event: "Formation of the Cadets Training Wing (CTW) structure" },
  { id: 5, year: "2000", event: "Digital transformation and modern training methodologies implementation" },
  { id: 6, year: "2020", event: "Integration of AI and advanced technology in military training" }
]

export const dashboardCards = [
  {
    title: "Report Management",
    description: "Generate and manage training reports",
    icon: FileText,
    to: "/dashboard/reports",
    color: "bg-blue-500"
  },
  {
    title: "Course Management",
    description: "Manage academic courses and curricula",
    icon: BookOpen,
    to: "/dashboard/courses",
    color: "bg-green-500"
  },
  {
    title: "Subject Management",
    description: "Handle individual subjects and topics",
    icon: BookOpen,
    to: "/dashboard/subjects",
    color: "bg-purple-500"
  },
  {
    title: "Instructor Management",
    description: "Manage teaching staff and assignments",
    icon: UserCheck,
    to: "/dashboard/instructors",
    color: "bg-orange-500"
  },
  {
    title: "User Management",
    description: "Handle user accounts and permissions",
    icon: Users,
    to: "/dashboard/users",
    color: "bg-red-500"
  },
  {
    title: "Site Settings",
    description: "Configure system settings",
    icon: Settings,
    to: "/dashboard/settings",
    color: "bg-gray-500"
  },
  {
    title: "Appointment Management",
    description: "Manage roles and appointments",
    icon: Shield,
    to: "/dashboard/appointments",
    color: "bg-indigo-500"
  },
  {
    title: "Help / How-To",
    description: "Get help using the dashboard",
    icon: HelpCircle,
    to: "/dashboard/help",
    color: "bg-teal-500"
  }
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

export const platoonsdata = [
  { name: "Arjun", username: "pltn_arjun_cmdr" },
  { name: "Chandragupt", username: "pltn_chandragupt_cmdr" },
  { name: "Ranapratap", username: "pltn_ranapratap_cmdr" },
  { name: "Shivaji", username: "pltn_shivaji_cmdr" },
  { name: "Karna", username: "pltn_karna_cmdr" },
  { name: "Prithviraj", username: "pltn_prithviraj_cmdr" },
]

export const appointments = [
  "Commander",
  "Deputy Commander",
  "DS Coord",
  "HoAT",
  "CCO",
  "Platoon Commander"
]

export const activities = [
  {
    name: "Obstacle Course",
    category: "training",
    duration: "2 weeks",
    status: "completed",
  },
  {
    name: "Morning PT",
    category: "training",
    duration: "Daily",
    status: "ongoing",
  },
  {
    name: "Morning PT",
    category: "training",
    duration: "Daily",
    status: "ongoing",
  },
  {
    name: "Football Championship",
    category: "sports",
    duration: "1 week",
    status: "completed",
  },
  {
    name: "Annual Sports Meet",
    category: "sports",
    duration: "3 days",
    status: "ongoing",
  },
  {
    name: "Football Championship",
    category: "sports",
    duration: "1 week",
    status: "completed",
  }
]

export interface Subject {
  id: string;
  name: string;
  code: string;
  instructor: string;
  semester: string;
  coverage: number;
  status: "pending" | "in-progress" | "completed";
  theory?: ExamDetails;
  practical?: ExamDetails;
}

export interface ExamDetails {
  credit: number;
  phaseTest1: number;
  phaseTest2: number;
  tutorial: number;
  sessional: number;
  final: number;
  practical: number;
  total: number;
  letterGrade: string;
}

export const subjects: Subject[] = [
  {
    id: "1",
    name: "Mathematics",
    code: "MATH101",
    instructor: "Dr. Smith",
    semester: "Fall 2024",
    coverage: 85,
    status: "in-progress"
  },
  {
    id: "2",
    name: "Physics",
    code: "PHY201",
    instructor: "Prof. Johnson",
    semester: "Fall 2024",
    coverage: 72,
    status: "pending"
  },
  {
    id: "3",
    name: "Chemistry",
    code: "CHEM101",
    instructor: "Dr. Williams",
    semester: "Fall 2024",
    coverage: 95,
    status: "completed"
  }
];

export interface courseSections {
  title?:string;
  pageRange?:number;
  progress?:number;
  status: "pending" | "in-progress" | "completed";
  description?: string;
}

export const courseSections = [
  { title: "Dossier Insp Sheet", pageRange: "5-6", progress: 100, status: "completed" as const, description: "Initial inspection and verification documents" },
  { title: "Pers Particulars", pageRange: "7-10", progress: 90, status: "in-progress" as const, description: "Personal details and background information" },
  { title: "SSB Report", pageRange: "11", progress: 75, status: "in-progress" as const, description: "Services Selection Board assessment report" },
  { title: "Med Info", pageRange: "12-14", progress: 60, status: "in-progress" as const, description: "Medical examination records and fitness reports" },
  { title: "Discp Record", pageRange: "15-16", progress: 0, status: "pending" as const, description: "Disciplinary actions and conduct records" },
  { title: "Record of Comm with Parent/Guardian", pageRange: "17-22", progress: 0, status: "pending" as const, description: "Communication logs with family members" },
  { title: "Acad", pageRange: "23-30", progress: 80, status: "in-progress" as const, description: "Academic performance and course records" },
  { title: "Phy Trg", pageRange: "31-37", progress: 85, status: "in-progress" as const, description: "Physical training assessments and progress" },
  { title: "Sports/Games & Motivation Awards", pageRange: "38-39", progress: 40, status: "in-progress" as const, description: "Sports participation and achievement records" },
  { title: "Wpn Trg", pageRange: "40", progress: 20, status: "pending" as const, description: "Weapons training and proficiency records" },
  { title: "Obstacle Trg", pageRange: "41", progress: 30, status: "pending" as const, description: "Obstacle course training and performance" },
  { title: "Camps", pageRange: "42-44", progress: 0, status: "pending" as const, description: "Training camp participation and reports" },
  { title: "Club & Drill", pageRange: "45", progress: 70, status: "in-progress" as const, description: "Drill practice and club activities" },
  { title: "Credit For Excellence (CFE)", pageRange: "46-47", progress: 0, status: "pending" as const, description: "Excellence credits and recognition" },
  { title: "OLQ", pageRange: "44-57", progress: 50, status: "in-progress" as const, description: "Officer Like Qualities assessment" },
  { title: "Semester Performance Record", pageRange: "58-69", progress: 65, status: "in-progress" as const, description: "Detailed semester-wise performance tracking" },
  { title: "Final Performance Record", pageRange: "70", progress: 0, status: "pending" as const, description: "Final assessment and graduation records" },
  { title: "Overall Assessment (on Passing Out)", pageRange: "71-72", progress: 0, status: "pending" as const, description: "Comprehensive final evaluation" },
  { title: "Record of Lve, Hike & Detention", pageRange: "73", progress: 10, status: "pending" as const, description: "Leave, hiking, and detention records" },
  { title: "Interview Detls", pageRange: "74-102", progress: 0, status: "pending" as const, description: "Interview schedules and feedback" },
  { title: "Counselling/Warning Record", pageRange: "103-104", progress: 0, status: "pending" as const, description: "Counselling sessions and warnings issued" },
  { title: "Performance Graph", pageRange: "105-106", progress: 25, status: "pending" as const, description: "Visual performance tracking and analytics" },
  { title: "Indl Course Report", pageRange: "107", progress: 0, status: "pending" as const, description: "Individual course completion report" }
]