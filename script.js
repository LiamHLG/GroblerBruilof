const weddingDate = new Date("Oct 17, 2026 15:00:00").getTime();
const countdownEl = document.getElementById("countdown");

setInterval(() => {
  const now = new Date().getTime();
  const distance = weddingDate - now;
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  countdownEl.innerHTML = days + " days to go";
}, 1000);

document.getElementById("rsvpForm").addEventListener("submit", e => {
  e.preventDefault();
  document.getElementById("successMsg").innerText =
    "Thank you for your response! We can’t wait to celebrate with you!";
  e.target.reset();
});
