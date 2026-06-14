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

let screen = document.getElementById("device-screen");
let appgrid = document.getElementById("app-grid");
let homeB = document.getElementById("home");

let expCon = document.getElementById("experienceC");
let eduCon = document.getElementById("educationC");
let skillCon = document.getElementById("skillsC");
let pcon = document.getElementById("projectsC");
let messagesContainer = document.getElementById("messagesC");

let expApp = document.getElementById("experienceApp");
let eduApp = document.getElementById("educationApp");
let skillApp = document.getElementById("skillsApp");
let projectsApp = document.getElementById("projectspage");
let messagesApp = document.getElementById("messagesApp");

expCon.style.display = "none";
eduCon.style.display = "none";
skillCon.style.display = "none";
pcon.style.display = "none";
messagesContainer.style.display = "none";

function resetToHome() {
  expCon.style.display = "none";
  eduCon.style.display = "none";
  skillCon.style.display = "none";
  pcon.style.display = "none";
  messagesContainer.style.display = "none";
  appgrid.style.display = "grid";
  screen.style.background = "";

  // Home screen: no scrolling
  screen.style.display = "";
  screen.style.flexDirection = "";
  screen.style.overflowY = "hidden";

  appgrid.classList.add('app-grid-transition');
  setTimeout(() => appgrid.classList.remove('app-grid-transition'), 250);
}

function showAppContainer(container, bgColor, isMessages = false) {
  resetToHome();
  container.style.display = isMessages ? "flex" : "block";
  appgrid.style.display = "none";
  screen.style.background = bgColor;

  if (isMessages) {
    // Messages app: phone screen doesn't scroll, chat area scrolls internally
    screen.style.display = "flex";
    screen.style.flexDirection = "column";
    screen.style.overflowY = "hidden";
  } else {
    // Other apps: allow scrolling if content is long
    screen.style.overflowY = "auto";
  }

  container.classList.add('app-content-enter');
  setTimeout(() => container.classList.remove('app-content-enter'), 250);

  if (isMessages && window.initMessagesApp) {
    window.initMessagesApp();
    setTimeout(() => {
      let msgInput = document.getElementById("messageInput");
      if (msgInput) msgInput.focus();
    }, 100);
  }
}

expApp.addEventListener("click", () => showAppContainer(expCon, "#4e2f63", false));
eduApp.addEventListener("click", () => showAppContainer(eduCon, "#4e2f63", false));
skillApp.addEventListener("click", () => showAppContainer(skillCon, "#4e2f63", false));
projectsApp.addEventListener("click", () => showAppContainer(pcon, "#4e2f63", false));
messagesApp.addEventListener("click", () => showAppContainer(messagesContainer, "#0C0C0D", true));

homeB.addEventListener("click", resetToHome);