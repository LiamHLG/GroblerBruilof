document.addEventListener("DOMContentLoaded", () => {


  const weddingDate = new Date("2026-10-17T15:30:00");
const countdownEl = document.getElementById("countdown");

function updateCountdown() {
  const now = new Date();

  // Reset both times to midnight to compare dates, not hours
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weddingDay = new Date(
    weddingDate.getFullYear(),
    weddingDate.getMonth(),
    weddingDate.getDate()
  );

  const distance = weddingDay - today;
  const days = Math.ceil(distance / (1000 * 60 * 60 * 24));

  countdownEl.innerHTML = `${days} days to go!`;
}

updateCountdown();
setInterval(updateCountdown, 60 * 1000); 

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

const questions = [
  { q: "Wie het die eerste soen gegee?", answer: "Dani", hint: "Suprising, I know!" },
  { q: "Wie sê gereeld, eerste jammer?", answer: "Dani", hint: "Sy het meer om voor jammer te sê" },
  { q: "Wie is die romantiese een?", answer: "Dani", hint: "Sy's 'n rom-com girl." },
  { q: "Wie is die grappirige een?", answer: "Liam", hint: "Hy is die snaakste persoon wat sy ken!" },
  { q: "Wie is die geduldigste?", answer: "Liam", hint: "Hy wag... en wag... en wag." },
  { q: "Wie het eerste gesê 'ek is lief vir jou'?", answer: "Liam", hint: "If you know you know." },
  { q: "Wie kook die beste?", answer: "Dani", hint: "Maar leer hom mooi." },
  { q: "Wie neem die langste om gereed te maak?", answer: "Dani", hint: "Mooi dinge neem tyd!" },
  { q: "Wie vat die lankste om wakker te word?", answer: "Liam", hint: "Oggendmens? Nie almal nie." },
  { q: "Wie is meer kompeterend?", answer: "Dani", hint: "Cludo is die ergste!" },
  { q: "Wie het eerste van trou gepraat?", answer: "Liam", hint: "Is drie maande te vroeg??" },
  { q: "Wie gee die meeste geld uit?", answer: "Dani", hint: "Retail therapy." },
  { q: "Wie is die hardkoppigste?", answer: "Dani", hint: "Sy weet wat sy wil hê!" },
  { q: "Wie ry vinniger?", answer: "Liam", hint: "Hin hin vriendin!" }
];
 
let current = 0, score = 0, answered = false;
 
function render() {
  const area = document.getElementById('quiz-area');
  document.getElementById('progress').style.width = (current / questions.length * 100) + '%';
  if (current >= questions.length) { showResult(area); return; }
  const q = questions[current];
  area.innerHTML = `
    <div class="question-card">
      <p class="q-number">Vraag ${current + 1} van ${questions.length}</p>
      <p class="q-text">${q.q}</p>
      <div class="choices">
        <button class="choice-btn" onclick="choose('Liam')"><span class="avatar avatar-l">L</span> Liam</button>
        <button class="choice-btn" onclick="choose('Dani')"><span class="avatar avatar-d">D</span> Dani</button>
      </div>
      <div class="answer-row" id="answer-row"></div>
    </div>
    <div class="nav-row">
      <span class="counter" id="score-counter">Punte: ${score} / ${current}</span>
      <button class="next-btn" id="next-btn" onclick="next()">${current === questions.length - 1 ? 'Sien resultaat' : 'Volgende vraag'} &rarr;</button>
    </div>`;
  answered = false;
}
 
function choose(pick) {
  if (answered) return;
  answered = true;
  const q = questions[current];
  const correct = pick === q.answer;
  if (correct) score++;
  const btns = document.querySelectorAll('.choice-btn');
  btns.forEach(b => b.disabled = true);
  const chosen = pick === 'Liam' ? btns[0] : btns[1];
  const other = pick === 'Liam' ? btns[1] : btns[0];
  chosen.classList.add(correct ? 'selected-correct' : 'selected-wrong');
  other.classList.add('reveal-answer');
  document.getElementById('answer-row').innerHTML = correct
    ? `<span style="color:#3B6D11">✓ ${q.hint}</span>`
    : `<span style="color:#A32D2D">✗ Dit was ${q.answer}! ${q.hint}</span>`;
  document.getElementById('score-counter').textContent = `Punte: ${score} / ${current + 1}`;
  document.getElementById('next-btn').style.display = 'block';
}
 
function next() { current++; render(); }
 
function showResult(area) {
  document.getElementById('progress').style.width = '100%';
  const pct = Math.round(score / questions.length * 100);
  const msgs = [
    [90, "Kyk nou vir jou! Is jy seker jy is nie 'n derde wiel nie?"],
    [70, "So naby! Jy ken ons goed."],
    [50, "Jy ken dit wat saak maak, die res kan jy later leer."],
    [0,  "Who you? Proebeer weer!"]
  ];
  const msg = msgs.find(([min]) => pct >= min)[1];
  area.innerHTML = `
    <div class="result-card">
      <p style="font-size:34px;color:#888;margin:0 0 4px">Jou finale telling</p>
      <p class="result-score">${score}/${questions.length}</p>
      <p class="result-label">${pct}% reg</p>
      <p class="result-msg">${msg}</p>
      <button class="restart-btn" onclick="restart()">↺ Probeer weer</button>
    </div>`;
}
 
function restart() { current = 0; score = 0; answered = false; document.getElementById('progress').style.width = '0%'; render(); }
 
render();