// Professional certifications and achievements
export const certifications = [
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