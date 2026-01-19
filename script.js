document.addEventListener("DOMContentLoaded", () => {

const envelope = document.querySelector(".full-envelope");
const intro = document.getElementById("envelope-intro");
const seal = document.querySelector(".wax-seal");

seal.addEventListener("click", () => {
  // Crack the wax
  seal.classList.add("crack");

  // Open envelope AFTER crack animation
  setTimeout(() => {
    envelope.classList.add("open");
  }, 700);

  // Fade intro out
  setTimeout(() => {
    intro.classList.add("fade-out");
  }, 1300);
});



  const weddingDate = new Date("Oct 17, 2026 15:30:00").getTime();
  const countdownEl = document.getElementById("countdown");

  setInterval(() => {
    const now = new Date().getTime();
    const distance = weddingDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    countdownEl.innerHTML = days + " days to go!";
  }, 1000);

  document.getElementById("rsvpForm").addEventListener("submit", e => {
    e.preventDefault();

    // Prevent duplicate submissions
    const submitBtn = e.target.querySelector('button[type="submit"]');
    if (submitBtn && submitBtn.dataset.sending === 'true') return;
    if (submitBtn) {
      submitBtn.dataset.sending = 'true';
      submitBtn.disabled = true;
      const originalText = submitBtn.innerText;
      submitBtn.innerText = 'Sending...';
      // store original text so we can restore it later
      submitBtn.dataset.originalText = originalText;
    }

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
        // restore button state
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.dataset.sending = 'false';
          submitBtn.innerText = submitBtn.dataset.originalText || 'Send RSVP';
          delete submitBtn.dataset.originalText;
        }
      })
      .catch(err => {
        console.error("EmailJS Error:", err);
        // restore button state on error as well
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.dataset.sending = 'false';
          submitBtn.innerText = submitBtn.dataset.originalText || 'Send RSVP';
          delete submitBtn.dataset.originalText;
        }
      });
  });

  // Hamburger menu toggle
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  // Close menu when clicking a link
  navMenu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      navMenu.classList.remove('open');
    }
  });

  const hero = document.querySelector(".hero");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const heroHeight = hero.offsetHeight;

    // Fade out as user scrolls down
    let opacity = 1 - scrollY / heroHeight;
    if (opacity < 0) opacity = 0;
    hero.style.opacity = opacity;

    // Change hamburger button color when scrolling past hero
    if (scrollY > heroHeight) {
      hamburger.classList.add('scrolled');
    } else {
      hamburger.classList.remove('scrolled');
    }
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
