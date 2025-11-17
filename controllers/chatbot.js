const TravelChatbot = require('../services/chatbotService');
const chatbot = new TravelChatbot();

// Handle chatbot queries
const handleChatbotQuery = async (req, res) => {
  try {
    const { message } = req.body;
    // const userId = req.user ? req.user._id : null; // Assuming you have authentication middleware
    
    if (!message || message.trim().length === 0) {
      return res.status(400).json({ 
        error: "Please provide a message" 
      });
    }

    // Log the query for observability (as mentioned in your resume)
    console.log(`Chatbot Query - User: ${'Anonymous'}, Query: ${message}`);
    
    const response = await chatbot.handleQuery(message);
    
    // Log successful response
    console.log(`Chatbot Response Generated - Length: ${response.length} chars`);
    
    res.json({
      success: true,
      response: response,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Chatbot Controller Error:', error);
    res.status(500).json({ 
      error: "Something went wrong with the travel assistant" 
    });
  }
};

// Get chatbot capabilities (for frontend to display)
const getChatbotInfo = (req, res) => {
  res.json({
    capabilities: [
      "Travel destination recommendations",
      "Personalized suggestions based on history",
      "General travel FAQs",
      "Booking assistance",
      "Travel tips and advice"
    ],
    sampleQueries: [
      "Recommend me a destination for a weekend trip",
      "What's your cancellation policy?",
      "I like beaches, suggest some places",
      "How do I make a booking?"
    ]
  });
};

module.exports = {
  handleChatbotQuery,
  getChatbotInfo
};
