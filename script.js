
/* =================================
   PERSONALIZATION
================================= */

const CONFIG = {
  name: "My Love",

  // Ganti dengan tanggal awal hubungan
  relationshipStart: "2025-01-01T00:00:00"
};

/* OPENING */

function enterWebsite() {
  const opening = document.getElementById("opening");

  opening.style.opacity = "0";

  setTimeout(() => {
    opening.style.display = "none";
  }, 1000);

  confetti();
}

/* LOVE COUNTER */

function updateLoveCounter() {
  const start = new Date(CONFIG.relationshipStart);
  const now = new Date();

  const distance = Math.max(0, now - start);

  const days = Math.floor(distance / 86400000);
  const hours = Math.floor(distance / 3600000) % 24;
  const minutes = Math.floor(distance / 60000) % 60;
  const seconds = Math.floor(distance / 1000) % 60;

  document.getElementById("loveDays").textContent = days;
  document.getElementById("loveHours").textContent = hours;
  document.getElementById("loveMinutes").textContent = minutes;
  document.getElementById("loveSeconds").textContent = seconds;
}

updateLoveCounter();
setInterval(updateLoveCounter, 1000);

/* PHOTO UPLOAD */

document.getElementById("photoUpload")
.addEventListener("change", function(e) {

  Array.from(e.target.files).forEach(file => {

    if (!file.type.startsWith("image/")) return;

    const url = URL.createObjectURL(file);

    const card = document.createElement("div");
    card.className = "photo-card";

    const img = document.createElement("img");
    img.src = url;
    img.alt = "Our memory";

    const caption = document.createElement("div");
    caption.className = "caption";
    caption.textContent = "Our New Memory ♡";

    const date = document.createElement("div");
    date.className = "date";
    date.textContent = "A special moment";

    card.append(img, caption, date);

    document.getElementById("photoGrid").append(card);
  });

  e.target.value = "";
});

/* VIDEO UPLOAD */

document.getElementById("videoUpload")
.addEventListener("change", function(e) {

  Array.from(e.target.files).forEach(file => {

    if (!file.type.startsWith("video/")) return;

    const url = URL.createObjectURL(file);

    const card = document.createElement("div");
    card.className = "video-card";

    const video = document.createElement("video");
    video.src = url;
    video.controls = true;
    video.preload = "metadata";

    const title = document.createElement("h3");
    title.textContent = "Our New Video ♡";

    const description = document.createElement("p");
    description.textContent = "A beautiful moment together";

    card.append(video, title, description);

    document.getElementById("videoGrid").append(card);
  });

  e.target.value = "";
});

/* LOVE LETTER */

function openLetter() {
  const content = document.getElementById("letterContent");

  content.style.display =
    content.style.display === "block" ? "none" : "block";

  if (content.style.display === "block") {
    confetti();
  }
}

/* BIRTHDAY CAKE */

function blowCandle() {

  document.getElementById("cake").textContent = "🍰";

  document.getElementById("cakeText").textContent =
    "YAYYYY! MAKE YOUR WISH COME TRUE!";

  document.getElementById("cakeDescription").textContent =
    "Semoga semua harapan indahmu menjadi kenyataan! 💗";

  confetti();
}

/* SURPRISE */

function showSurprise() {

  document.getElementById("surpriseMessage").innerHTML =
    "💗 Surprise! 💗<br><br>" +
    "Kalau aku bisa memberikan satu hal untukmu, " +
    "aku ingin memberikan seribu alasan untuk tersenyum. " +
    "Teruslah bahagia, teruslah bermimpi, dan semoga " +
    "hari-harimu selalu dipenuhi hal-hal indah. " +
    "<br><br>YOU ARE SO SPECIAL! 🎀";

  confetti();
}

/* FLOATING DECORATION */

const symbols = ["♡", "💗", "🎀", "✿", "✨", "💕"];

function floating() {

  const element = document.createElement("div");

  element.className = "floating";

  element.textContent =
    symbols[Math.floor(Math.random() * symbols.length)];

  element.style.left = Math.random() * 100 + "vw";
  element.style.fontSize = (15 + Math.random() * 20) + "px";
  element.style.color = "#a94469";

  document.body.append(element);

  setTimeout(() => element.remove(), 7000);
}

setInterval(floating, 900);

/* CONFETTI */

function confetti() {

  const items = ["💗", "🎀", "✨", "💕", "🌸", "♡"];

  for (let i = 0; i < 45; i++) {

    const el = document.createElement("div");

    el.textContent =
      items[Math.floor(Math.random() * items.length)];

    el.style.position = "fixed";
    el.style.top = "-30px";
    el.style.left = Math.random() * 100 + "vw";
    el.style.fontSize = "20px";
    el.style.zIndex = "9999";
    el.style.pointerEvents = "none";

    document.body.append(el);

    const duration = 2000 + Math.random() * 2500;

    el.animate([
      {
        transform: "translateY(0) rotate(0)",
        opacity: 1
      },
      {
        transform: "translateY(110vh) rotate(500deg)",
        opacity: 0
      }
    ], {
      duration: duration,
      easing: "ease-in"
    });

    setTimeout(() => el.remove(), duration);
  }
}

/* BACKGROUND MUSIC */

let audio;
let musicOn = false;
let musicTimer;

function toggleMusic() {

  const button = document.getElementById("musicBtn");

  if (!audio) {
    audio = new (
      window.AudioContext || window.webkitAudioContext
    )();
  }

  if (!musicOn) {

    audio.resume();
    musicOn = true;

    const notes = [
      523, 659, 784, 659,
      587, 698, 784, 659
    ];

    let i = 0;

    musicTimer = setInterval(() => {

      if (!musicOn) return;

      const osc = audio.createOscillator();
      const gain = audio.createGain();

      osc.type = "sine";
      osc.frequency.value = notes[i % notes.length];

      gain.gain.setValueAtTime(.06, audio.currentTime);

      gain.gain.exponentialRampToValueAtTime(
        .001,
        audio.currentTime + .5
      );

      osc.connect(gain);
      gain.connect(audio.destination);

      osc.start();
      osc.stop(audio.currentTime + .5);

      i++;

    }, 550);

    button.textContent = "♫ MUSIC ON";

  } else {

    musicOn = false;

    clearInterval(musicTimer);

    button.textContent = "♫ MUSIC OFF";
  }
}
