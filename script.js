let startBtn = document.getElementById("startBtn");
let resetBtn = document.getElementById("resetBtn");
let lapBtn = document.getElementById("lapBtn");

let display = document.getElementById("display");
let statusTxt = document.getElementById("status");
let laps = document.getElementById("laps");
let progress = document.getElementById("progress");

let startTime = 0;
let elapsed = 0;
let timer;
let running = false;
let lapCount = 0;

const circumference = 565;

/* FORMAT */
function format(ms) {
  let hours = Math.floor(ms / (1000 * 60 * 60));
  let minutes = Math.floor((ms / (1000 * 60)) % 60);
  let seconds = Math.floor((ms / 1000) % 60);
  let milliseconds = Math.floor((ms % 1000) / 10);

  return `${hours.toString().padStart(2,'0')}:` +
         `${minutes.toString().padStart(2,'0')}:` +
         `${seconds.toString().padStart(2,'0')}:` +
         `${milliseconds.toString().padStart(2,'0')}`;
}

/* UPDATE */
function update() {
  elapsed = Date.now() - startTime;
  display.innerText = format(elapsed);

  let progressValue = (elapsed % 1000) / 1000;
  progress.style.strokeDashoffset = circumference * (1 - progressValue);
}

/* START */
startBtn.onclick = () => {
  if (!running) {
    startTime = Date.now() - elapsed;
    timer = setInterval(update, 10);
    running = true;

    startBtn.innerText = "Pause";
    statusTxt.innerText = "Running";

  } else {
    clearInterval(timer);
    running = false;

    startBtn.innerText = "Start";
    statusTxt.innerText = "Paused";
  }
};

/* RESET */
resetBtn.onclick = () => {
  clearInterval(timer);
  running = false;
  elapsed = 0;
  lapCount = 0;

  display.innerText = "00:00:00:00";
  laps.innerHTML = "";
  progress.style.strokeDashoffset = circumference;

  statusTxt.innerText = "Ready";
  startBtn.innerText = "Start";
};

/* LAP */
lapBtn.onclick = () => {
  if (!running) return;

  lapCount++;
  let div = document.createElement("div");
  div.className = "lap";
  div.innerText = `Lap ${lapCount}: ${format(elapsed)}`;
  laps.prepend(div);
};

/* CREATE PERFECT TICKS */
let ticksContainer = document.querySelector(".ticks");

for (let i = 0; i < 60; i++) {
  let tick = document.createElement("div");

  let angle = i * 6;
  let radius = 115;

  tick.style.transform = `
    rotate(${angle}deg)
    translate(0, -${radius}px)
  `;

  if (i % 5 === 0) {
    tick.style.height = "14px";
    tick.style.background = "#6c63ff";
  }

  ticksContainer.appendChild(tick);
}