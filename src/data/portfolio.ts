export type SocialLink = {
  label: string;
  href: string;
};

export type PortfolioProject = {
  name: string;
  role: string;
  date: string;
  description: string;
  highlights: string[];
  techStack: string[];
};

export type PortfolioData = {
  fullName: string;
  professionalTitle: string;
  contact: {
    email: string;
    phone?: string;
    location?: string;
    socials: SocialLink[];
  };
  technicalSkills: string[];
  tools: string[];
  projects: PortfolioProject[];
  achievements: string[];
  certifications: string[];
};

export const portfolio: PortfolioData = {
  fullName: "Von Asley G Malillos",
  professionalTitle: "Full-Stack Developer",
  contact: {
    email: "vonmalillos@gmail.com",
    phone: "+63 963 524 5956",
    location: "Sto. Tomas, Batangas, Philippines",
    socials: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/von-asley-malillos" },
      { label: "GitHub", href: "https://github.com/VonMGH" },
      { label: "Facebook", href: "https://www.facebook.com/malillos.va" }
    ]
  },
  technicalSkills: [
    "HTML",
    "CSS",
    "PHP",
    "Tailwind CSS",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "REST APIs",
    "MySQL",
    "Supabase",
    "Prisma"
  ],
  tools: ["Figma", "Postman", "VS Code", "Jira", "XAMPP", "Laragon"],
  projects: [
    {
      name: "DejaBrew Employee Management System",
      role: "Backend Developer",
      date: "March 2024",
      description:
        "Built a backend-focused employee management platform to streamline attendance and operational records.",
      highlights: [
        "Implemented an attendance system using employee IDs",
        "Developed secure login and role-based access controls for staff and administrators",
        "Built employee profile and status modules for onboarding and account maintenance",
        "Created attendance summaries and exportable records for payroll preparation"
      ],
      techStack: ["HTML", "CSS", "PHP", "MySQL"]
    },
    {
      name: "Crunchy Noodles RMS",
      role: "Full-Stack Developer",
      date: "June 2024",
      description:
        "Developed a restaurant management system to handle core ordering and operational workflows.",
      highlights: [
        "Built order management modules for dine-in and takeaway transactions",
        "Implemented sales tracking and daily revenue reporting",
        "Developed menu and inventory management for item availability and updates",
        "Added staff-facing interfaces for faster order processing and monitoring"
      ],
      techStack: ["HTML", "CSS", "PHP", "MySQL"]
    },
    {
      name: "SIPP: Student Internship Progress Platform",
      role: "Full-Stack Developer",
      date: "November 2025",
      description:
        "Created a digital internship platform for tracking, documentation, and progress monitoring.",
      highlights: [
        "Built digital time tracking for interns",
        "Implemented digital archiving of OJT-related documents",
        "Automated narrative report generation for interns",
        "Enabled online monitoring of student internship progress"
      ],
      techStack: ["HTML", "CSS", "PHP", "MySQL"]
    },
    {
      name: "Project DILMS School Management System",
      role: "Full-Stack Developer",
      date: "December 2025",
      description:
        "Developed a school management system to centralize academic records and daily school operations.",
      highlights: [
        "Built modules for student enrollment and profile management",
        "Implemented class, section, and subject assignment workflows",
        "Developed grade encoding and academic performance reporting",
        "Added role-based dashboards for administrators, teachers, and staff"
      ],
      techStack: ["TypeScript", "Node.js", "Prisma", "Tailwind CSS"]
    },
    {
      name: "AVAA RMS",
      role: "Full-Stack Developer",
      date: "January 2026",
      description:
        "Built a restaurant management platform focused on operational speed and real-time data visibility.",
      highlights: [
        "Implemented order lifecycle tracking from placement to fulfillment",
        "Built inventory monitoring with low-stock alerts",
        "Developed sales dashboards with daily and monthly trend summaries",
        "Integrated role-based access and activity logging for staff operations"
      ],
      techStack: ["React", "Laravel", "Supabase"]
    },
    {
      name: "Rentertain E-Commerce Platform",
      role: "Full-Stack Developer",
      date: "February 2026",
      description:
        "Developed an e-commerce platform for listing, purchasing, and managing entertainment-related products.",
      highlights: [
        "Built product catalog browsing with category and search filters",
        "Implemented cart, checkout, and order confirmation workflows",
        "Developed seller/admin product management tools",
        "Added customer account and order history features"
      ],
      techStack: ["React", "PHP", "CSS"]
    }
  ],
  achievements: [
    "Reduced API latency by 20% by optimizing payload size and caching",
    "Created 10+ reusable UI components to speed up delivery"
  ],
  certifications: [
    "Lean Six Sigma",
    "IBM SkillsBuild Software Engineering for Web Developers Certificate",
    "Software Engineer Pre-Apprenticeship - V3",
    "Front-End Web Development",
    "Security Architecture for System Engineers",
    "Offensive Security Capture the Flag - Pentest Quest: Nmap and Kali",
    "Security Operations Center in Practice"
  ]
};
