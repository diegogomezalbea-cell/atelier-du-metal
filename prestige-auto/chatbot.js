// =============================================
// CHATBOT — Prestige Auto
// Connecté à n8n via webhook
// Fichier : chatbot.js
// =============================================

const N8N_WEBHOOK_URL = 'http://localhost:5678/webhook/garage-chat';

// =============================================
const chatBtn    = document.getElementById('chatBtn');
const chatWindow = document.getElementById('chatWindow');
const chatClose  = document.getElementById('chatClose');
const chatMessages = document.getElementById('chatMessages');
const chatInput  = document.getElementById('chatInput');
const chatSend   = document.getElementById('chatSend');

let isOpen    = false;
let isLoading = false;

// Ouvrir / fermer
chatBtn.addEventListener('click', () => {
  isOpen = !isOpen;
  chatWindow.classList.toggle('open', isOpen);
  chatBtn.textContent = isOpen ? '✕' : '🔧';
  if (isOpen && chatMessages.children.length === 0) {
    addBotMessage("Bonjour ! Je suis Max, l'assistant virtuel de Prestige Auto. Je peux vous renseigner sur nos services, nos tarifs, nos disponibilités ou vous aider à prendre rendez-vous. Comment puis-je vous aider ?");
  }
});

chatClose.addEventListener('click', () => {
  isOpen = false;
  chatWindow.classList.remove('open');
  chatBtn.textContent = '🔧';
});

// Envoi
chatSend.addEventListener('click', sendMessage);
chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
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
  div.innerHTML = text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
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
}

function removeTyping() {
  const t = document.getElementById('typing');
  if (t) t.remove();
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
  showTyping();

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, sessionId: getSessionId() })
    });

    removeTyping();

    if (!response.ok) throw new Error('Erreur réseau');

    const data = await response.json();
    const reply = data.output || data.text || data.message || data.response
      || "Je suis momentanément indisponible. Appelez-nous au 01 48 72 33 90.";
    addBotMessage(reply);

  } catch (err) {
    removeTyping();
    addBotMessage("Je suis momentanément indisponible. N'hésitez pas à nous appeler au **01 48 72 33 90** ou à passer directement à l'atelier.");
    console.error('Chatbot error:', err);
  }

  isLoading = false;
  chatSend.disabled = false;
  chatInput.focus();
}

function getSessionId() {
  let id = sessionStorage.getItem('garage_session');
  if (!id) {
    id = 'garage_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
    sessionStorage.setItem('garage_session', id);
  }
  return id;
}
