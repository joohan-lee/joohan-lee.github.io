# 🎯 AI-Powered Portfolio with HTML-First Approach

A fully responsive personal portfolio website with integrated AI chatbot, built using a revolutionary **HTML-first approach** that eliminates content synchronization issues between the display layer and AI systems.

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/your-username/vcard-personal-portfolio.git
cd vcard-personal-portfolio

# Install dependencies
npm install

# Extract content for AI chatbot
npm run extract

# Start development server
npm start
```

Visit `http://localhost:8000` to view your portfolio with integrated AI chatbot.

## ✨ Key Features

### 🎯 **HTML-First Architecture**
- **Single Source of Truth**: Content lives directly in HTML
- **Auto-Extraction**: Markdown automatically generated for AI consumption
- **Zero Sync Issues**: Edit once, update everywhere
- **Rich Formatting**: Write content with proper HTML semantics

### 🤖 **AI-Powered Chatbot**
- **RAG Technology**: Retrieval-Augmented Generation using your portfolio content
- **Google Gemini Integration**: Powered by advanced language models
- **Intelligent Responses**: Context-aware answers about your career
- **Fallback Support**: Works offline with local search
- **Mobile Responsive**: Seamless experience across all devices

### 🎨 **Professional Portfolio**
- **Fully Responsive**: Optimized for desktop, tablet, and mobile
- **Modern Design**: Clean, professional UI with smooth animations
- **Interactive Elements**: Dynamic filtering, modal displays, testimonials
- **SEO Optimized**: Proper HTML semantics and meta tags
- **Fast Loading**: Optimized assets and minimal dependencies

## 📁 Project Structure

```
portfolio/
├── index.html                    # 🎯 Main portfolio (edit your content here)
├── generated-content/            # 🤖 Auto-extracted content (don't edit)
│   ├── personal.md
│   ├── experience.md
│   ├── projects.md
│   ├── skills.md
│   └── portfolio-complete.md     # Complete context for AI chatbot
├── assets/
│   ├── css/
│   │   ├── style.css            # Main portfolio styles
│   │   └── chatbot.css          # AI chatbot styles
│   ├── js/
│   │   ├── chatbot.js           # AI chatbot functionality
│   │   ├── markdownDataLoader.js # Loads extracted content
│   │   ├── config.js            # Configuration (add your API key here)
│   │   └── career-data.js       # Backward compatibility data
│   └── images/                  # Portfolio assets
├── build-scripts/
│   └── html-to-markdown.js      # Content extraction engine
├── package.json                 # Dependencies and scripts
└── .gitignore                   # Excludes generated content
```

## 🛠️ Development Workflow

### 1. **Edit Content in HTML**
Add your actual career information directly to `index.html`:

```html
<!-- Personal Information -->
<section class="about-text" data-extract="personal">
  <h3>🏆 Key Achievements</h3>
  <ul>
    <li><strong>1st Place Winner</strong> at IEEE ICASSP Signal Processing</li>
    <li><strong>Published researcher</strong> with multiple IEEE papers</li>
  </ul>
</section>

<!-- Professional Experience -->
<li class="timeline-item" data-job-id="current-role" data-company="Your Company">
  <h4 class="h4 timeline-item-title">Your Job Title</h4>
  <span class="period">2023 — Present</span>
  <p class="timeline-text">
    Detailed description of your role and achievements...
  </p>
</li>
```

### 2. **Extract Content for AI**
```bash
# Manual extraction after editing
npm run extract

# Auto-extraction (watches for HTML changes)
npm run extract:watch

# Full build process
npm run build
```

### 3. **Development Commands**
```bash
npm start                 # Start development server
npm run extract          # Extract content once
npm run extract:watch    # Watch for changes and auto-extract
npm run build            # Full build process
```

## 🤖 AI Chatbot Setup

### 1. **Supabase Configuration **
The chatbot uses Supabase Edge Functions as a proxy to Gemini API. The configuration is already set up:

```javascript
// In assets/js/config.js
const CONFIG = {
  // Supabase Edge Function URL (already configured)
  SUPABASE_FUNCTION_URL: 'https://sqsveaahrmfwkoxhmqvj.supabase.co/functions/v1/gemini-proxy',
  
  // Chatbot settings
  CHATBOT_SETTINGS: {
    enabled: true,                    // Enable/disable chatbot
    typingIndicatorDelay: 1000,       // Typing delay in ms
    maxHistoryLength: 10,             // Conversation history limit
    responseTimeout: 30000,           // API timeout in ms
    fallbackToLocal: true            // Use local search as fallback
  }
};
```

