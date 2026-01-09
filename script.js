document.addEventListener("DOMContentLoaded", () => {

  const weddingDate = new Date("Oct 17, 2026 00:00:00").getTime();
  const countdownEl = document.getElementById("countdown");

  setInterval(() => {
    const now = new Date().getTime();
    const distance = weddingDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    countdownEl.innerHTML = days + " days to go!";
  }, 1000);

  document.getElementById("rsvpForm").addEventListener("submit", e => {
    e.preventDefault();

    const params = {
      name: document.getElementById("name").value,
      metgesel: document.getElementById("metgesel").value,
      attendance: document.getElementById("attendance").value,
      dieetvereistes: document.getElementById("dieetvereistes").value,
      liedjie: document.getElementById("liedjie").value,
      message: document.getElementById("message").value
    };

    emailjs.send("service_kbxfxac", "template_ihkr5oc", params)
      .then(() => {
        document.getElementById("successMsg").innerText =
          "Thank you " + params.name + "! Your RSVP has been sent successfully !";
        e.target.reset();
      })
      .catch(err => console.error("EmailJS Error:", err));
  });

  const hero = document.querySelector(".hero");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const heroHeight = hero.offsetHeight;

    // Fade out as user scrolls down
    let opacity = 1 - scrollY / heroHeight;
    if (opacity < 0) opacity = 0;
    hero.style.opacity = opacity;
  });

  // Fade in image container on scroll, similar to hero fade
  const imageContainer = document.querySelector('.image-container');
  if (imageContainer) {
    const imageTop = imageContainer.offsetTop;
    const fadeDistance = window.innerHeight; // Fade over viewport height

    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      let opacity = (scrollY - (imageTop - window.innerHeight)) / fadeDistance;
      if (opacity < 0) opacity = 0;
      if (opacity > 1) opacity = 1;
      imageContainer.style.opacity = opacity;
    });
  }

});
