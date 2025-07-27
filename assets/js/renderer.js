// Dynamic HTML Renderer - renders portfolio content from career data
class PortfolioRenderer {
  constructor() {
    this.careerData = window.careerData;
  }

  // Initialize and render all sections
  init() {
    if (!this.careerData) {
      console.error('Career data not loaded');
      return;
    }
    
    this.renderPersonalInfo();
    this.renderExperience();
    this.renderEducation();
    this.renderSkills();
    this.renderProjects();
    this.renderTestimonials();
    this.renderClients();
  }

  // Render personal information in sidebar
  renderPersonalInfo() {
    const personal = this.careerData.personal;
    
    // Update name and title
    const nameElement = document.querySelector('.name');
    const titleElement = document.querySelector('.title');
    const avatarElement = document.querySelector('.avatar-box img');
    
    if (nameElement) nameElement.textContent = personal.name;
    if (titleElement) titleElement.textContent = personal.title;
    if (avatarElement) {
      avatarElement.src = personal.avatar;
      avatarElement.alt = personal.name;
    }

    // Update about me section
    const aboutTextSection = document.querySelector('.about-text');
    if (aboutTextSection && personal.summary) {
      // Split summary into more natural paragraphs
      const sentences = personal.summary.split('. ');
      const midPoint = Math.ceil(sentences.length / 2);
      const firstParagraph = sentences.slice(0, midPoint).join('. ') + '.';
      const secondParagraph = sentences.slice(midPoint).join('. ');
      
      aboutTextSection.innerHTML = `
        <p>${firstParagraph}</p>
        <p>${secondParagraph}</p>
      `;
    }

    // Update contacts
    this.renderContacts(personal);
  }

  // Render contact information
  renderContacts(personal) {
    const contactsList = document.querySelector('.contacts-list');
    if (!contactsList) return;

    const contactsHTML = `
      <li class="contact-item">
        <div class="icon-box">
          <ion-icon name="mail-outline"></ion-icon>
        </div>
        <div class="contact-info">
          <p class="contact-title">Email</p>
          <a href="mailto:${personal.email}" class="contact-link">${personal.email}</a>
        </div>
      </li>
      <li class="contact-item">
        <div class="icon-box">
          <ion-icon name="location-outline"></ion-icon>
        </div>
        <div class="contact-info">
          <p class="contact-title">Location</p>
          <address>${personal.location}</address>
        </div>
      </li>
    `;
    
    contactsList.innerHTML = contactsHTML;
  }

  // Render experience timeline
  renderExperience() {
    const experienceTimeline = document.querySelector('.resume .timeline:last-of-type .timeline-list');
    if (!experienceTimeline) return;

    const experienceHTML = this.careerData.experience.map(exp => `
      <li class="timeline-item">
        <h4 class="h4 timeline-item-title">${exp.position}</h4>
        <span>${exp.period}</span>
        <p class="timeline-text">${exp.description}</p>
      </li>
    `).join('');

    experienceTimeline.innerHTML = experienceHTML;
  }

  // Render education timeline
  renderEducation() {
    const educationTimeline = document.querySelector('.resume .timeline:first-of-type .timeline-list');
    if (!educationTimeline) return;

    const educationHTML = this.careerData.education.map(edu => `
      <li class="timeline-item">
        <h4 class="h4 timeline-item-title">${edu.degree}</h4>
        <span>${edu.period}</span>
        <p class="timeline-text">${edu.description}</p>
      </li>
    `).join('');

    educationTimeline.innerHTML = educationHTML;
  }

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

  // Render projects portfolio
  renderProjects() {
    const projectsList = document.querySelector('.project-list');
    if (!projectsList) return;

    const projectsHTML = this.careerData.projects.map(project => `
      <li class="project-item active" data-filter-item data-category="${project.category}">
        <a href="#">
          <figure class="project-img">
            <div class="project-item-icon-box">
              <ion-icon name="eye-outline"></ion-icon>
            </div>
            <img src="${project.images.thumbnail}" alt="${project.name}" loading="lazy">
          </figure>
          <h3 class="project-title">${project.name}</h3>
          <p class="project-category">${this.capitalizeFirstLetter(project.category)}</p>
        </a>
      </li>
    `).join('');

    projectsList.innerHTML = projectsHTML;
  }

  // Render testimonials (keeping static for now as no testimonial data)
  renderTestimonials() {
    // Keep existing testimonials as they are static content
    // Could be enhanced to use dynamic testimonial data if available
  }

  // Render clients (keeping static for now)
  renderClients() {
    // Keep existing clients as they are static content
    // Could be enhanced to use dynamic client data if available
  }

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

// Initialize renderer when DOM is loaded and career data is available
document.addEventListener('DOMContentLoaded', function() {
  // Wait for career data to be loaded
  const initRenderer = () => {
    if (window.careerData) {
      const renderer = new PortfolioRenderer();
      renderer.init();
      renderer.renderServices(); // Render services as well
    } else {
      // Retry after a short delay if career data isn't loaded yet
      setTimeout(initRenderer, 100);
    }
  };
  
  initRenderer();
});