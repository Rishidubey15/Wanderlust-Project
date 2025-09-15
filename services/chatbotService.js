const { ChatOpenAI } = require("@langchain/openai");
const { PromptTemplate } = require("@langchain/core/prompts");
const { StringOutputParser } = require("@langchain/core/output_parsers");
const { RunnableSequence } = require("@langchain/core/runnables");
const Listing = require("../models/listings.js"); // Your existing listing model
const User = require("../models/user.js"); // Assuming you have a user model

class TravelChatbot {
  constructor() {
    this.llm = new ChatOpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      model: "openrouter/auto", // Or a specific model like "anthropic/claude-3-haiku"
      temperature: 0.7,
      configuration: {
        baseURL: "https://openrouter.ai/api/v1",
      },
    });
  }

  // Create prompt template for travel recommendations
  createRecommendationPrompt() {
    return PromptTemplate.fromTemplate(`
      You are a helpful travel assistant for Wanderlust, a travel planning platform.
      
      User's query: {userQuery}
      
      You specialize in:
      - Travel destination recommendations
      - Accommodation suggestions
      - Local attractions and activities
      - Travel tips and advice
      - Booking guidance
      
      Provide helpful, accurate, and engaging travel advice. Keep responses concise but informative.
      If asked about places in India (like Dehradun), provide specific local knowledge.
      If asked about booking or platform features, explain how travel booking typically works.
      
      Response:
    `);
  }

  // Create FAQ prompt template
  createFAQPrompt() {
    return PromptTemplate.fromTemplate(`
      You are a travel FAQ assistant for Wanderlust travel platform.
      
      Common travel FAQs and information:
      - Booking process: Users can browse destinations, view details, and book directly
      - Cancellation: Standard 24-48 hour cancellation policy
      - Payment: We accept all major credit cards and digital payments
      - Support: 24/7 customer support available
      
      User question: {userQuery}
      
      Provide a helpful, accurate answer based on typical travel platform policies.
      If the question is not about general travel or platform usage, suggest contacting support.
      
      Response:
    `);
  }

  // Get user's travel history for personalization
  async getUserTravelHistory(userId) {
    try {
      // This assumes you have a booking/history collection
      // Modify according to your actual data structure
      const userHistory = await User.findById(userId)
        .populate("bookingHistory")
        .select("bookingHistory preferences");

      if (!userHistory || !userHistory.bookingHistory) {
        return "No previous travel history";
      }

      return userHistory.bookingHistory
        .map((booking) => `${booking.destination} - ${booking.date}`)
        .join(", ");
    } catch (error) {
      console.error("Error fetching user history:", error);
      return "Unable to fetch travel history";
    }
  }

  // Get available destinations from your listings
  async getAvailableDestinations() {
    try {
      const listings = await Listing.find(
        {},
        "title location country price"
      ).limit(20); // Limit for prompt size

      return listings
        .map(
          (listing) =>
            `${listing.title} in ${listing.location}, ${listing.country} - $${listing.price}`
        )
        .join("\n");
    } catch (error) {
      console.error("Error fetching destinations:", error);
      return "Various destinations available";
    }
  }

  // Main method for handling recommendations
  async getRecommendation(userQuery, userId = null) {
    try {
      const prompt = this.createRecommendationPrompt();
      const outputParser = new StringOutputParser();

      // Create the chain
      const chain = RunnableSequence.from([prompt, this.llm, outputParser]);

      // Get user data
      const userHistory = userId
        ? await this.getUserTravelHistory(userId)
        : "New user";
      const destinations = await this.getAvailableDestinations();

      // Execute the chain
      const response = await chain.invoke({
        userHistory,
        destinations,
        userQuery,
      });

      return response;
    } catch (error) {
      console.error("Error generating recommendation:", error);
      return "I'm sorry, I'm having trouble generating recommendations right now. Please try again later.";
    }
  }

  // Method for handling general FAQs
  async answerFAQ(userQuery) {
    try {
      const prompt = this.createFAQPrompt();
      const outputParser = new StringOutputParser();

      const chain = RunnableSequence.from([prompt, this.llm, outputParser]);

      const response = await chain.invoke({
        userQuery,
      });

      return response;
    } catch (error) {
      console.error("Error answering FAQ:", error);
      return "I'm sorry, I'm having trouble answering your question right now. Please contact our support team.";
    }
  }

  // Smart router to determine if query is FAQ or recommendation request
  async handleQuery(userQuery, userId = null) {
    const faqKeywords = [
      "how",
      "what",
      "when",
      "policy",
      "cancel",
      "book",
      "payment",
      "support",
    ];
    const recommendationKeywords = [
      "recommend",
      "suggest",
      "where",
      "travel",
      "visit",
      "trip",
      "destination",
    ];

    const queryLower = userQuery.toLowerCase();

    const isFAQ = faqKeywords.some((keyword) => queryLower.includes(keyword));
    const isRecommendation = recommendationKeywords.some((keyword) =>
      queryLower.includes(keyword)
    );

    if (isFAQ && !isRecommendation) {
      return await this.answerFAQ(userQuery);
    } else {
      return await this.getRecommendation(userQuery, userId);
    }
  }
}

module.exports = TravelChatbot;
