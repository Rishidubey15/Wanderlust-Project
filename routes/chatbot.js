const express = require('express');
const router = express.Router();
const TravelChatbot = require('../services/chatbotService');

// Create chatbot instance
const chatbot = new TravelChatbot();

// Handle chatbot queries
router.post('/query', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message || message.trim().length === 0) {
      return res.status(400).json({ 
        success: false,
        error: "Please provide a message" 
      });
    }

    // Log the query for observability (as mentioned in your resume)
    console.log(`Chatbot Query - User: ${req.user ? req.user._id : 'Anonymous'}, Query: ${message}`);
    
    // Get AI response
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
      success: false,
      error: "Something went wrong with the travel assistant" 
    });
  }
});

// Get chatbot capabilities (for frontend to display)
router.get('/info', (req, res) => {
  res.json({
    capabilities: [
      "Travel destination recommendations",
      "Accommodation suggestions", 
      "Local attractions and activities",
      "Travel tips and booking guidance",
      "General travel FAQs"
    ],
    sampleQueries: [
      "Suggest places to stay in Dehradun",
      "What are the best attractions in Goa?",
      "How do I cancel my booking?",
      "Tips for first-time travelers to India"
    ]
  });
});

module.exports = router;