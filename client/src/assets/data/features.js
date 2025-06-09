import { Mic, Stethoscope, Search, FileText, Utensils, Dumbbell } from "lucide-react";
export const features = [
    {
      title: "Automated Documentation",
      url: "/dashboard/liveConversation",
      icon: FileText,
      description: "AI-powered transcription of doctor-patient conversations into structured clinical notes",
    },
    {
      title: "Digital Prescriptions",
      url: "/dashboard/digiPrescription",
      icon: Stethoscope,
      description: "Instant digital prescription generation with clinician review",
    },
    {
      title: "AI Diet Plans",
      url: "/dashboard/aiDiet",
      icon: Utensils,
      description: "Personalized nutrition recommendations based on patient data",
    },
    {
      title: "Exercise Routines",
      url: "/dashboard/exercisePlans",
      icon: Dumbbell,
      description: "Customized workout plans tailored to patient health status",
    },
    {
      title: "Consultation History",
      url: "/dashboard/searchPrescription",
      icon: Search,
      description: "Access complete patient records and past prescriptions",
    },
    {
      title: "Live Consultation",
      url: "/dashboard/liveConversation",
      icon: Mic,
      description: "Real-time conversation with automated note-taking",
    },
  ];
