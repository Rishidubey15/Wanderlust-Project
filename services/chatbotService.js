const { ChatOpenAI } = require("@langchain/openai");
const { PromptTemplate } = require("@langchain/core/prompts");
const { StringOutputParser } = require("@langchain/core/output_parsers");
const { RunnableSequence } = require("@langchain/core/runnables");
const { GoogleGenAI } = require("@google/genai");
require('dotenv').config();

class TravelChatbot {
  constructor() {
    this.ai = new GoogleGenAI({}); 
    this.model = "gemini-2.5-flash"; 
  }

  async handleQuery(userQuery) {
    try {
      const systemInstruction = "You are a helpful travel FAQ assistant for the Wanderlust travel platform. Provide a helpful, accurate answer based on the common travel FAQs and platform policies provided below. If the question is not about general travel, general destinations,or platform usage, suggest contacting support.";

      const faqsAndPolicies = `
Common travel FAQs and information:
- Booking process: Users can browse destinations, view details, and book directly
- Cancellation: Standard 24-48 hour cancellation policy
- Payment: We accept all major credit cards and digital payments
- Support: 24/7 customer support available
`;
      
      const userMessage = `${faqsAndPolicies}\n\nUser question: ${userQuery}`;
      const response = await this.ai.models.generateContent({
        model: this.model,
        contents: [
          { role: "user", parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: systemInstruction,
          maxOutputTokens: 256, 
          temperature: 0.7 
        }
      });
      
      console.log("Gemini API raw response:", response);

      const responseText = response.text.trim();

      if (!responseText) {
        return "Sorry, I couldn't generate a response.";
      }
      
      return responseText;

    } catch (error) {
      console.error("Error answering FAQ:", error);
      return "I'm sorry, I'm having trouble answering your question right now. Please contact our support team.";
    }
  }
}

module.exports = TravelChatbot;