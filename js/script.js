

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
let about = document.getElementById("aboutme");
let projects = document.getElementById("projectspage");
let journal = document.getElementById("journalpage");


let acon = document.getElementById("aboutC");
acon.style.display = "none";

let pcon = document.getElementById("projectsC");
pcon.style.display = "none";


// UNCOMMENT LATER!!

about.addEventListener("click", function (event) {
  acon.style.display = "block";
  appgrid.style.display = "none";

  screen.style.background = "gray";
});

projects.addEventListener("click", function (event) {
  pcon.style.display = "block"
  appgrid.style.display = "none";

  screen.style.background = "#4e2f63";
});

homeB.addEventListener("click", function (event) {
  acon.style.display = "none";
  pcon.style.display = "none";
  appgrid.style.display = "grid";

  screen.style.background = "";
});




