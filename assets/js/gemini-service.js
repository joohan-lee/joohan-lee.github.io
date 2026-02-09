// Gemini API Service for RAG-based career chatbot (via Supabase Edge Function)
class GeminiService {
  constructor(supabaseUrl) {
    this.supabaseUrl = supabaseUrl;
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
      if (section.data) {
        const sectionText = JSON.stringify(section.data).toLowerCase();
        const matches = this.countMatches(lowercaseQuery, sectionText);
        
        if (matches > 0) {
          relevantContext.push({
            section: section.name,
            data: section.data,
            relevanceScore: matches * section.weight
          });
        }
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

  // Create system prompt with full career context
  createSystemPrompt(careerData) {
    let systemPrompt = `You are Joohan's professional portfolio assistant, designed to help recruiters and hiring managers quickly assess his qualifications for Gen AI/ML engineering roles or fullstack software engineer roles with strong research background.

Guidelines:
- Be conversational and accurate. For simple questions, answer concisely (2-3 sentences). For complex topics or when recruiters need structured information, use formatting for clarity
- Use markdown formatting strategically:
  * **Bold** for key positioning, achievements, and important metrics
  * Bullet points (-) for skills lists, achievements, or key highlights  
  * Tables for comparing technologies, roles, or timeline information when helpful
  * Code formatting (\`technology\`) for specific tools and frameworks
- Answer questions based solely on the provided career profile data below
- Lead with positioning: "AI/ML expert with full-stack engineering capabilities and research background"
- Always highlight differentiators (research + industry experience)
- Only answer questions about Joohan's professional background, skills, experience, and career. Politely redirect other topics.

Complete Career Profile:\n`;

    // Use full raw data for complete context
    if (careerData.raw) {
      systemPrompt += careerData.raw;
    } else {
      // Fallback to structured data
      ['personal', 'experience', 'projects', 'skills', 'education', 'certifications'].forEach(section => {
        if (careerData[section]) {
          systemPrompt += `\n${section.toUpperCase()}:\n`;
          const sectionText = typeof careerData[section] === 'string' ? 
            careerData[section] : JSON.stringify(careerData[section]);
          systemPrompt += sectionText + '\n';
        }
      });
    }

    return systemPrompt;
  }

  // Generate response using Gemini API
  async generateResponse(userMessage, careerData) {
    try {
      console.log('🔍 Generating response for:', userMessage);
      console.log('📂 Career data received:', typeof careerData, careerData ? Object.keys(careerData) : 'null');
      
      // Data size analysis
      if (careerData) {
        const fullDataText = careerData.raw || JSON.stringify(careerData);
        console.log('📏 Full data size:', fullDataText.length, 'characters');
        console.log('📊 Full data tokens (estimated):', Math.ceil(fullDataText.length / 4));
        
        console.log('📋 Individual sections:');
        Object.keys(careerData).forEach(key => {
          if (key !== 'raw' && key !== 'sections') {
            if (careerData[key]) {
              const sectionText = typeof careerData[key] === 'string' ? careerData[key] : JSON.stringify(careerData[key]);
              console.log(`  ✅ ${key}:`, sectionText.length, 'chars,', Math.ceil(sectionText.length / 4), 'tokens');
              
              // Show education section content specifically for debugging
              if (key === 'education') {
                console.log(`      🎓 Education content preview:`, sectionText.substring(0, 200) + '...');
              }
            } else {
              console.log(`  ❌ ${key}: NOT FOUND or EMPTY`);
            }
          }
        });
        
        // Check if raw data contains education info
        if (careerData.raw) {
          const hasEducation = careerData.raw.toLowerCase().includes('education') || 
                              careerData.raw.toLowerCase().includes('university') ||
                              careerData.raw.toLowerCase().includes('master') ||
                              careerData.raw.toLowerCase().includes('bachelor');
          console.log('🔍 Raw data contains education keywords:', hasEducation);
        }
      }
      
      // Use full context instead of RAG
      console.log('📄 Using complete career profile as context');
      
      const systemPrompt = this.createSystemPrompt(careerData);
      console.log('📝 System prompt length:', systemPrompt.length, 'characters');
      console.log('📊 Estimated tokens (rough):', Math.ceil(systemPrompt.length / 4));
      
      // System prompt logging (can be disabled in production)
      if (CONFIG.CHATBOT_SETTINGS.debug) {
        console.log('📄 FULL SYSTEM PROMPT:');
        console.log('='.repeat(80));
        console.log(systemPrompt);
        console.log('='.repeat(80));
      }

      // Prepare conversation messages (history + current question only)
      const messages = [];

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

      // Save conversation log after messages array is complete
      this.saveConversationLog(userMessage, systemPrompt, messages);

      const requestBody = {
        system_instruction: {
          parts: [{ text: systemPrompt }]
        },
        contents: messages,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,  // 충분히 증가
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

      const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxc3ZlYWFocm1md2tveGhtcXZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0MTM4NzYsImV4cCI6MjA2ODk4OTg3Nn0.Ivsc4-KV_YFB7gOKXZDkITcZK9dVepjhprqXv-5Vk3U';
      
      console.log('📡 Making request to:', this.supabaseUrl);
      console.log('📦 Request body size:', JSON.stringify(requestBody).length, 'bytes');
      
      const response = await fetch(this.supabaseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(requestBody)
      });

      console.log('📊 Response status:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ HTTP Error Response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      console.log('📋 Response data structure:', data ? Object.keys(data) : 'null');
      console.log('🔍 Full response data:', JSON.stringify(data, null, 2));
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        console.log('📝 Candidate content:', data.candidates[0].content);
        const aiResponse = data.candidates[0].content.parts[0].text;
        console.log('💬 Extracted AI response:', aiResponse);
        
        // Update conversation history (WITHOUT system prompt)
        this.conversationHistory.push(
          { role: 'user', content: userMessage },
          { role: 'model', content: aiResponse }
        );

        // Keep history manageable
        if (this.conversationHistory.length > 10) {
          this.conversationHistory = this.conversationHistory.slice(-8);
        }

        // Save response log
        this.saveResponseLog(userMessage, aiResponse, data);

        return aiResponse;
      } else {
        throw new Error('No valid response from Gemini API');
      }

    } catch (error) {
      console.error('Supabase Gemini Proxy Error:', error);
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

  // Save conversation log to Supabase
  async saveConversationLog(userMessage, systemPrompt, messages) {
    try {
      const logData = {
        user_message: userMessage,
        system_prompt_length: systemPrompt.length,
        estimated_tokens: Math.ceil(systemPrompt.length / 4),
        conversation_history_length: this.conversationHistory.length,
        session_id: this.getSessionId(),
        user_agent: navigator.userAgent,
        referrer: document.referrer || null
      };

      // Don't await - fire and forget for performance
      this.logToSupabase('chatbot_requests', logData);
      
    } catch (error) {
      console.warn('📝 Failed to log request:', error);
    }
  }

  // Save response log to Supabase
  async saveResponseLog(userMessage, aiResponse, responseData) {
    try {
      const logData = {
        user_message: userMessage,
        ai_response: aiResponse,
        response_length: aiResponse ? aiResponse.length : 0,
        finish_reason: responseData?.candidates?.[0]?.finishReason || null,
        prompt_tokens: responseData?.usageMetadata?.promptTokenCount || null,
        total_tokens: responseData?.usageMetadata?.totalTokenCount || null,
        session_id: this.getSessionId()
      };

      // Don't await - fire and forget for performance
      this.logToSupabase('chatbot_responses', logData);
      
    } catch (error) {
      console.warn('📝 Failed to log response:', error);
    }
  }

  // Helper method to send logs to Supabase
  async logToSupabase(tableName, data) {
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxc3ZlYWFocm1md2tveGhtcXZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0MTM4NzYsImV4cCI6MjA2ODk4OTg3Nn0.Ivsc4-KV_YFB7gOKXZDkITcZK9dVepjhprqXv-5Vk3U';
    
    try {
      const response = await fetch(`https://sqsveaahrmfwkoxhmqvj.supabase.co/rest/v1/${tableName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'apikey': SUPABASE_ANON_KEY
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        console.warn('📝 Supabase log failed:', response.status);
      }
    } catch (error) {
      console.warn('📝 Network error logging to Supabase:', error);
    }
  }

  // Generate or get session ID for tracking user sessions
  getSessionId() {
    let sessionId = sessionStorage.getItem('chatbot_session_id');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('chatbot_session_id', sessionId);
    }
    return sessionId;
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
