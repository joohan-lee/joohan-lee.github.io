// Combined career data - auto-generated from build script
// DO NOT EDIT - Edit individual files in assets/js/data/ instead

// --- personal.js ---
// Personal information and contact details
const personal = {
  name: "Joohan Lee",
  title: "Software Engineer", 
  location: "New Jersey, USA",
  email: "joohan224@gmail.com",
  avatar: "./assets/images/my-avatar2.png",
  
  summary: `Passionate Software Engineer with AI specialization bridging research and industry. <br>
I'm Joohan Lee, a software engineer with a unique blend of cutting-edge research experience and practical industry expertise. Currently serving as a Gen AI Software Engineer at Samsung SDS America, I specialize in developing AI applications, RAG pipelines, and multimodal systems using state-of-the-art technologies. <br>
<br>
🏆 Key Achievements
<br>
1st Place Winner at IEEE ICASSP Signal Processing Grand Challenges (ML competition)
Published researcher with multiple IEEE papers in AI communications and machine learning
USC Computer Science Master's graduate with focus on AI/ML systems
<br>

🚀 What Sets Me Apart

<br>
Research-to-Production Pipeline: Successfully transitioned from academic research (USC Graduate Research Assistant) to industry applications, bringing theoretical knowledge into real-world solutions
Full-Stack AI Development: End-to-end experience from model training (PyTorch, TensorFlow) to deployment (AWS, Docker) and user interfaces (React, Angular)
Proven Innovation: Developed novel approaches like VQ-VAE for robust communication systems and noise-robust learning frameworks

💻 Technical Expertise

AI/ML: PyTorch, TensorFlow, LangChain, HuggingFace, AWS Bedrock
Backend: Node.js, Flask, RESTful APIs, MySQL, Nginx
Cloud & DevOps: AWS (EC2, Lambda, Amplify), Linux, Docker
Languages: Python, JavaScript/TypeScript, C/C++, Java

🎯 Current Focus
Building next-generation AI applications that solve real-world problems, with particular interest in:

Large Language Model applications and RAG systems
On-device AI communication frameworks
Noise-robust machine learning systems
Scalable backend architectures for AI services`,

  // summary: "",
  
  personality: "I'm passionate about technology, continuous learning, and building solutions that make a real impact. I enjoy collaborating with teams and mentoring junior developers.",
  
  interests: [
    "Open source contributions", 
    "Machine learning", 
    "Cloud architecture", 
    "Developer tools", 
    "Tech blogging"
  ],
  
  // Contact information for sidebar
  contacts: [
    {
      type: "email",
      label: "Email",
      value: "joohan224@gmail.com",
      link: "mailto:joohan224@gmail.com",
      icon: "mail-outline"
    }
    // Add phone, birthday, location etc. as needed
  ],
  
  // Social links
  social: [
    // Add GitHub, LinkedIn, etc. as needed
  ]
};


// --- experience.js ---
// Work experience and professional history
const experience = [
  {
    id: "senior-engineer-tech-innovation",
    position: "Senior Software Engineer",
    company: "Tech Innovation Corp",
    period: "2020 - Present",
    startDate: "2020-01",
    endDate: null, // null means current
    location: "Remote",
    
    description: "Led full-stack development of enterprise web applications using React, Node.js, and AWS. Managed a team of 4 developers and implemented CI/CD pipelines that reduced deployment time by 60%.",
    
    responsibilities: [
      "Led full-stack development of enterprise web applications",
      "Managed and mentored a team of 4 developers",
      "Implemented CI/CD pipelines and DevOps practices",
      "Architected scalable solutions using cloud technologies",
      "Collaborated with product managers and designers on feature planning"
    ],
    
    technologies: ["React", "Node.js", "AWS", "Docker", "PostgreSQL", "TypeScript", "Jenkins"],
    
    achievements: [
      "Reduced deployment time by 60% through CI/CD implementation",
      "Led team of 4 developers to successful project delivery",
      "Implemented automated testing that reduced bugs by 40%",
      "Designed microservices architecture serving 100k+ users"
    ]
  },
  
  {
    id: "fullstack-digital-solutions",
    position: "Full Stack Developer",
    company: "Digital Solutions Inc",
    period: "2018 - 2020",
    startDate: "2018-03",
    endDate: "2020-01",
    location: "New York, NY",
    
    description: "Developed responsive web applications and mobile apps using React Native. Collaborated with UX/UI designers to create intuitive user interfaces.",
    
    responsibilities: [
      "Developed responsive web applications using modern frameworks",
      "Built mobile apps using React Native",
      "Collaborated closely with UX/UI design team",
      "Implemented RESTful APIs and database integration",
      "Participated in agile development processes"
    ],
    
    technologies: ["React", "React Native", "Express.js", "MongoDB", "Firebase", "JavaScript", "CSS3"],
    
    achievements: [
      "Built 15+ responsive web applications",
      "Developed 3 mobile apps with 4.5+ app store ratings",
      "Improved user engagement by 40% through UI/UX enhancements",
      "Reduced page load times by 50% through optimization"
    ]
  },
  
  {
    id: "junior-developer-startupxyz",
    position: "Junior Developer",
    company: "StartupXYZ",
    period: "2017 - 2018",
    startDate: "2017-06",
    endDate: "2018-03",
    location: "Newark, NJ",
    
    description: "Built RESTful APIs and worked on database optimization. Participated in agile development processes and gained experience in full-stack development.",
    
    responsibilities: [
      "Built and maintained RESTful APIs",
      "Optimized database queries and performance",
      "Participated in daily standups and sprint planning",
      "Collaborated with senior developers on feature development",
      "Wrote unit tests and participated in code reviews"
    ],
    
    technologies: ["Python", "Django", "MySQL", "Redis", "Git", "Linux", "HTML5"],
    
    achievements: [
      "Optimized database queries resulting in 35% performance improvement",
      "Built 20+ REST API endpoints",
      "Participated in agile development methodology",
      "Maintained 95%+ code coverage through comprehensive testing"
    ]
  }
];

