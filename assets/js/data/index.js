// Main data index - combines all career data modules
import { personal } from './personal.js';
import { experience } from './experience.js';
import { projects } from './projects.js';
import { skills } from './skills.js';
import { education } from './education.js';
import { certifications } from './certifications.js';

// Combined career data object - same structure as original career-data.js
export const careerData = {
  personal,
  experience,
  education,
  skills,
  projects,
  certifications
};

// Search functionality - same as original searchCareerData function
export function searchCareerData(query) {
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
export const getProjectById = (id) => careerData.projects.find(p => p.id === id);
export const getExperienceById = (id) => careerData.experience.find(e => e.id === id);
export const getFeaturedProjects = () => careerData.projects.filter(p => p.featured);
export const getSkillsByCategory = (category) => careerData.skills[category];
export const getCurrentPosition = () => careerData.experience.find(e => !e.endDate);

// Export individual modules for direct access if needed
export { personal, experience, projects, skills, education, certifications };

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