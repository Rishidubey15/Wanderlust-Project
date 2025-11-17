  class TravelChatbot {
    constructor() {
      this.chatContainer = null;
      this.messagesContainer = null;
      this.inputField = null;
      this.isOpen = false;
      this.init();
    }

    init() {
      this.createChatWidget();
      this.attachEventListeners();
    }

    createChatWidget() {

      const chatbotHTML = `
        <div id="travel-chatbot" class="chatbot-container">
          <div class="chatbot-toggle" id="chatbot-toggle">
            <span>🤖 Travel Assistant</span>
          </div>
          <div class="chatbot-window" id="chatbot-window" style="display: none;">
            <div class="chatbot-header">
              <h4>Wanderlust Travel Assistant</h4>
              <button class="close-btn" id="close-chatbot">×</button>
            </div>
            <div class="chatbot-messages" id="chatbot-messages">
              <div class="bot-message">
                Hi! I'm your travel assistant. I can help you with destination recommendations and answer travel FAQs. How can I help you today?
              </div>
            </div>
            <div class="chatbot-input">
              <input type="text" id="chatbot-input" placeholder="Ask me about travel destinations..." />
              <button id="send-message">Send</button>
            </div>
          </div>
        </div>
      `;

      document.body.insertAdjacentHTML('beforeend', chatbotHTML);

      this.chatContainer = document.getElementById('travel-chatbot');
      this.messagesContainer = document.getElementById('chatbot-messages');
      this.inputField = document.getElementById('chatbot-input');
    }

    attachEventListeners() {
      document.getElementById('chatbot-toggle').addEventListener('click', () => {
        this.toggleChatbot();
      });

      document.getElementById('close-chatbot').addEventListener('click', () => {
        this.closeChatbot();
      });

      document.getElementById('send-message').addEventListener('click', () => {
        this.sendMessage();
      });

      this.inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.sendMessage();
        }
      });
    }

    toggleChatbot() {
      const window = document.getElementById('chatbot-window');
      if (this.isOpen) {
        window.style.display = 'none';
        this.isOpen = false;
      } else {
        window.style.display = 'block';
        this.isOpen = true;
      }
    }

    closeChatbot() {
      document.getElementById('chatbot-window').style.display = 'none';
      this.isOpen = false;
    }

    async sendMessage() {
      const message = this.inputField.value.trim();
      if (!message) return;

      this.addMessage(message, 'user');
      this.inputField.value = '';

      this.showTypingIndicator();

      try {
        const response = await fetch('/api/chatbot/query', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message })
        });

        const data = await response.json();
        
        this.hideTypingIndicator();

        if (data.success) {
          this.addMessage(data.response, 'bot');
        } else {
          this.addMessage('Sorry, I encountered an error. Please try again.', 'bot');
        }
      } catch (error) {
        this.hideTypingIndicator();
        this.addMessage('Sorry, I\'m having connection issues. Please try again later.', 'bot');
      }
    }

    addMessage(message, sender) {
      const messageDiv = document.createElement('div');
      messageDiv.className = `${sender}-message`;
      messageDiv.textContent = message;
      this.messagesContainer.appendChild(messageDiv);
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    showTypingIndicator() {
      const typingDiv = document.createElement('div');
      typingDiv.className = 'bot-message typing-indicator';
      typingDiv.innerHTML = 'Typing...';
      typingDiv.id = 'typing-indicator';
      this.messagesContainer.appendChild(typingDiv);
    }

    hideTypingIndicator() {
      const typingIndicator = document.getElementById('typing-indicator');
      if (typingIndicator) {
        typingIndicator.remove();
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    new TravelChatbot();
  });