// --- projects.js ---
// Portfolio projects and work samples
const projects = [
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

// --- skills.js ---
// Technical skills and proficiencies
const skills = {
  programming: {
    category: "Programming Languages",
    skills: [
      { name: "JavaScript", level: 90, years: 6 },
      { name: "TypeScript", level: 85, years: 4 },
      { name: "Python", level: 80, years: 5 },
      { name: "Java", level: 70, years: 3 },
      { name: "Go", level: 60, years: 2 }
    ]
  },
  
  frontend: {
    category: "Frontend Technologies",
    skills: [
      { name: "React", level: 90, years: 5 },
      { name: "Vue.js", level: 80, years: 3 },
      { name: "Angular", level: 70, years: 2 },
      { name: "HTML5", level: 95, years: 6 },
      { name: "CSS3", level: 90, years: 6 },
      { name: "Sass", level: 85, years: 4 }
    ]
  },
  
  backend: {
    category: "Backend Technologies", 
    skills: [
      { name: "Node.js", level: 85, years: 5 },
      { name: "Express.js", level: 80, years: 4 },
      { name: "Django", level: 75, years: 3 },
      { name: "Flask", level: 70, years: 2 },
      { name: "Spring Boot", level: 65, years: 2 }
    ]
  },
  
  databases: {
    category: "Databases",
    skills: [
      { name: "PostgreSQL", level: 85, years: 4 },
      { name: "MongoDB", level: 80, years: 4 },
      { name: "MySQL", level: 75, years: 5 },
      { name: "Redis", level: 70, years: 3 },
      { name: "DynamoDB", level: 60, years: 2 }
    ]
  },
  
  cloud: {
    category: "Cloud & DevOps",
    skills: [
      { name: "AWS", level: 80, years: 4 },
      { name: "Google Cloud", level: 70, years: 2 },
      { name: "Azure", level: 60, years: 1 },
      { name: "Docker", level: 85, years: 4 },
      { name: "Kubernetes", level: 70, years: 2 }
    ]
  },
  
  tools: {
    category: "Tools & Others",
    skills: [
      { name: "Git", level: 95, years: 6 },
      { name: "Jenkins", level: 75, years: 3 },
      { name: "Webpack", level: 80, years: 4 },
      { name: "Jest", level: 85, years: 4 },
      { name: "Cypress", level: 70, years: 2 }
    ]
  }
};

// Flatten skills for easy searching
const allSkills = Object.values(skills).flatMap(category => 
  category.skills.map(skill => ({
    ...skill,
    category: category.category
  }))
);

// --- education.js ---
// Educational background and academic achievements
const education = [
  {
    id: "stevens-ms-cs",
    degree: "Master of Science in Computer Science",
    institution: "Stevens Institute of Technology",
    location: "Hoboken, NJ",
    period: "2015 - 2017",
    startDate: "2015-09",
    endDate: "2017-05",
    gpa: "3.8/4.0",
    status: "completed",
    
    description: "Specialized in software engineering and machine learning. Graduated with honors. Focused on advanced algorithms, distributed systems, and artificial intelligence.",
    
    coursework: [
      "Advanced Data Structures and Algorithms",
      "Machine Learning and Pattern Recognition", 
      "Software Engineering Principles",
      "Database Systems and Design",
      "Distributed Systems Architecture",
      "Computer Networks and Security",
      "Artificial Intelligence",
      "Software Testing and Quality Assurance"
    ],
    
    achievements: [
      "Graduated with honors (Magna Cum Laude)",
      "Dean's List for 3 consecutive semesters",
      "Research assistant in Machine Learning Lab",
      "Published paper on distributed algorithms"
    ],
    
    thesis: {
      title: "Optimization of Distributed Machine Learning Algorithms",
      advisor: "Dr. Jane Smith",
      abstract: "Research focused on improving performance of machine learning algorithms in distributed computing environments."
    }
  },
  
  {
    id: "rutgers-bs-ce",
    degree: "Bachelor of Science in Computer Engineering",
    institution: "Rutgers University",
    location: "New Brunswick, NJ", 
    period: "2011 - 2015",
    startDate: "2011-09",
    endDate: "2015-05",
    gpa: "3.6/4.0",
    status: "completed",
    
    description: "Strong foundation in computer systems, programming, and mathematics. Participated in various engineering projects and student organizations.",
    
    coursework: [
      "Programming Fundamentals (C/C++, Java)",
      "Computer Architecture and Organization",
      "Digital Logic Design",
      "Data Structures and Algorithms",
      "Operating Systems",
      "Computer Networks",
      "Mathematics (Calculus, Linear Algebra, Statistics)",
      "Physics and Electrical Engineering"
    ],
    
    achievements: [
      "Member of IEEE Student Chapter",
      "Participated in ACM Programming Contests",
      "Engineering Honors Program participant",
      "Senior Capstone Project: Smart Home Automation System"
    ],
    
    capstoneProject: {
      title: "Smart Home Automation System",
      description: "Developed an IoT-based home automation system using Arduino and mobile app interface",
      technologies: ["Arduino", "Java", "Android", "Bluetooth", "Sensors"]
    }
  }
];

// --- certifications.js ---
// Professional certifications and achievements
const certifications = [
  {
    id: "aws-solutions-architect",
    name: "AWS Certified Solutions Architect - Professional",
    issuer: "Amazon Web Services",
    issuerLogo: "./assets/images/aws-logo.png", // Add logo if available
    year: "2021",
    issueDate: "2021-08-15",
    expiryDate: "2024-08-15",
    credentialId: "AWS-PSA-12345", // Add actual ID if available
    verificationUrl: null, // Add verification URL if available
    
    description: "Professional level certification for designing distributed systems on AWS. Demonstrates expertise in designing and deploying scalable, highly available, and fault-tolerant systems on Amazon Web Services.",
    
    skills: [
      "AWS Architecture Design",
      "Cloud Migration Strategies", 
      "Security and Compliance",
      "Cost Optimization",
      "High Availability Design",
      "Disaster Recovery Planning"
    ],
    
    level: "Professional",
    status: "active"
  },
  
  {
    id: "gcp-professional-developer",
    name: "Google Cloud Professional Cloud Developer",
    issuer: "Google Cloud",
    issuerLogo: "./assets/images/gcp-logo.png", // Add logo if available
    year: "2020",
    issueDate: "2020-10-20",
    expiryDate: "2022-10-20", // Expired - update if renewed
    credentialId: "GCP-PCD-67890", // Add actual ID if available
    verificationUrl: null,
    
    description: "Certification for developing scalable applications on Google Cloud Platform. Validates skills in application development, deployment, monitoring, and maintenance using GCP services.",
    
    skills: [
      "GCP Application Development",
      "Container Orchestration", 
      "API Design and Management",
      "Monitoring and Logging",
      "Security Implementation",
      "CI/CD Pipeline Design"
    ],
    
    level: "Professional", 
    status: "expired" // Update if renewed
  },
  
  // Additional certifications can be added here
  {
    id: "scrum-master",
    name: "Certified ScrumMaster (CSM)",
    issuer: "Scrum Alliance",
    issuerLogo: "./assets/images/scrum-alliance-logo.png",
    year: "2019",
    issueDate: "2019-06-10",
    expiryDate: "2021-06-10", // Requires renewal
    credentialId: "CSM-54321",
    verificationUrl: null,
    
    description: "Certification in Scrum framework and agile project management. Demonstrates ability to facilitate Scrum teams and implement agile practices effectively.",
    
    skills: [
      "Scrum Framework",
      "Agile Project Management",
      "Team Facilitation",
      "Sprint Planning",
      "Stakeholder Communication",
      "Continuous Improvement"
    ],
    
    level: "Foundation",
    status: "expired"
  }
];

// --- Main data object and functions ---

// Combined career data object - same structure as original career-data.js
const careerData = {
  personal,
  experience,
  education,
  skills,
  projects,
  certifications
};

// Search functionality - same as original searchCareerData function
function searchCareerData(query) {
  const results = [];
  const lowercaseQuery = query.toLowerCase();
  
  // Search in personal info
  if (careerData.personal.name.toLowerCase().includes(lowercaseQuery) ||
      careerData.personal.title.toLowerCase().includes(lowercaseQuery) ||
      careerData.personal.summary.toLowerCase().includes(lowercaseQuery)) {
    results.push({
      category: 'Personal Info',
      content: careerData.personal,
      relevance: 'high'
    });
  }
  
  // Search in experience
  careerData.experience.forEach((exp, index) => {
    if (exp.position.toLowerCase().includes(lowercaseQuery) ||
        exp.company.toLowerCase().includes(lowercaseQuery) ||
        exp.description.toLowerCase().includes(lowercaseQuery) ||
        exp.technologies.some(tech => tech.toLowerCase().includes(lowercaseQuery)) ||
        exp.achievements.some(achievement => achievement.toLowerCase().includes(lowercaseQuery))) {
      results.push({
        category: 'Experience',
        content: exp,
        relevance: 'high'
      });
    }
  });
  
  // Search in education
  careerData.education.forEach((edu, index) => {
    if (edu.degree.toLowerCase().includes(lowercaseQuery) ||
        edu.institution.toLowerCase().includes(lowercaseQuery) ||
        edu.description.toLowerCase().includes(lowercaseQuery) ||
        edu.coursework.some(course => course.toLowerCase().includes(lowercaseQuery))) {
      results.push({
        category: 'Education',
        content: edu,
        relevance: 'medium'
      });
    }
  });
  
  // Search in skills
  Object.keys(careerData.skills).forEach(category => {
    const categoryData = careerData.skills[category];
    if (categoryData.skills && categoryData.skills.some(skill => 
        skill.name.toLowerCase().includes(lowercaseQuery))) {
      results.push({
        category: 'Skills',
        content: {
          category: categoryData.category,
          skills: categoryData.skills.filter(skill => 
            skill.name.toLowerCase().includes(lowercaseQuery)
          ).map(skill => skill.name)
        },
        relevance: 'medium'
      });
    }
  });
  
  // Search in projects
  careerData.projects.forEach((project, index) => {
    if (project.name.toLowerCase().includes(lowercaseQuery) ||
        project.shortDescription.toLowerCase().includes(lowercaseQuery) ||
        project.fullDescription.toLowerCase().includes(lowercaseQuery) ||
        project.technologies.some(tech => tech.toLowerCase().includes(lowercaseQuery)) ||
        project.highlights.some(highlight => highlight.toLowerCase().includes(lowercaseQuery))) {
      results.push({
        category: 'Projects',
        content: project,
        relevance: 'high'
      });
    }
  });
  
  // Search in certifications
  careerData.certifications.forEach((cert, index) => {
    if (cert.name.toLowerCase().includes(lowercaseQuery) ||
        cert.issuer.toLowerCase().includes(lowercaseQuery) ||
        cert.description.toLowerCase().includes(lowercaseQuery)) {
      results.push({
        category: 'Certifications',
        content: cert,
        relevance: 'medium'
      });
    }
  });
  
  // Sort by relevance
  results.sort((a, b) => {
    if (a.relevance === 'high' && b.relevance !== 'high') return -1;
    if (b.relevance === 'high' && a.relevance !== 'high') return 1;
    return 0;
  });
  
  return results;
}

// Utility functions for easier data access
const getProjectById = (id) => careerData.projects.find(p => p.id === id);
const getExperienceById = (id) => careerData.experience.find(e => e.id === id);
const getFeaturedProjects = () => careerData.projects.filter(p => p.featured);
const getSkillsByCategory = (category) => careerData.skills[category];
const getCurrentPosition = () => careerData.experience.find(e => !e.endDate);

{ personal, experience, projects, skills, education, certifications };

// For compatibility with existing code that uses window.careerData
if (typeof window !== 'undefined') {
  window.careerData = careerData;
  window.searchCareerData = searchCareerData;
}

// For Node.js compatibility (if needed for testing)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { 
    careerData, 
    searchCareerData,
    getProjectById,
    getExperienceById,
    getFeaturedProjects,
    getSkillsByCategory,
    getCurrentPosition
  };
}