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
      const response = await fetch('./data/portfolio-complete.md');
      if (!response.ok) {
        throw new Error(`Failed to load portfolio data: ${response.statusText}`);
      }
      
      const markdownContent = await response.text();
      
      // Parse sections for structured access
      const sections = this.parseMarkdownSections(markdownContent);
      
      this.portfolioData = {
        raw: markdownContent,
        sections: sections,
        // Dynamically add all parsed sections as direct properties
        ...sections
      };
      
      this.initialized = true;
      return this.portfolioData;
      
    } catch (error) {
      console.error('Failed to load markdown portfolio data:', error);
      
      // No fallback needed - HTML is the primary data source
      throw error;
    }
  }

  parseMarkdownSections(content) {
    const sections = {};
    
    // Split by frontmatter blocks to get individual sections
    const blocks = content.split(/^---$/m);
    
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i].trim();
      if (!block) continue;
      
      // Check if this is a typed frontmatter block (experience, projects, skills, etc.)
      if (block.includes('type:')) {
        const typeMatch = block.match(/type:\s*"([^"]+)"/);
        if (typeMatch && i + 1 < blocks.length) {
          const sectionType = typeMatch[1];
          const sectionContent = blocks[i + 1].trim();
          
          // Dynamic mapping - any type from frontmatter is automatically supported
          sections[sectionType] = sectionContent;
          i++; // Skip the content block since we just processed it
        }
      } 
      // Handle personal section (first frontmatter with name/title)
      else if (block.includes('name:') && block.includes('title:')) {
        // Find the corresponding content section
        if (i + 1 < blocks.length) {
          const personalContent = blocks[i + 1].trim();
          sections.personal = personalContent;
          i++; // Skip the content block
        }
      }
    }
    
    return sections;
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
    
    return this.portfolioData;
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