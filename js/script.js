let apps = document.querySelectorAll('.app');

apps.forEach(app => {
  app.addEventListener('mouseover', function () {
    app.style.transform = 'scale(1.05)';
  });
  app.addEventListener('mouseout', function () {
    app.style.transform = 'scale(1)';
  });
});

// Clock
function showTime() {
  let date = new Date();
  let hours24 = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours24 >= 12 ? 'PM' : 'AM';
  let hours12 = hours24 % 12;
  hours12 = hours12 === 0 ? 12 : hours12;
  let minutesStr = minutes < 10 ? "0" + minutes : minutes;
  let time = hours12 + ":" + minutesStr + " " + ampm;
  document.getElementById("clockdisplay").innerText = time;
  setTimeout(showTime, 1000);
}
showTime();

// DOM elements
let screen = document.getElementById("device-screen");
let appgrid = document.getElementById("app-grid");
let homeB = document.getElementById("home");

// Content containers
let expCon = document.getElementById("experienceC");
let eduCon = document.getElementById("educationC");
let skillCon = document.getElementById("skillsC");
let pcon = document.getElementById("projectsC");
let messagesContainer = document.getElementById("messagesC");

// Hide all initially
expCon.style.display = "none";
eduCon.style.display = "none";
skillCon.style.display = "none";
pcon.style.display = "none";
messagesContainer.style.display = "none";

// App buttons
let expApp = document.getElementById("experienceApp");
let eduApp = document.getElementById("educationApp");
let skillApp = document.getElementById("skillsApp");
let projectsApp = document.getElementById("projectspage");
let messagesApp = document.getElementById("messagesApp");

// Experience
expApp.addEventListener("click", function () {
  expCon.style.display = "block";
  eduCon.style.display = "none";
  skillCon.style.display = "none";
  pcon.style.display = "none";
  messagesContainer.style.display = "none";
  appgrid.style.display = "none";
  screen.style.background = "#4e2f63";
});

// Education
eduApp.addEventListener("click", function () {
  eduCon.style.display = "block";
  expCon.style.display = "none";
  skillCon.style.display = "none";
  pcon.style.display = "none";
  messagesContainer.style.display = "none";
  appgrid.style.display = "none";
  screen.style.background = "#4e2f63";
});

// Skills
skillApp.addEventListener("click", function () {
  skillCon.style.display = "block";
  expCon.style.display = "none";
  eduCon.style.display = "none";
  pcon.style.display = "none";
  messagesContainer.style.display = "none";
  appgrid.style.display = "none";
  screen.style.background = "#4e2f63";
});

// Projects
projectsApp.addEventListener("click", function () {
  pcon.style.display = "block";
  expCon.style.display = "none";
  eduCon.style.display = "none";
  skillCon.style.display = "none";
  messagesContainer.style.display = "none";
  appgrid.style.display = "none";
  screen.style.background = "#4e2f63";
});

// Messages App 
messagesApp.addEventListener("click", function () {
  expCon.style.display = "none";
  eduCon.style.display = "none";
  skillCon.style.display = "none";
  pcon.style.display = "none";
  messagesContainer.style.display = "flex";
  appgrid.style.display = "none";
  screen.style.background = "#0C0C0D";

  // Change phone screen layout for Messages app only
  screen.style.display = "flex";
  screen.style.flexDirection = "column";
  screen.style.overflowY = "hidden";

  // Call the global initializer from messages.js
  if (typeof window.initMessagesApp === "function") {
    window.initMessagesApp();
  }

  // Focus the input on mobile
  setTimeout(() => {
    const messageInput = document.getElementById("messageInput");
    if (messageInput) messageInput.focus();
  }, 100);
});

// Home button
homeB.addEventListener("click", function () {
  expCon.style.display = "none";
  eduCon.style.display = "none";
  skillCon.style.display = "none";
  pcon.style.display = "none";
  messagesContainer.style.display = "none";
  appgrid.style.display = "grid";

  screen.style.background = "";
  screen.style.display = "";
  screen.style.flexDirection = "";
  screen.style.overflowY = "auto";
});

