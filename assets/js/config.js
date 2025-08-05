// Configuration for the AI-powered career chatbot
const CONFIG = {
  // Supabase Edge Function URL
  SUPABASE_FUNCTION_URL: 'https://sqsveaahrmfwkoxhmqvj.supabase.co/functions/v1/gemini-proxy',
  
  // Chatbot Settings
  CHATBOT_SETTINGS: {
    // Show typing indicator duration (ms)
    typingIndicatorDelay: 1000,
    
    // Maximum conversation history to maintain
    maxHistoryLength: 10,
    
    // Response timeout (ms)
    responseTimeout: 30000,
    
    // Enable/disable chatbot (set to false if no API key)
    enabled: true,
    
    // Fallback to local search if API fails
    fallbackToLocal: true,
    
    // Debug mode - shows detailed logs
    debug: false
  },
  
  // Welcome messages
  WELCOME_MESSAGES: [
    "Hi! I'm Joohan's AI career assistant. Ask me anything about his background, skills, or experience! 🚀",
    "Hello! I can help you learn about Joohan's professional journey. What would you like to know? 💼",
    "Welcome! I'm here to share insights about Joohan's career and expertise. How can I help? ✨"
  ],
  
  // Quick suggestion prompts
  QUICK_SUGGESTIONS: [
    {
      text: "Tech Skills",
      prompt: "What technologies and programming languages does Joohan work with?"
    },
    {
      text: "Experience",
      prompt: "Tell me about Joohan's professional experience and career journey"
    },
    {
      text: "Projects",
      prompt: "What interesting projects has Joohan worked on?"
    },
    {
      text: "Background",
      prompt: "Give me an overview of Joohan's educational and professional background"
    }
  ]
};

// Validation function to check if Supabase URL is configured
function isSupabaseConfigured() {
  return CONFIG.SUPABASE_FUNCTION_URL 
}

// Get a random welcome message
function getRandomWelcomeMessage() {
  const messages = CONFIG.WELCOME_MESSAGES;
  return messages[Math.floor(Math.random() * messages.length)];
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CONFIG, isSupabaseConfigured, getRandomWelcomeMessage };
}
