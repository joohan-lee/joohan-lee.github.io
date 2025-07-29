#!/usr/bin/env node

// HTML to Markdown extractor
// Extracts structured content from index.html for LLM consumption

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

class HTMLToMarkdownExtractor {
  constructor(htmlPath, outputDir) {
    this.htmlPath = htmlPath;
    this.outputDir = outputDir;
    this.ensureOutputDir();
  }

  ensureOutputDir() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  // Load and parse HTML
  loadHTML() {
    const htmlContent = fs.readFileSync(this.htmlPath, 'utf8');
    const dom = new JSDOM(htmlContent);
    return dom.window.document;
  }

  // Convert HTML element to markdown
  htmlToMarkdown(element) {
    let markdown = '';
    
    for (const node of element.childNodes) {
      if (node.nodeType === 3) { // Text node
        markdown += node.textContent.trim();
      } else if (node.nodeType === 1) { // Element node
        const tagName = node.tagName.toLowerCase();
        const content = this.htmlToMarkdown(node);
        
        switch (tagName) {
          case 'h1':
            markdown += `\n# ${content}\n`;
            break;
          case 'h2':
            markdown += `\n## ${content}\n`;
            break;
          case 'h3':
            markdown += `\n### ${content}\n`;
            break;
          case 'h4':
            markdown += `\n#### ${content}\n`;
            break;
          case 'p':
            markdown += `\n${content}\n`;
            break;
          case 'ul':
            markdown += `\n${content}`;
            break;
          case 'li':
            markdown += `- ${content}\n`;
            break;
          case 'strong':
          case 'b':
            markdown += `**${content}**`;
            break;
          case 'em':
          case 'i':
            markdown += `*${content}*`;
            break;
          case 'a':
            const href = node.getAttribute('href');
            markdown += `[${content}](${href})`;
            break;
          case 'code':
            markdown += `\`${content}\``;
            break;
          case 'pre':
            markdown += `\n\`\`\`\n${content}\n\`\`\`\n`;
            break;
          default:
            markdown += content;
        }
      }
    }
    
    return markdown;
  }

  // Extract personal information
  extractPersonal(document) {
    const personalSection = document.querySelector('[data-extract="personal"]');
    if (!personalSection) return '';

    // Extract structured data
    const name = document.querySelector('[data-personal="name"]')?.textContent || 'Joohan Lee';
    const title = document.querySelector('[data-personal="title"]')?.textContent || 'Software Engineer';
    const email = document.querySelector('[data-personal="email"]')?.textContent || '';
    
    // Extract main content
    const content = this.htmlToMarkdown(personalSection);
    
    // Create frontmatter
    const frontmatter = `---
name: "${name}"
title: "${title}"
email: "${email}"
extracted_date: "${new Date().toISOString()}"
---

`;

    return frontmatter + content;
  }

  // Extract experience information
  extractExperience(document) {
    const jobs = document.querySelectorAll('[data-extract="experience"] .job, [data-job-id]');
    let markdown = `---
type: "experience"
extracted_date: "${new Date().toISOString()}"
---

# Professional Experience

`;

    jobs.forEach(job => {
      const jobId = job.getAttribute('data-job-id');
      const company = job.getAttribute('data-company');
      const position = job.querySelector('h3, h4, .position')?.textContent || '';
      const period = job.querySelector('.period')?.textContent || '';
      
      markdown += `## ${position}${company ? ` at ${company}` : ''}\n`;
      if (period) markdown += `**Duration**: ${period}\n\n`;
      
      const content = this.htmlToMarkdown(job);
      markdown += content + '\n\n';
    });

    return markdown;
  }

  // Extract projects information
  extractProjects(document) {
    const projects = document.querySelectorAll('[data-extract="projects"] .project, [data-project-id]');
    let markdown = `---
type: "projects"
extracted_date: "${new Date().toISOString()}"
---

# Portfolio Projects

`;

    projects.forEach(project => {
      const projectId = project.getAttribute('data-project-id');
      const name = project.querySelector('h3, h4, .project-name')?.textContent || '';
      const technologies = project.getAttribute('data-technologies');
      
      markdown += `## ${name}\n`;
      if (technologies) {
        markdown += `**Technologies**: ${technologies}\n\n`;
      }
      
      const content = this.htmlToMarkdown(project);
      markdown += content + '\n\n';
    });

    return markdown;
  }

  // Extract skills information
  extractSkills(document) {
    const skillsSection = document.querySelector('[data-extract="skills"]');
    if (!skillsSection) return '';

    let markdown = `---
type: "skills"
extracted_date: "${new Date().toISOString()}"
---

# Technical Skills

`;

    const content = this.htmlToMarkdown(skillsSection);
    return markdown + content;
  }

  // Extract all content sections
  extractAll() {
    const document = this.loadHTML();
    
    const sections = {
      'personal.md': this.extractPersonal(document),
      'experience.md': this.extractExperience(document),
      'projects.md': this.extractProjects(document),
      'skills.md': this.extractSkills(document)
    };

    // Write files
    for (const [filename, content] of Object.entries(sections)) {
      if (content.trim()) {
        const filepath = path.join(this.outputDir, filename);
        fs.writeFileSync(filepath, content);
        console.log(`✅ Generated ${filename}`);
      }
    }

    // Create combined file for RAG
    const combined = Object.values(sections).join('\n---\n\n');
    fs.writeFileSync(path.join(this.outputDir, 'portfolio-complete.md'), combined);
    console.log('✅ Generated portfolio-complete.md');
  }

  // Watch for changes and regenerate
  watch() {
    console.log(`👀 Watching ${this.htmlPath} for changes...`);
    fs.watchFile(this.htmlPath, () => {
      console.log('🔄 HTML changed, regenerating markdown...');
      this.extractAll();
    });
  }
}

// CLI usage
if (require.main === module) {
  const htmlPath = process.argv[2] || './index.html';
  const outputDir = process.argv[3] || './generated-content';
  
  const extractor = new HTMLToMarkdownExtractor(htmlPath, outputDir);
  
  if (process.argv.includes('--watch')) {
    extractor.extractAll();
    extractor.watch();
  } else {
    extractor.extractAll();
  }
}

module.exports = HTMLToMarkdownExtractor;