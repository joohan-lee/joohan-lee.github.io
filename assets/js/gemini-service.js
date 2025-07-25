// Gemini API Service for RAG-based career chatbot
class GeminiService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
    this.conversationHistory = [];
  }

  // RAG functionality: retrieve relevant context based on user query
  retrieveRelevantContext(query, careerData) {
    const relevantContext = [];
    const lowercaseQuery = query.toLowerCase();
    
    // Score different sections based on query relevance
    const sections = [
      { name: 'personal', data: careerData.personal, weight: 1 },
      { name: 'experience', data: careerData.experience, weight: 3 },
      { name: 'education', data: careerData.education, weight: 2 },
      { name: 'skills', data: careerData.skills, weight: 2 },
      { name: 'projects', data: careerData.projects, weight: 3 },
      { name: 'certifications', data: careerData.certifications, weight: 1.5 }
    ];

    sections.forEach(section => {
      const sectionText = JSON.stringify(section.data).toLowerCase();
      const matches = this.countMatches(lowercaseQuery, sectionText);
      
      if (matches > 0) {
        relevantContext.push({
          section: section.name,
          data: section.data,
          relevanceScore: matches * section.weight
        });
      }
    });

    // Sort by relevance and return top contexts
    return relevantContext
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 3); // Limit context to avoid token limits
  }

  countMatches(query, text) {
    const queryWords = query.split(/\s+/).filter(word => word.length > 2);
    let matches = 0;
    
    queryWords.forEach(word => {
      const regex = new RegExp(word, 'gi');
      const wordMatches = (text.match(regex) || []).length;
      matches += wordMatches;
    });
    
    return matches;
  }

  // Create system prompt with career context
  createSystemPrompt(relevantContext) {
    let systemPrompt = `You are Joohan Lee's career assistant chatbot. You help visitors understand Joohan's professional background, skills, and experience. 

IMPORTANT GUIDELINES:
- Be conversational, friendly, and professional
- Provide specific details from the context when available
- If asked about something not in the context, politely redirect to topics you can help with
- Keep responses concise but informative (2-3 sentences usually)
- Use emojis sparingly and appropriately

CAREER CONTEXT:\n`;

    relevantContext.forEach(context => {
      systemPrompt += `\n${context.section.toUpperCase()}:\n`;
      systemPrompt += JSON.stringify(context.data, null, 2) + '\n';
    });

    return systemPrompt;
  }

  // Generate response using Gemini API
  async generateResponse(userMessage, careerData) {
    try {
      // Retrieve relevant context for RAG
      const relevantContext = this.retrieveRelevantContext(userMessage, careerData);
      const systemPrompt = this.createSystemPrompt(relevantContext);

      // Prepare the conversation context
      const messages = [
        {
          role: 'user',
          parts: [{ text: systemPrompt }]
        },
        {
          role: 'model',
          parts: [{ text: 'I understand. I\'m ready to help visitors learn about Joohan Lee\'s career background. How can I assist?' }]
        }
      ];

      // Add recent conversation history for context
      this.conversationHistory.slice(-4).forEach(msg => {
        messages.push({
          role: msg.role,
          parts: [{ text: msg.content }]
        });
      });

      // Add current user message
      messages.push({
        role: 'user',
        parts: [{ text: userMessage }]
      });

      const requestBody = {
        contents: messages,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 500,
          stopSequences: []
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      };

      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        const aiResponse = data.candidates[0].content.parts[0].text;
        
        // Update conversation history
        this.conversationHistory.push(
          { role: 'user', content: userMessage },
          { role: 'model', content: aiResponse }
        );

        // Keep history manageable
        if (this.conversationHistory.length > 10) {
          this.conversationHistory = this.conversationHistory.slice(-8);
        }

        return aiResponse;
      } else {
        throw new Error('No valid response from Gemini API');
      }

    } catch (error) {
      console.error('Gemini API Error:', error);
      return this.getFallbackResponse(userMessage);
    }
  }

  // Fallback response when API fails
  getFallbackResponse(userMessage) {
    const fallbacks = [
      "I'm having trouble connecting to my AI service right now. You can reach Joohan directly at joohan224@gmail.com to learn more about his background.",
      "Sorry, I'm experiencing some technical difficulties. Please feel free to explore Joohan's resume and portfolio sections for detailed information about his experience.",
      "I'm currently offline, but you can find comprehensive information about Joohan's skills and projects in the other sections of this portfolio."
    ];
    
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }

  // Clear conversation history
  clearHistory() {
    this.conversationHistory = [];
  }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GeminiService;
}
