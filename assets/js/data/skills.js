// Technical skills and proficiencies
export const skills = {
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
export const allSkills = Object.values(skills).flatMap(category => 
  category.skills.map(skill => ({
    ...skill,
    category: category.category
  }))
);