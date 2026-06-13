// ---------- Messages App Logic (separate file) ----------
const STORAGE_KEY = "messagesAppData";
const USER_EMAIL_KEY = "userEmail";

// ---------- Message storage & display ----------
function loadMessages() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        return JSON.parse(stored);
    }
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
    const chatMessagesDiv = document.getElementById("chatMessages");
    if (!chatMessagesDiv) return;
    chatMessagesDiv.innerHTML = "";
    messages.forEach(msg => {
        const messageDiv = document.createElement("div");
        messageDiv.className = `message ${msg.sender === "user" ? "sent" : "received"}`;
        const bubble = document.createElement("div");
        bubble.className = "bubble";
        bubble.innerText = msg.text;
        const timeSpan = document.createElement("div");
        timeSpan.className = "timestamp";
        const date = new Date(msg.timestamp);
        timeSpan.innerText = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        messageDiv.appendChild(bubble);
        messageDiv.appendChild(timeSpan);
        chatMessagesDiv.appendChild(messageDiv);
    });
    chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
}

function loadAndDisplayMessages() {
    const messages = loadMessages();
    displayMessages(messages);
}

function addMessage(text, sender) {
    const messages = loadMessages();
    const newMessage = {
        id: Date.now(),
        text: text,
        sender: sender,
        timestamp: new Date().toISOString()
    };
    messages.push(newMessage);
    saveMessages(messages);
    displayMessages(messages);
    return newMessage;
}

// ---------- Custom Email Modal ----------
function showEmailModal() {
    const modal = document.getElementById('emailModal');
    const emailInput = document.getElementById('modalEmailInput');
    const errorDiv = document.getElementById('modalError');
    const submitBtn = document.getElementById('modalSubmitBtn');
    const cancelBtn = document.getElementById('modalCancelBtn');

    if (!modal) return Promise.reject('Modal element not found');

    // Clear previous state
    emailInput.value = '';
    errorDiv.innerText = '';
    modal.style.display = 'flex';
    emailInput.focus();

    return new Promise((resolve) => {
        const onSubmit = () => {
            const email = emailInput.value.trim();
            if (!email) {
                errorDiv.innerText = 'Email address is required.';
                return;
            }
            if (!email.includes('@') || !email.includes('.')) {
                errorDiv.innerText = 'Enter a valid email (e.g., name@example.com).';
                return;
            }
            // Valid email
            modal.style.display = 'none';
            localStorage.setItem(USER_EMAIL_KEY, email);
            resolve(email);
            cleanup();
        };

        const onCancel = () => {
            modal.style.display = 'none';
            errorDiv.innerText = '';
            resolve(null);   // user cancelled
            cleanup();
        };

        const keyHandler = (e) => {
            if (e.key === 'Enter') onSubmit();
        };

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

// Get user email from localStorage or show modal. Returns null if cancelled.
async function getUserEmail() {
    let email = localStorage.getItem(USER_EMAIL_KEY);
    if (email) return email;
    const enteredEmail = await showEmailModal();
    return enteredEmail; // could be null
}

// ---------- Send message to Formspree ----------
async function sendMessageToFormspree(userMessageText, userEmail) {
    const formData = new FormData();
    formData.append("email", userEmail);
    formData.append("message", userMessageText);

    try {
        const response = await fetch("https://formspree.io/f/mgobpyvv", {
            method: "POST",
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            addMessage(
                "Thanks for reaching out! I've received your message and will get back to you soon.",
                "system"
            );
        } else {
            console.error("Formspree error:", await response.text());
            addMessage("Sorry, there was an issue sending your message. Please try again later.", "system");
        }
    } catch (error) {
        console.error("Network error:", error);
        addMessage("Network error. Could not send your message.", "system");
    }
}

// ---------- Set up send button & keyboard (only once) ----------
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

        // Ask for email if not already stored (cancellable)
        const userEmail = await getUserEmail();
        if (!userEmail) {
            addMessage("Please provide an email address to send a message.", "system");
            return;
        }

        // Add user message to chat and storage
        addMessage(text, "user");
        messageInput.value = "";
        // Send to Formspree (auto‑reply added on success)
        sendMessageToFormspree(text, userEmail);
    };

    sendBtn.addEventListener("click", sendCurrentMessage);
    messageInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendCurrentMessage();
        }
    });
}

// ---------- Public initializer (called when Messages app opens) ----------
window.initMessagesApp = function () {
    loadAndDisplayMessages();
    setupMessageSending();
};