### 2. **Customize Responses**
The chatbot automatically uses content extracted from your HTML. When you update your portfolio content, the AI responses stay synchronized.

## 🎯 HTML-First Benefits

### ✅ **Single Source of Truth**
- Content lives in HTML (what users see)
- Automatically extracted to markdown (what AI uses)
- **No synchronization issues ever**

### ✅ **Rich Content Editing**
```html
<!-- Before: Ugly JS strings -->
description: "Led development of AI applications using React, Node.js..."

<!-- After: Beautiful HTML with semantic markup -->
<div data-extract="achievements">
  <h4>Key Achievements</h4>
  <ul>
    <li>Built RAG pipeline serving <strong>10k+ queries/day</strong></li>
    <li>Reduced model response time by <strong>40%</strong></li>
  </ul>
</div>
```

### ✅ **SEO & Accessibility**
- Proper HTML semantics for search engines
- Screen reader friendly structure
- Open Graph tags for social media
- Fast loading with minimal JavaScript

### ✅ **Zero Maintenance**
- Edit HTML → Save → Everything updates automatically
- No more content duplication between display and AI
- Git tracks real content changes only

## 🔧 Technical Implementation

### **Data Extraction Attributes**
Use these HTML attributes to mark content for AI extraction:

```html
<!-- Section markers -->
data-extract="personal|experience|projects|skills"

<!-- Entity identifiers -->
data-job-id="unique-job-identifier"
data-project-id="unique-project-identifier"  
data-company="Company Name"
data-technologies="Python,React,AWS"

<!-- Personal information -->
data-personal="name|title|email"
```

### **Generated Markdown Format**
The extraction system creates structured markdown:

```markdown
---
name: "Your Name"
title: "Your Job Title"
extracted_date: "2024-01-20T10:30:00.000Z"
---

# Professional Experience

## Your Job Title at Company Name
**Duration**: 2023 — Present

Your detailed job description...

**Key Achievements:**
- Achievement with **quantified results**
- Another major accomplishment

**Technologies:** Python, React, AWS, Docker
```

## 🎨 Customization

### **Adding New Content Sections**
1. Add HTML content with `data-extract` attributes
2. Update `build-scripts/html-to-markdown.js` to handle new sections
3. Run `npm run extract` to regenerate AI data

Example:
```javascript
// In html-to-markdown.js
extractAwards(document) {
  const awardsSection = document.querySelector('[data-extract="awards"]');
  // Custom extraction logic here
}
```

### **Styling the Chatbot**
Customize chatbot appearance in `assets/css/chatbot.css`:

```css
.chatbot-container {
  /* Match your portfolio theme */
  --primary-color: #your-brand-color;
  --background-color: #your-bg-color;
}
```

### **Custom Quick Suggestions**
Modify the `QUICK_SUGGESTIONS` array in `config.js` to change conversation starters.

## 🔒 Security & Best Practices

### **Supabase Security**
- Supabase Edge Functions handle API key management securely
- No direct API keys exposed in client-side code
- Rate limiting and CORS handled by Supabase proxy

### **Content Management**
- ✅ **Edit HTML files** (single source of truth)
- ❌ **Don't edit generated markdown** (auto-overwritten)
- ✅ **Run extraction** after content changes
- ✅ **Test locally** before deploying

## 🚀 Deployment

### **Static Hosting** (GitHub Pages, Netlify, Vercel)
```bash
# Build for production
npm run extract

# Deploy the entire directory
# The generated-content/ folder contains AI data
```

### **CI/CD Integration**
```yaml
# .github/workflows/deploy.yml
name: Deploy Portfolio

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        
    - name: Install dependencies
      run: npm install
      
    - name: Extract content for AI
      run: npm run extract
      
    - name: Deploy to hosting
      run: |
        # Your deployment commands here
        rsync -r . server:/var/www/portfolio/
```

### **Professional Portfolio**
- ✅ **Modern, responsive design** that works on all devices
- ✅ **SEO-optimized HTML** with proper semantic structure
- ✅ **Fast loading** with optimized assets
- ✅ **Interactive elements** with smooth animations

### **Intelligent AI Chatbot**
- ✅ **Context-aware responses** about your career
- ✅ **Automatic content synchronization** with your portfolio
- ✅ **Fallback support** for offline functionality
- ✅ **Professional conversation flow** with typing indicators

### **Developer-Friendly System**
- ✅ **HTML-first approach** eliminates sync issues
- ✅ **Zero-maintenance** content management
- ✅ **Clean, documented codebase** for easy customization
- ✅ **Automated build processes** for seamless deployment

## 📄 License

MIT License

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

