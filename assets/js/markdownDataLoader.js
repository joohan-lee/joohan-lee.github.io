// Markdown data loader for chatbot RAG system
// Loads extracted markdown content instead of JS data

class MarkdownDataLoader {
  constructor() {
    this.portfolioData = null;
    this.initialized = false;
  }

  async loadPortfolioData() {
    if (this.portfolioData) {
      return this.portfolioData;
    }

    try {
      // Load the complete portfolio markdown file
      const response = await fetch('./generated-content/portfolio-complete.md');
      if (!response.ok) {
        throw new Error(`Failed to load portfolio data: ${response.statusText}`);
      }
      
      const markdownContent = await response.text();
      
      // Parse sections for structured access
      const sections = this.parseMarkdownSections(markdownContent);
      
      this.portfolioData = {
        raw: markdownContent,
        sections: sections,
        personal: sections.personal || '',
        experience: sections.experience || '',
        projects: sections.projects || '',
        skills: sections.skills || ''
      };
      
      this.initialized = true;
      return this.portfolioData;
      
    } catch (error) {
      console.error('Failed to load markdown portfolio data:', error);
      
      // Fallback to JS data if markdown loading fails
      if (typeof window !== 'undefined' && window.careerData) {
        console.log('Falling back to JS careerData');
        return this.convertJSDataToMarkdown(window.careerData);
      }
      
      throw error;
    }
  }

  parseMarkdownSections(content) {
    const sections = {};
    
    // Split by section headers and organize
    const lines = content.split('\n');
    let currentSection = null;
    let currentContent = [];
    
    for (const line of lines) {
      if (line.startsWith('# Professional Experience')) {
        if (currentSection) {
          sections[currentSection] = currentContent.join('\n');
        }
        currentSection = 'experience';
        currentContent = [line];
      } else if (line.startsWith('# Portfolio Projects') || line.includes('project-id')) {
        if (currentSection) {
          sections[currentSection] = currentContent.join('\n');
        }
        currentSection = 'projects';
        currentContent = [line];
      } else if (line.startsWith('# Technical Skills')) {
        if (currentSection) {
          sections[currentSection] = currentContent.join('\n');
        }
        currentSection = 'skills';
        currentContent = [line];
      } else if (!currentSection && (line.includes('Joohan Lee') || line.includes('Gen AI Software Engineer'))) {
        currentSection = 'personal';
        currentContent = [line];
      } else if (currentSection) {
        currentContent.push(line);
      }
    }
    
    // Add the last section
    if (currentSection) {
      sections[currentSection] = currentContent.join('\n');
    }
    
    return sections;
  }

  // Fallback method to convert JS data to markdown format
  convertJSDataToMarkdown(jsData) {
    let markdown = '';
    
    // Personal section
    if (jsData.personal) {
      markdown += `# ${jsData.personal.name}\n\n`;
      markdown += `${jsData.personal.title}\n\n`;
      if (jsData.personal.summary) {
        markdown += `${jsData.personal.summary}\n\n`;
      }
    }
    
    // Experience section
    if (jsData.experience && jsData.experience.length > 0) {
      markdown += '# Professional Experience\n\n';
      jsData.experience.forEach(exp => {
        markdown += `## ${exp.position} at ${exp.company}\n`;
        markdown += `**Duration**: ${exp.period}\n\n`;
        markdown += `${exp.description}\n\n`;
        
        if (exp.achievements && exp.achievements.length > 0) {
          markdown += '**Key Achievements:**\n';
          exp.achievements.forEach(achievement => {
            markdown += `- ${achievement}\n`;
          });
          markdown += '\n';
        }
        
        if (exp.technologies && exp.technologies.length > 0) {
          markdown += `**Technologies:** ${exp.technologies.join(', ')}\n\n`;
        }
      });
    }
    
    // Projects section
    if (jsData.projects && jsData.projects.length > 0) {
      markdown += '# Portfolio Projects\n\n';
      jsData.projects.forEach(project => {
        markdown += `## ${project.name}\n\n`;
        markdown += `${project.fullDescription || project.shortDescription}\n\n`;
        
        if (project.highlights && project.highlights.length > 0) {
          markdown += '**Key Features:**\n';
          project.highlights.forEach(highlight => {
            markdown += `- ${highlight}\n`;
          });
          markdown += '\n';
        }
        
        if (project.technologies && project.technologies.length > 0) {
          markdown += `**Technologies:** ${project.technologies.join(', ')}\n\n`;
        }
      });
    }
    
    return {
      raw: markdown,
      sections: this.parseMarkdownSections(markdown),
      personal: markdown.includes('# Joohan Lee') ? markdown : '',
      experience: markdown.includes('# Professional Experience') ? markdown : '',
      projects: markdown.includes('# Portfolio Projects') ? markdown : '',
      skills: ''
    };
  }

  // Search function compatible with existing chatbot
  searchPortfolioData(query) {
    if (!this.portfolioData) {
      console.warn('Portfolio data not loaded');
      return [];
    }
    
    const results = [];
    const lowercaseQuery = query.toLowerCase();
    
    // Search in different sections
    Object.entries(this.portfolioData.sections).forEach(([sectionName, content]) => {
      if (content.toLowerCase().includes(lowercaseQuery)) {
        results.push({
          category: sectionName.charAt(0).toUpperCase() + sectionName.slice(1),
          content: content,
          relevance: 'high'
        });
      }
    });
    
    // If no specific section matches, return the full content for context
    if (results.length === 0) {
      results.push({
        category: 'General',
        content: this.portfolioData.raw,
        relevance: 'medium'
      });
    }
    
    return results;
  }

  // Get formatted data for LLM context
  getContextForLLM() {
    if (!this.portfolioData) {
      return 'Portfolio data not available';
    }
    
    return this.portfolioData.raw;
  }
}

// Create global instance
const markdownDataLoader = new MarkdownDataLoader();

// Export for use in other modules
if (typeof window !== 'undefined') {
  window.markdownDataLoader = markdownDataLoader;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = markdownDataLoader;
}