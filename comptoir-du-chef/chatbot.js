// =============================================
// CHATBOT — Le Comptoir du Chef
// Connecté à n8n via webhook
// =============================================

// ⚠️ Remplace cette URL par l'URL de ton webhook n8n
const N8N_WEBHOOK_URL = 'http://localhost:5678/webhook/comptoir-chat';

// =============================================
const chatBtn = document.getElementById('chatBtn');
const chatWindow = document.getElementById('chatWindow');
const chatClose = document.getElementById('chatClose');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');

let isOpen = false;
let isLoading = false;

// Ouvrir / fermer le chat
chatBtn.addEventListener('click', () => {
  isOpen = !isOpen;
  chatWindow.classList.toggle('open', isOpen);
  chatBtn.innerHTML = isOpen ? '✕' : '💬';
  if (isOpen && chatMessages.children.length === 0) {
    addBotMessage("Bonsoir ! Je suis l'assistant du Comptoir du Chef. Je peux vous renseigner sur notre menu, nos horaires et vous aider à réserver une table. Comment puis-je vous aider ?");
  }
});

chatClose.addEventListener('click', () => {
  isOpen = false;
  chatWindow.classList.remove('open');
  chatBtn.innerHTML = '💬';
});

// Envoyer un message
chatSend.addEventListener('click', sendMessage);
chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

function addUserMessage(text) {
  const div = document.createElement('div');
  div.className = 'msg msg-user';
  div.textContent = text;
  chatMessages.appendChild(div);
  scrollToBottom();
}

function addBotMessage(text) {
  const div = document.createElement('div');
  div.className = 'msg msg-bot';
  div.innerHTML = text.replace(/\n/g, '<br>');
  chatMessages.appendChild(div);
  scrollToBottom();
}

function showTyping() {
  const div = document.createElement('div');
  div.className = 'msg-typing';
  div.id = 'typing';
  div.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
  chatMessages.appendChild(div);
  scrollToBottom();
  return div;
}

function removeTyping() {
  const typing = document.getElementById('typing');
  if (typing) typing.remove();
}

function scrollToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendMessage() {
  const text = chatInput.value.trim();
  if (!text || isLoading) return;

  addUserMessage(text);
  chatInput.value = '';
  isLoading = true;
  chatSend.disabled = true;

  const typing = showTyping();

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, sessionId: getSessionId() })
    });

    removeTyping();

    if (!response.ok) throw new Error('Erreur réseau');

    const data = await response.json();
    const reply = data.output || data.text || data.message || data.response || "Je n'ai pas pu traiter votre demande.";
    addBotMessage(reply);

  } catch (err) {
    removeTyping();
    addBotMessage("Je suis momentanément indisponible. N'hésitez pas à nous appeler au <strong>+33 1 42 60 15 80</strong> ou à réserver en ligne.");
    console.error('Chatbot error:', err);
  }

  isLoading = false;
  chatSend.disabled = false;
  chatInput.focus();
}

function getSessionId() {
  let id = sessionStorage.getItem('chat_session');
  if (!id) {
    id = 'sess_' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('chat_session', id);
  }
  return id;
}
