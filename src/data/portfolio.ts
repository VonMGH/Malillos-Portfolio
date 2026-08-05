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
  imageSrc?: string;
};

export type PortfolioMilestone = {
  title: string;
  meta: string;
  details: string;
};

export type PortfolioEducation = {
  degree: string;
  institution: string;
  location?: string;
  period: string;
  details?: string;
  highlights?: string[];
  logoSrc?: string;
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
  education: PortfolioEducation[];
  technicalSkills: string[];
  tools: string[];
  projects: PortfolioProject[];
  achievements: PortfolioMilestone[];
  certifications: PortfolioMilestone[];
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
  education: [
    {
      degree: "Bachelor of Science in Information Technology",
      institution: "Laguna State Polytechnic University - San Pablo Campus",
      location: "San Pablo City, Laguna, Philippines",
      period: "2022 – 2026",
      logoSrc: "/img/lspu1.png",
      details:
        "Specializing in the Service Management Program (IT-SMP), integrating full-stack web development, enterprise IT service delivery, business process management, and systems engineering.",
      highlights: [
        "Major in Service Management Program (IT-SMP)",
        "IT Service Delivery, Business Process Automation & Enterprise Systems",
        "Full-Stack Web Development, Database Management & System Architecture",
        "Capstone & Enterprise Software Solutions Development"
      ]
    }
  ],
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
      name: "Project DILMS School Management System",
      role: "Full-Stack Developer",
      date: "December 2025",
      description:
        "Developed a school-focused digital information and learning management system supporting admin, teacher, student, and parent workflows.",
      highlights: [
        "Built announcements, attendance tracking, class schedules, learning modules, grades, student records, reports, and document uploads",
        "Implemented multi-role support for administrators, teachers, students, and parents",
        "Integrated secure data management with Prisma, PostgreSQL, and Vercel Blob Storage",
        "Delivered a responsive Next.js 16 and Tailwind CSS experience for school stakeholders"
      ],
      techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "Vercel Blob Storage"],
      imageSrc: "/projects/dilms.png"
    },
    {
      name: "ResumEasy",
      role: "Full-Stack Developer",
      date: "May 2026",
      description:
        "Built a web-based resume builder with layout selection, color themes, and live profile editing for experience, education, projects, and certifications.",
      highlights: [
        "Implemented Supabase authentication and user data persistence",
        "Built resume builder flows for profile details, skills, experience, education, projects, and certifications",
        "Delivered polished PDF export using html-to-image, jsPDF, and html2pdf.js",
        "Created responsive UI with Vite, React Router, and Tailwind CSS"
      ],
      techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "React Router", "Supabase", "jsPDF"],
      imageSrc: "/projects/Resumeasy.png"
    },
    {
      name: "SIPP: Student Internship Progress Platform",
      role: "Full-Stack Developer",
      date: "June 2025",
      description:
        "Built a student internship management portal for registration, document tracking, time logs, weekly reports, and approval workflows across coordinators and departments.",
      highlights: [
        "Implemented authentication, session management, and role-based access",
        "Built document tracking, weekly report submission, digital time logging, and approval workflows",
        "Integrated AJAX-driven endpoints with PHP for dynamic portal interactions",
        "Automated document generation for internship reports using Dompdf/mPDF"
      ],
      techStack: ["PHP", "MySQL/MariaDB", "HTML", "CSS", "JavaScript", "Bootstrap 4", "AdminLTE", "jQuery", "PHPMailer", "Dompdf"],
      imageSrc: "/projects/SIPP.png"
    },
    {
      name: "Rentertain E-Commerce Platform",
      role: "Full-Stack Developer",
      date: "February 2026",
      description:
        "Delivered a rental management system for equipment and videoke rentals with separate customer and admin experiences.",
      highlights: [
        "Built customer authentication, catalog browsing, cart and checkout, and order history",
        "Implemented rental tracking, inventory management, and status updates",
        "Added admin-facing order management and reporting tools",
        "Integrated PHPMailer for customer and admin notifications"
      ],
      techStack: ["PHP", "MySQL", "React", "Vite", "React Router", "PHPMailer"],
      imageSrc: "/projects/rentit.png"
    },
    {
      name: "ALUmytics",
      role: "Full-Stack Developer",
      date: "October 2025",
      description:
        "Built an alumni management and analytics system with separate alumni and staff interfaces, registration, email verification, and profile management.",
      highlights: [
        "Developed alumni registration, profile management, and staff access workflows",
        "Implemented secure email verification and data persistence",
        "Built reporting tools for demographics, employment, certifications, awards, and tracer studies",
        "Delivered analytics-driven insights for alumni engagement and staff operations"
      ],
      techStack: ["PHP", "MySQL/MariaDB", "HTML", "CSS", "JavaScript", "Composer", "PHPWord", "PHPMailer"],
      imageSrc: "/projects/Alumytics.png"
    }
  ],
  achievements: [
    {
      title: "Reduced API latency by 20% by optimizing payload size and caching",
      meta: "Performance Impact",
      details:
        "Improved request responsiveness by refining payload strategy and introducing caching where it added measurable value.",
    },
    {
      title: "Created 10+ reusable UI components to speed up delivery",
      meta: "Delivery Acceleration",
      details:
        "Standardized UI building blocks to reduce repeat work and improve consistency across screens and features.",
    },
  ],
  certifications: [
    {
      title: "Lean Six Sigma",
      meta: "Validated Learning Path",
      details:
        "Focused on process improvement methods, waste reduction, and structured problem-solving techniques.",
    },
    {
      title: "IBM SkillsBuild Software Engineering for Web Developers Certificate",
      meta: "Verified Credential",
      details:
        "Covered core software engineering practices for web development, including building, testing, and deploying web applications.",
    },
    {
      title: "Software Engineer Pre-Apprenticeship - V3",
      meta: "Career Track",
      details:
        "Strengthened foundational engineering skills through structured coursework and hands-on practice aligned with industry workflows.",
    },
    {
      title: "Front-End Web Development",
      meta: "Specialization",
      details:
        "Built skills in responsive UI implementation, component-based layout, and modern front-end development practices.",
    },
    {
      title: "Security Architecture for System Engineers",
      meta: "Security Focus",
      details:
        "Introduced principles for designing secure systems, threat modeling, and architectural controls for risk reduction.",
    },
    {
      title: "Offensive Security Capture the Flag - Pentest Quest: Nmap and Kali",
      meta: "Hands-on Lab",
      details:
        "Practiced reconnaissance and basic penetration testing workflows using common tooling like Nmap and Kali Linux in challenge-based exercises.",
    },
    {
      title: "Security Operations Center in Practice",
      meta: "Operational Skills",
      details:
        "Covered SOC fundamentals, alert triage, and incident response concepts used in real-world security monitoring.",
    },
  ]
};
