let chatMessages = [];
const uniqueId = Math.random().toString(36).substring(2, 9);
const chatContainer = document.getElementById('chat-container');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button'); 

// Crear un nuevo BroadcastChannel
const bc = new BroadcastChannel('chat-channel');

// Escucha los mensajes de las otras ventanas
bc.onmessage = (event) => {
    const message = event.data;
    chatMessages.push(message);
    updateChat();
};

sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message !== '') {
        const newMessage = {
            text: message,
            uniqueId,
            date: new Date().toLocaleTimeString()
        };

        // Envia los valores a traves del canal
        bc.postMessage(newMessage);
        chatMessages.push(newMessage);
        updateChat();
        messageInput.value = '';
    }
});

function updateChat() {
    chatContainer.innerHTML = '';
    chatMessages.forEach(message => {
      const messageElement = document.createElement('div');
    
      const textElement = document.createElement('p');
      textElement.textContent = message.text;
      messageElement.appendChild(textElement);
    
      const dateElement = document.createElement('span');
      dateElement.textContent = message.date;
      messageElement.appendChild(dateElement);
    
      messageElement.classList.add(uniqueId === message.uniqueId ? 'my-message' : 'other-message');
    
      chatContainer.appendChild(messageElement);
    });
    chatContainer.scrollTop = chatContainer.scrollHeight;
}
