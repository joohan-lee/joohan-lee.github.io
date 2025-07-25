// Environment configuration template
// Copy this file to .env.js and add your actual API key

const ENV = {
  GEMINI_API_KEY: 'YOUR_GEMINI_API_KEY_HERE'
};

// Make available globally
if (typeof window !== 'undefined') {
  window.ENV = ENV;
}