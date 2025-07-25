'use strict';

// AI-powered career chatbot with RAG functionality
class CareerChatbot {
  constructor() {
    this.isOpen = false;
    this.chatHistory = [];
    this.geminiService = null;
    this.isTyping = false;
    this.init();
  }

  init() {
    // Initialize Gemini service if Supabase is configured
    if (isSupabaseConfigured()) {
      this.geminiService = new GeminiService(CONFIG.SUPABASE_FUNCTION_URL);
    }
    
    this.createChatbotUI();
    this.attachEventListeners();
    this.addWelcomeMessage();
  }

  createChatbotUI() {
    // Create chatbot HTML structure
    const chatbotHTML = `
      <div class="chatbot-container" id="chatbot-container">
        <div class="chatbot-header">
          <div class="chatbot-title">
            <ion-icon name="chatbubble-outline"></ion-icon>
            <span>Ask about my career</span>
          </div>
          <button class="chatbot-close-btn" id="chatbot-close-btn">
            <ion-icon name="close-outline"></ion-icon>
          </button>
        </div>
        
        <div class="chatbot-messages" id="chatbot-messages">
          <!-- Messages will be added here dynamically -->
        </div>
        
        <div class="chatbot-input-area">
          <div class="chatbot-suggestions">
            ${CONFIG.QUICK_SUGGESTIONS.map(suggestion => 
              `<button class="suggestion-btn" data-suggestion="${suggestion.prompt}">${suggestion.text}</button>`
            ).join('')}
          </div>
          <div class="chatbot-input-wrapper">
            <input type="text" id="chatbot-input" placeholder="Ask me about my background..." maxlength="200">
            <button id="chatbot-send-btn">
              <ion-icon name="send-outline"></ion-icon>
            </button>
          </div>
        </div>
      </div>
      
      <button class="chatbot-toggle-btn" id="chatbot-toggle-btn">
        <ion-icon name="chatbubble-ellipses-outline"></ion-icon>
        <span class="chatbot-notification">1</span>
      </button>
    `;

    // Add to body
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);
  }

  attachEventListeners() {
    const toggleBtn = document.getElementById('chatbot-toggle-btn');
    const closeBtn = document.getElementById('chatbot-close-btn');
    const sendBtn = document.getElementById('chatbot-send-btn');
    const input = document.getElementById('chatbot-input');
    const container = document.getElementById('chatbot-container');

    // Toggle chatbot
    toggleBtn.addEventListener('click', () => this.toggleChatbot());
    closeBtn.addEventListener('click', () => this.closeChatbot());

    // Send message
    sendBtn.addEventListener('click', () => this.sendMessage());
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });

    // Suggestion buttons
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('suggestion-btn')) {
        const suggestion = e.target.getAttribute('data-suggestion');
        this.sendMessage(suggestion);
      }
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!container.contains(e.target) && !toggleBtn.contains(e.target) && this.isOpen) {
        this.closeChatbot();
      }
    });
  }

  toggleChatbot() {
    const container = document.getElementById('chatbot-container');
    const toggleBtn = document.getElementById('chatbot-toggle-btn');
    const notification = toggleBtn.querySelector('.chatbot-notification');
    
    this.isOpen = !this.isOpen;
    container.classList.toggle('active', this.isOpen);
    
    if (this.isOpen) {
      notification.style.display = 'none';
      document.getElementById('chatbot-input').focus();
    }
  }

  closeChatbot() {
    const container = document.getElementById('chatbot-container');
    this.isOpen = false;
    container.classList.remove('active');
  }

  addWelcomeMessage() {
    const welcomeMessage = getRandomWelcomeMessage();
    this.addMessage(welcomeMessage, 'bot');
    
    // Add setup message if API key is not configured
    if (!isApiKeyConfigured()) {
      setTimeout(() => {
        const setupMessage = "⚠️ Note: I'm currently running in demo mode. To enable full AI capabilities, please configure your Gemini API key in the config.js file.";
        this.addMessage(setupMessage, 'bot');
      }, 1000);
    }
  }

  async sendMessage(messageText = null) {
    const input = document.getElementById('chatbot-input');
    const message = messageText || input.value.trim();
    
    if (!message || this.isTyping) return;

    // Add user message
    this.addMessage(message, 'user');
    
    // Clear input
    if (!messageText) input.value = '';

    // Show typing indicator
    this.showTypingIndicator();

    try {
      let response;
      
      // Use Gemini API if available, otherwise fall back to local search
      if (this.geminiService && isApiKeyConfigured()) {
        response = await this.geminiService.generateResponse(message, careerData);
      } else {
        response = this.processMessageLocally(message);
      }
      
      this.hideTypingIndicator();
      this.addMessage(response, 'bot');
      
    } catch (error) {
      console.error('Error generating response:', error);
      this.hideTypingIndicator();
      
      const fallbackResponse = CONFIG.CHATBOT_SETTINGS.fallbackToLocal ? 
        this.processMessageLocally(message) :
        "I'm sorry, I'm having trouble responding right now. Please try again later.";
        
      this.addMessage(fallbackResponse, 'bot');
    }
  }

  addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageElement = document.createElement('div');
    messageElement.className = `chatbot-message chatbot-message-${sender}`;
    
    if (sender === 'bot') {
      messageElement.innerHTML = `
        <div class="message-avatar">
          <ion-icon name="person-outline"></ion-icon>
        </div>
        <div class="message-content">${text}</div>
      `;
    } else {
      messageElement.innerHTML = `
        <div class="message-content">${text}</div>
      `;
    }
    
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    this.chatHistory.push({ text, sender, timestamp: new Date() });
  }

  showTypingIndicator() {
    this.isTyping = true;
    const messagesContainer = document.getElementById('chatbot-messages');
    const typingElement = document.createElement('div');
    typingElement.className = 'chatbot-message chatbot-message-bot typing-indicator';
    typingElement.id = 'typing-indicator';
    
    typingElement.innerHTML = `
      <div class="message-avatar">
        <ion-icon name="person-outline"></ion-icon>
      </div>
      <div class="message-content typing-dots">
        <span></span><span></span><span></span>
      </div>
    `;
    
    messagesContainer.appendChild(typingElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  hideTypingIndicator() {
    this.isTyping = false;
    const typingElement = document.getElementById('typing-indicator');
    if (typingElement) {
      typingElement.remove();
    }
  }

  processMessageLocally(message) {
    const searchResults = searchCareerData(message);
    
    if (searchResults.length === 0) {
      return this.getGenericResponse(message);
    }

    let response = '';
    const topResults = searchResults.slice(0, 3);

    topResults.forEach((result, index) => {
      if (index > 0) response += '\n\n';
      
      switch (result.category) {
        case 'Personal Info':
          response += `📋 **Personal Information**\n${result.content.summary}`;
          break;
          
        case 'Experience':
          response += `💼 **${result.content.position}** at ${result.content.company}\n`;
          response += `📅 ${result.content.period}\n`;
          response += `${result.content.description}\n`;
          response += `🛠️ Technologies: ${result.content.technologies.join(', ')}`;
          break;
          
        case 'Skills':
          response += `⚡ **${result.content.category.charAt(0).toUpperCase() + result.content.category.slice(1)} Skills**\n`;
          response += `${result.content.skills.join(', ')}`;
          break;
          
        case 'Projects':
          response += `🚀 **${result.content.name}**\n`;
          response += `${result.content.description}\n`;
          response += `🛠️ Built with: ${result.content.technologies.join(', ')}\n`;
          response += `✨ Key features: ${result.content.highlights.join(', ')}`;
          break;
          
        case 'Education':
          response += `🎓 **${result.content.degree}**\n`;
          response += `🏫 ${result.content.institution} (${result.content.period})\n`;
          response += `${result.content.description}`;
          break;
          
        case 'Certifications':
          response += `🏆 **${result.content.name}**\n`;
          response += `Issued by ${result.content.issuer} in ${result.content.year}\n`;
          response += `${result.content.description}`;
          break;
      }
    });

    return response || this.getGenericResponse(message);
  }

  getGenericResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! I'm here to help you learn about Joohan's career background. You can ask me about his experience, skills, projects, education, or anything else!";
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('reach')) {
      return "📧 You can reach Joohan at joohan224@gmail.com. He's located in New Jersey, USA.";
    }
    
    if (lowerMessage.includes('help')) {
      return "I can help you learn about Joohan's:\n• Work experience and roles\n• Technical skills and expertise\n• Projects and achievements\n• Education and certifications\n\nTry asking specific questions like 'What technologies does he use?' or 'Tell me about his projects'";
    }
    
    return "I didn't find specific information about that. Try asking about Joohan's experience, skills, projects, or education. You can also use the suggestion buttons below!";
  }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new CareerChatbot();
});