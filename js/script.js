

let apps = document.querySelectorAll('.app');


apps.forEach(app => {
  app.addEventListener('mouseover', function (event) {
    app.style.transform = 'scale(1.05)';
  });
  app.addEventListener('mouseout', function (event) {
    app.style.transform = 'scale(1)';
  });
});



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
  document.getElementById("clockdisplay").textContent = time;
  setTimeout(showTime, 1000);
}

showTime()


let screen = document.getElementById("device-screen");
let appgrid = document.getElementById("app-grid");
let homeB = document.getElementById("home")


let expCon = document.getElementById("experienceC");
let eduCon = document.getElementById("educationC");
let skillCon = document.getElementById("skillsC");
let projects = document.getElementById("projectspage");


let expApp = document.getElementById("experienceApp");
expCon.style.display = "none";

let eduApp = document.getElementById("educationApp");
eduCon.style.display = "none";

let skillApp = document.getElementById("skillsApp");
skillCon.style.display = "none";

let pcon = document.getElementById("projectsC");
pcon.style.display = "none";


// UNCOMMENT LATER!!

expApp.addEventListener("click", function () {
  expCon.style.display = "block";
  eduCon.style.display = "none";
  skillCon.style.display = "none";
  pcon.style.display = "none";
  appgrid.style.display = "none";

  screen.style.background = "#4e2f63";
});

eduApp.addEventListener("click", function () {
  eduCon.style.display = "block";
  expCon.style.display = "none";
  skillCon.style.display = "none";
  pcon.style.display = "none";
  appgrid.style.display = "none";

  screen.style.background = "#4e2f63";
});

skillApp.addEventListener("click", function () {
  skillCon.style.display = "block";
  expCon.style.display = "none";
  eduCon.style.display = "none";
  pcon.style.display = "none";
  appgrid.style.display = "none";

  screen.style.background = "#4e2f63";
});

projects.addEventListener("click", function (event) {
  expCon.style.display = "none";
  eduCon.style.display = "none";
  skillCon.style.display = "none";
  pcon.style.display = "block";
  appgrid.style.display = "none";

  screen.style.background = "#4e2f63";
});

homeB.addEventListener("click", function (event) {
  expCon.style.display = "none";
  eduCon.style.display = "none";
  skillCon.style.display = "none";
  pcon.style.display = "none";
  appgrid.style.display = "grid";

  screen.style.background = "";
});




