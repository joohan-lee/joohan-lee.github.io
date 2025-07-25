// Portfolio projects and work samples
export const projects = [
  {
    id: "ecommerce-platform",
    name: "E-commerce Platform",
    shortDescription: "Full-stack e-commerce solution with real-time inventory management",
    fullDescription: "A comprehensive e-commerce platform built with modern web technologies. Features include real-time inventory tracking, secure payment processing, admin dashboard for order management, and responsive design for mobile commerce. Implemented microservices architecture for scalability and used Redis for caching to handle high traffic loads.",
    
    technologies: ["React", "Node.js", "PostgreSQL", "Redis", "AWS", "Stripe", "Docker"],
    category: "web development",
    
    images: {
      thumbnail: "./assets/images/project-1.jpg",
      gallery: ["./assets/images/project-1.jpg", "./assets/images/project-1-detail.jpg"]
    },
    
    links: {
      live: null, // Add URL if available
      github: null, // Add GitHub URL if available
      demo: null // Add demo URL if available
    },
    
    highlights: [
      "Real-time inventory management",
      "Secure payment integration with Stripe",
      "Admin dashboard with analytics",
      "Mobile-responsive design",
      "Microservices architecture"
    ],
    
    status: "completed",
    featured: true,
    startDate: "2022-01",
    endDate: "2022-06"
  },
  
  {
    id: "task-management-app",
    name: "Task Management App",
    shortDescription: "Collaborative task management application with real-time updates",
    fullDescription: "A collaborative project management tool that enables teams to create, assign, and track tasks in real-time. Features include drag-and-drop task boards, file attachments, progress tracking, team collaboration tools, and integration with popular productivity tools. Built with Vue.js for reactive UI updates and Socket.io for real-time synchronization.",
    
    technologies: ["Vue.js", "Express.js", "MongoDB", "Socket.io", "Node.js", "CSS3"],
    category: "applications",
    
    images: {
      thumbnail: "./assets/images/project-8.jpg",
      gallery: ["./assets/images/project-8.jpg"]
    },
    
    links: {
      live: null,
      github: null,
      demo: null
    },
    
    highlights: [
      "Real-time collaboration features",
      "File attachments and media support",
      "Progress tracking and analytics",
      "Drag-and-drop task management",
      "Team permissions and roles"
    ],
    
    status: "completed",
    featured: true,
    startDate: "2021-08",
    endDate: "2021-12"
  },
  
  {
    id: "data-analytics-dashboard",
    name: "Data Analytics Dashboard",
    shortDescription: "Business intelligence dashboard with interactive charts and reports",
    fullDescription: "A comprehensive business intelligence dashboard that provides interactive data visualizations and custom reporting capabilities. Features include dynamic charts using D3.js, customizable widgets, data export functionality, and real-time data updates. Designed for business analysts to gain insights from complex datasets through intuitive visual representations.",
    
    technologies: ["React", "D3.js", "Python", "FastAPI", "PostgreSQL", "Chart.js"],
    category: "web development",
    
    images: {
      thumbnail: "./assets/images/project-2.png",
      gallery: ["./assets/images/project-2.png"]
    },
    
    links: {
      live: null,
      github: null,
      demo: null
    },
    
    highlights: [
      "Interactive data visualizations with D3.js",
      "Custom report generation",
      "Real-time data updates",
      "Export functionality (PDF, Excel)",
      "Responsive dashboard design"
    ],
    
    status: "completed",
    featured: true,
    startDate: "2021-03",
    endDate: "2021-07"
  },
  
  // Additional projects based on current HTML structure
  {
    id: "finance-app",
    name: "Finance",
    shortDescription: "Personal finance management application",
    fullDescription: "A personal finance management application that helps users track expenses, manage budgets, and analyze spending patterns. Features include expense categorization, budget alerts, financial goal tracking, and detailed spending reports with visualizations.",
    
    technologies: ["React", "Node.js", "MongoDB", "Chart.js"],
    category: "web development",
    
    images: {
      thumbnail: "./assets/images/project-1.jpg",
      gallery: ["./assets/images/project-1.jpg"]
    },
    
    links: {
      live: null,
      github: null,
      demo: null
    },
    
    highlights: [
      "Expense tracking and categorization",
      "Budget management and alerts",
      "Financial goal setting",
      "Spending pattern analysis"
    ],
    
    status: "completed",
    featured: false,
    startDate: "2020-09",
    endDate: "2020-12"
  },
  
  {
    id: "orizon",
    name: "Orizon",
    shortDescription: "Modern web application with clean design",
    fullDescription: "A modern web application showcasing clean design principles and user-friendly interface. Built with focus on performance optimization and accessibility standards.",
    
    technologies: ["HTML5", "CSS3", "JavaScript", "Sass"],
    category: "web development",
    
    images: {
      thumbnail: "./assets/images/project-2.png",
      gallery: ["./assets/images/project-2.png"]
    },
    
    links: {
      live: null,
      github: null,
      demo: null
    },
    
    highlights: [
      "Clean and modern design",
      "Performance optimized",
      "Accessibility compliant",
      "Responsive layout"
    ],
    
    status: "completed",
    featured: false,
    startDate: "2020-05",
    endDate: "2020-08"
  },
  
  {
    id: "fundo",
    name: "Fundo",
    shortDescription: "Creative web design project",
    fullDescription: "A creative web design project focusing on visual aesthetics and user experience. Emphasizes modern design trends and interactive elements.",
    
    technologies: ["HTML5", "CSS3", "JavaScript", "Adobe XD"],
    category: "web design",
    
    images: {
      thumbnail: "./assets/images/project-3.jpg",
      gallery: ["./assets/images/project-3.jpg"]
    },
    
    links: {
      live: null,
      github: null,
      demo: null
    },
    
    highlights: [
      "Creative visual design",
      "Interactive user elements",
      "Modern design trends",
      "User experience focused"
    ],
    
    status: "completed",
    featured: false,
    startDate: "2020-01",
    endDate: "2020-04"
  }
];