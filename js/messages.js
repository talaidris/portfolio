const STORAGE_KEY = "messagesAppData";
const USER_EMAIL_KEY = "userEmail";

function loadMessages() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
    return [{
        id: Date.now(),
        text: "Hi, I'm Tala! Send me a message and I'll get back to you as soon as possible :)",
        sender: "system",
        timestamp: new Date().toISOString()
    }];
}

function saveMessages(messages) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

function displayMessages(messages) {
    const chatDiv = document.getElementById("chatMessages");
    if (!chatDiv) return;
    chatDiv.innerHTML = "";
    messages.forEach(msg => {
        const msgDiv = document.createElement("div");
        msgDiv.className = `message ${msg.sender === "user" ? "sent" : "received"}`;
        const bubble = document.createElement("div");
        bubble.className = "bubble";
        bubble.innerText = msg.text;
        const timeSpan = document.createElement("div");
        timeSpan.className = "timestamp";
        const date = new Date(msg.timestamp);
        timeSpan.innerText = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        msgDiv.appendChild(bubble);
        msgDiv.appendChild(timeSpan);
        chatDiv.appendChild(msgDiv);
    });
    chatDiv.scrollTop = chatDiv.scrollHeight;
}

function loadAndDisplayMessages() {
    displayMessages(loadMessages());
}

function addMessage(text, sender, skipSave = false) {
    const messages = loadMessages();
    const newMessage = {
        id: Date.now(),
        text: text,
        sender: sender,
        timestamp: new Date().toISOString()
    };
    if (!skipSave) {
        messages.push(newMessage);
        saveMessages(messages);
    }
    displayMessages(messages);

    if (sender === 'user') {
        const lastBubble = document.querySelector('.message.sent:last-child .bubble');
        if (lastBubble) {
            lastBubble.classList.add('haptic-pulse');
            setTimeout(() => lastBubble.classList.remove('haptic-pulse'), 200);
            const tick = document.createElement('span');
            tick.className = 'delivered-tick';
            tick.innerText = '✓✓';
            lastBubble.appendChild(tick);
            setTimeout(() => tick.remove(), 800);
        }
    }
    return newMessage;
}

function showTypingIndicator() {
    const chatDiv = document.getElementById("chatMessages");
    if (!chatDiv) return;
    const existing = document.querySelector('.typing-indicator');
    if (existing) existing.remove();
    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator';
    indicator.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
    chatDiv.appendChild(indicator);
    chatDiv.scrollTop = chatDiv.scrollHeight;
}

function hideTypingIndicator() {
    const existing = document.querySelector('.typing-indicator');
    if (existing) existing.remove();
}

function showEmailModal() {
    const modal = document.getElementById('emailModal');
    const emailInput = document.getElementById('modalEmailInput');
    const errorDiv = document.getElementById('modalError');
    const submitBtn = document.getElementById('modalSubmitBtn');
    const cancelBtn = document.getElementById('modalCancelBtn');
    if (!modal) return Promise.reject('Modal not found');
    emailInput.value = '';
    errorDiv.innerText = '';
    modal.style.display = 'flex';
    emailInput.focus();
    return new Promise((resolve) => {
        const onSubmit = () => {
            const email = emailInput.value.trim();
            if (!email) { errorDiv.innerText = 'Email required.'; return; }
            if (!email.includes('@') || !email.includes('.')) { errorDiv.innerText = 'Invalid email.'; return; }
            modal.style.display = 'none';
            localStorage.setItem(USER_EMAIL_KEY, email);
            resolve(email);
            cleanup();
        };
        const onCancel = () => {
            modal.style.display = 'none';
            resolve(null);
            cleanup();
        };
        const keyHandler = (e) => { if (e.key === 'Enter') onSubmit(); };
        const cleanup = () => {
            submitBtn.removeEventListener('click', onSubmit);
            cancelBtn.removeEventListener('click', onCancel);
            emailInput.removeEventListener('keypress', keyHandler);
        };
        submitBtn.addEventListener('click', onSubmit);
        cancelBtn.addEventListener('click', onCancel);
        emailInput.addEventListener('keypress', keyHandler);
    });
}

async function getUserEmail() {
    let email = localStorage.getItem(USER_EMAIL_KEY);
    if (email) return email;
    return await showEmailModal();
}

async function sendMessageToFormspree(text, userEmail) {
    const formData = new FormData();
    formData.append("email", userEmail);
    formData.append("message", text);
    try {
        const res = await fetch("https://formspree.io/f/mgobpyvv", {
            method: "POST",
            body: formData,
            headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
            return true;
        } else {
            addMessage("Sorry, there was an issue sending your message. Please try again later.", "system");
            return false;
        }
    } catch (err) {
        addMessage("Network error. Could not send your message.", "system");
        return false;
    }
}

let isSendingSetup = false;

function setupMessageSending() {
    if (isSendingSetup) return;
    isSendingSetup = true;

    const sendBtn = document.getElementById("sendMessageBtn");
    const messageInput = document.getElementById("messageInput");
    if (!sendBtn || !messageInput) return;

    const sendCurrentMessage = async () => {
        const text = messageInput.value.trim();
        if (text === "") return;
        const userEmail = await getUserEmail();
        if (!userEmail) {
            addMessage("Please provide an email address to send a message.", "system");
            return;
        }
        addMessage(text, "user");
        messageInput.value = "";

        showTypingIndicator();
        const success = await sendMessageToFormspree(text, userEmail);

        setTimeout(() => {
            hideTypingIndicator();
            if (success) {
                addMessage("Thanks for reaching out! I've received your message and will get back to you soon.", "system");
            }
        }, 1500);
    };

    sendBtn.addEventListener("click", sendCurrentMessage);
    messageInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendCurrentMessage();
        }
    });
}

window.initMessagesApp = function () {
    loadAndDisplayMessages();
    setupMessageSending();
};