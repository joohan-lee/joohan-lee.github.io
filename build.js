#!/usr/bin/env node

// Simple build script to combine ES6 modules into a single file for production
const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'assets', 'js', 'data');
const outputFile = path.join(__dirname, 'assets', 'js', 'career-data.js');

console.log('🔨 Building combined career data file...');

// Read all data files
const files = [
  'personal.js',
  'experience.js', 
  'projects.js',
  'skills.js',
  'education.js',
  'certifications.js'
];

let combinedContent = '// Combined career data - auto-generated from build script\n';
combinedContent += '// DO NOT EDIT - Edit individual files in assets/js/data/ instead\n\n';

// Process each file
files.forEach(filename => {
  const filePath = path.join(dataDir, filename);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove export statements and add to combined content
  content = content.replace(/^export\s+const\s+/gm, 'const ');
  content = content.replace(/^export\s+/gm, '');
  
  combinedContent += `// --- ${filename} ---\n`;
  combinedContent += content + '\n\n';
});

// Add the main data object and functions from index.js
const indexPath = path.join(dataDir, 'index.js');
let indexContent = fs.readFileSync(indexPath, 'utf8');

// Remove imports and exports, keep the logic
indexContent = indexContent.replace(/^import.*from.*;\n/gm, '');
indexContent = indexContent.replace(/^export\s+/gm, '');
indexContent = indexContent.replace(/^\/\/.*modules.*\n/gm, '');

combinedContent += '// --- Main data object and functions ---\n';
combinedContent += indexContent;

// Write the combined file
fs.writeFileSync(outputFile, combinedContent);

console.log('✅ Build complete! Generated: assets/js/career-data.js');
console.log('📝 You can now use this file for direct browser access (no server needed)');