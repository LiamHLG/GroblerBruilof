document.addEventListener("DOMContentLoaded", () => {

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

    const params = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      attendance: document.getElementById("attendance").value,
      message: document.getElementById("message").value
    };

    emailjs.send("service_kbxfxac", "template_ihkr5oc", params)
      .then(() => {
        document.getElementById("successMsg").innerText =
          "Thank you " + params.name + "! Your RSVP has been sent successfully 💖";
        e.target.reset();
      })
      .catch(err => console.error("EmailJS Error:", err));
  });

});
