const audio = document.getElementById("audio");
const title = document.getElementById("title");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const playlistEl = document.getElementById("playlist");

const songs = [
  { title: "Summer Sadness", file: "Summertime Sadness.mp3" },
  { title: "Die with a Smile", file: "die with a smile.mp3" },
  { title: "Satha Sagaralu Dhati", file: "Sapta-Sagaralu-Dhaati.mp3" }
];

let songIndex = 0;

// Load the song into the player
function loadSong(index) {
  const song = songs[index];
  audio.src = song.file;
  title.textContent = song.title;
  updateActivePlaylist(index);
}
loadSong(songIndex);

// Toggle play/pause
function togglePlayPause() {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸️";
    title.classList.remove("paused");
  } else {
    audio.pause();
    playBtn.textContent = "▶️";
    title.classList.add("paused");
  }
}

playBtn.addEventListener("click", togglePlayPause);

// When music starts playing
audio.addEventListener("play", () => {
  title.classList.remove("paused");
});

// When music is paused
audio.addEventListener("pause", () => {
  title.classList.add("paused");
});

// Update progress bar
audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.value = percent;
});

// Seek through the track
progress.addEventListener("input", () => {
  audio.currentTime = (progress.value * audio.duration) / 100;
});

// Next song
function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
  audio.play();
  playBtn.textContent = "⏸️";
}

// Previous song
function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
  audio.play();
  playBtn.textContent = "⏸️";
}

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// Auto-play next song when current ends
audio.addEventListener("ended", nextSong);

// Generate playlist and attach click listeners
songs.forEach((song, idx) => {
  const li = document.createElement("li");
  li.textContent = song.title;
  li.addEventListener("click", () => {
    songIndex = idx;
    loadSong(songIndex);
    audio.play();
    playBtn.textContent = "⏸️";
  });
  playlistEl.appendChild(li);
});

// Highlight currently active song in playlist
function updateActivePlaylist(activeIndex) {
  const listItems = playlistEl.querySelectorAll("li");
  listItems.forEach((li, idx) => {
    li.classList.toggle("active", idx === activeIndex);
  });
}

// 🎹 Keyboard support
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" || e.code ==="MediaPlayPause") {
    e.preventDefault(); // avoid page scroll
    togglePlayPause();
  } else if (e.code === "ArrowRight" || e.code==="MediaTrackNext") {
    nextSong();
  } else if (e.code === "ArrowLeft" || e.code === "MediaTrackPrevious") {
    prevSong();
  }
});
