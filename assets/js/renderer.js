// Portfolio Renderer - minimal renderer for HTML-first approach
class PortfolioRenderer {
  constructor() {
    this.careerData = window.careerData; // Keep for backward compatibility and skills
  }

  // Initialize - most content is now in HTML, minimal JS needed
  init() {
    // All content is now in HTML - no dynamic rendering needed
    console.log('Portfolio renderer initialized - using HTML-first approach');
  }

  // Personal info, experience, education, and projects are now in HTML
  // No need for dynamic rendering of these sections

  // Render skills section
  renderSkills() {
    const skillsList = document.querySelector('.skills-list');
    if (!skillsList) return;

    // Get top skills from different categories
    const topSkills = [];
    
    // Add top frontend skills
    if (this.careerData.skills.frontend) {
      topSkills.push(...this.careerData.skills.frontend.skills.slice(0, 2));
    }
    
    // Add top programming skills
    if (this.careerData.skills.programming) {
      topSkills.push(...this.careerData.skills.programming.skills.slice(0, 1));
    }
    
    // Add top backend skills
    if (this.careerData.skills.backend) {
      topSkills.push(...this.careerData.skills.backend.skills.slice(0, 1));
    }

    const skillsHTML = topSkills.map(skill => `
      <li class="skills-item">
        <div class="title-wrapper">
          <h5 class="h5">${skill.name}</h5>
          <data value="${skill.level}">${skill.level}%</data>
        </div>
        <div class="skill-progress-bg">
          <div class="skill-progress-fill" style="width: ${skill.level}%;"></div>
        </div>
      </li>
    `).join('');

    skillsList.innerHTML = skillsHTML;
  }

  // Projects are now in HTML - no dynamic rendering needed

  // Render services section
  renderServices() {
    const servicesList = document.querySelector('.service-list');
    if (!servicesList) return;

    // Create services based on skills and experience
    const services = [
      {
        icon: './assets/images/icon-dev.svg',
        title: 'Web Development',
        description: 'High-quality development of sites at the professional level.'
      },
      {
        icon: './assets/images/icon-app.svg',  
        title: 'Mobile Apps',
        description: 'Professional development of applications for iOS and Android.'
      },
      {
        icon: './assets/images/icon-design.svg',
        title: 'Web Design',
        description: 'The most modern and high-quality design made at a professional level.'
      },
      {
        icon: './assets/images/icon-photo.svg',
        title: 'Cloud Architecture',
        description: 'Scalable cloud solutions using modern technologies and best practices.'
      }
    ];

    const servicesHTML = services.map(service => `
      <li class="service-item">
        <div class="service-icon-box">
          <img src="${service.icon}" alt="${service.title} icon" width="40">
        </div>
        <div class="service-content-box">
          <h4 class="h4 service-item-title">${service.title}</h4>
          <p class="service-item-text">${service.description}</p>
        </div>
      </li>
    `).join('');

    servicesList.innerHTML = servicesHTML;
  }

  // Utility function to capitalize first letter
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Render blog posts (could be enhanced with dynamic data)
  renderBlogPosts() {
    // Keep existing blog posts as static content for now
    // Could be enhanced with dynamic blog data if available
  }
}

// Initialize renderer when DOM is loaded (minimal version for HTML-first approach)
document.addEventListener('DOMContentLoaded', function() {
  // Wait for career data to be loaded (mainly for skills)
  const initRenderer = () => {
    if (window.careerData) {
      const renderer = new PortfolioRenderer();
      renderer.init();
    } else {
      // Retry after a short delay if career data isn't loaded yet
      setTimeout(initRenderer, 100);
    }
  };
  
  initRenderer();
});