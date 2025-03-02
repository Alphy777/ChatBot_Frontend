// DOM Elements
const chatContainer = document.getElementById('chatContainer');
const welcomeScreen = document.getElementById('welcomeScreen');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
const overlay = document.getElementById('overlay');
const newChatBtn = document.querySelector('.new-chat-btn');

// Enable/disable send button based on input
userInput.addEventListener('input', function() {
    sendButton.disabled = !this.value.trim();
});

// Handle sending messages
function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;
    
    // Remove welcome screen if visible
    if (welcomeScreen.style.display !== 'none') {
        welcomeScreen.style.display = 'none';
    }
    
    // Add user message
    addMessage('You', message, 'user');
    
    // Clear input and reset height
    userInput.value = '';
    userInput.style.height = 'auto';
    sendButton.disabled = true;
    
    // Show typing indicator
    showTypingIndicator();
    
    // Simulate AI response (would be replaced with actual API call)
    setTimeout(() => {
        // Remove typing indicator
        const typingIndicator = document.querySelector('.typing-indicator-message');
        if (typingIndicator) {
            chatContainer.removeChild(typingIndicator);
        }
        
        // Generate AI response (this would come from your model)
        const aiResponse = generateResponse(message);
        
        // Add AI message
        addMessage('AI Assistant', aiResponse, 'bot');
        
        // Scroll to bottom
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 1500); // Simulating response delay
    
    // Scroll to bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Handle Enter key to send message (Shift+Enter for new line)
userInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (!sendButton.disabled) {
            sendMessage();
        }
    }
});

// Send button click event
sendButton.addEventListener('click', sendMessage);

// Add message to chat
function addMessage(sender, text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    const avatar = document.createElement('div');
    avatar.className = `message-avatar ${type}-avatar`;
    avatar.innerHTML = type === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    
    const senderElement = document.createElement('div');
    senderElement.className = 'message-sender';
    senderElement.textContent = sender;
    
    const textElement = document.createElement('div');
    textElement.className = 'message-text';
    textElement.innerHTML = formatMessage(text);
    
    content.appendChild(senderElement);
    content.appendChild(textElement);
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    
    chatContainer.appendChild(messageDiv);
}

// Show typing indicator
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message typing-indicator-message';
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar bot-avatar';
    avatar.innerHTML = '<i class="fas fa-robot"></i>';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    
    const senderElement = document.createElement('div');
    senderElement.className = 'message-sender';
    senderElement.textContent = 'AI Assistant';
    
    const indicatorElement = document.createElement('div');
    indicatorElement.className = 'typing-indicator';
    indicatorElement.innerHTML = `
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
    `;
    
    content.appendChild(senderElement);
    content.appendChild(indicatorElement);
    
    typingDiv.appendChild(avatar);
    typingDiv.appendChild(content);
    
    chatContainer.appendChild(typingDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Format message text (handle code, line breaks, etc.)
function formatMessage(text) {
    // Convert line breaks to paragraphs
    text = text.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>');
    text = '<p>' + text + '</p>';
    
    // Simple code block formatting
    text = text.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
    
    // Inline code formatting
    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    return text;
}

// Handle suggestion clicks
function suggestPrompt(prompt) {
    userInput.value = prompt;
    userInput.style.height = 'auto';
    userInput.style.height = userInput.scrollHeight + 'px';
    sendButton.disabled = false;
    userInput.focus();
}

// Simulate AI responses (replace with actual API call to your model)
function generateResponse(message) {
    // This is just for demonstration - you would replace this with your AI model call
    const responses = [
        "I understand what you're asking about. Let me provide some information that might help.",
        "That's an interesting question! Here's what I know about this topic.",
        "I'd be happy to help with that. Here's what I can tell you.",
        "Great question! Let me share some insights that might be useful.",
        "I can certainly assist with that. Here's what you should know."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)] + 
           " This is a placeholder response. You would connect this interface to your AI model to generate actual responses.";
}

// Mobile menu toggle
menuToggle.addEventListener('click', function() {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
});

overlay.addEventListener('click', function() {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
});

// New chat button functionality
newChatBtn.addEventListener('click', function() {
    // Clear chat container
    chatContainer.innerHTML = '';
    
    // Show welcome screen
    chatContainer.appendChild(welcomeScreen);
    welcomeScreen.style.display = 'flex';
    
    // Clear input
    userInput.value = '';
    userInput.style.height = 'auto';
    sendButton.disabled = true;
    
    // Close mobile sidebar if open
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
});

// Initialize chat history items
const chatItems = document.querySelectorAll('.chat-item');
chatItems.forEach(item => {
    item.addEventListener('click', function() {
        chatItems.forEach(i => i.classList.remove('active'));
        this.classList.add('active');
        
        // Simulate loading that chat (would be replaced with actual functionality)
        chatContainer.innerHTML = '';
        showTypingIndicator();
        
        setTimeout(() => {
            const typingIndicator = document.querySelector('.typing-indicator-message');
            if (typingIndicator) {
                chatContainer.removeChild(typingIndicator);
            }
            
            // Add some sample messages for demonstration
            if (this.querySelector('.chat-title').textContent === "Getting started with AI") {
                addMessage('You', 'How can I get started with AI?', 'user');
                addMessage('AI Assistant', 'Welcome to AI Assistant! I can help you learn about artificial intelligence, assist with tasks, answer questions, and more. What specific aspect of AI are you interested in exploring?', 'bot');
            } 
            // else if (this.querySelector('.chat-title').textContent === "Website design ideas") {
            //     addMessage('You', 'I need some ideas for my personal website design', 'user');
            //     addMessage('AI Assistant', 'For a personal website, consider a clean, minimalist design with easy navigation. Include sections for your bio, portfolio, skills, and contact information. Use a color scheme that reflects your personality. Would you like more specific design suggestions?', 'bot');
            // } else if (this.querySelector('.chat-title').textContent === "Python debugging help") {
            //     addMessage('You', 'I\'m getting an IndexError in my Python code', 'user');
            //     addMessage('AI Assistant', 'An IndexError in Python typically occurs when you try to access an index that\'s out of range. Check if you\'re trying to access an element beyond the length of your list or array. Could you share the specific code that\'s causing the error?', 'bot');
            // }
            
            // Close mobile sidebar if open
            sidebar.classList.remove('open');
            overlay.classList.remove('show');
        }, 800);
    });
});