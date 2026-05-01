/* ========================================================
   script.js — Portfolio Interactions
   ======================================================== */

// ── 1. Contact Form Validation ──────────────────────────
document.getElementById('sendBtn').addEventListener('click', function () {
  const name    = document.getElementById('contactName').value.trim();
  const email   = document.getElementById('contactEmail').value.trim();
  const message = document.getElementById('contactMsg').value.trim();
  const feedback = document.getElementById('formFeedback');

  // Simple validation
  if (!name || !email || !message) {
    feedback.style.color = '#e05c5c';
    feedback.textContent = '⚠️ Please fill in all fields before sending.';
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    feedback.style.color = '#e05c5c';
    feedback.textContent = '⚠️ Please enter a valid email address.';
    return;
  }

  // Success
  feedback.style.color = '#4caf50';
  feedback.textContent = `✅ Thanks, ${name}! Your message has been sent.`;

  // Reset
  document.getElementById('contactName').value  = '';
  document.getElementById('contactEmail').value = '';
  document.getElementById('contactMsg').value   = '';
});

// ── 2. Scroll-Reveal Effect ──────────────────────────────
const revealElements = document.querySelectorAll(
  '.section-title, .skill-card, .project-card, .about-text, .info-list, .contact-form-wrap, .hero-name, .hero-role, .hero-bio, .btn-primary-custom'
);

revealElements.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach(el => observer.observe(el));

// ── 3. Progress Bar Animation on scroll ─────────────────
const progressBars = document.querySelectorAll('.progress-bar');

const progressObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const value = bar.getAttribute('data-value') + '%';
        bar.style.width = value;
        progressObserver.unobserve(bar);
      }
    });
  },
  { threshold: 0.5 }
);

progressBars.forEach(bar => progressObserver.observe(bar));

// ── 4. Smooth Navbar Highlight ───────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = 'var(--accent)';
    }
  });
});

// ── 5. Hero Avatar bounce on click ──────────────────────
const avatar = document.querySelector('.avatar-wrapper');
if (avatar) {
  avatar.style.cursor = 'pointer';
  avatar.addEventListener('click', () => {
    avatar.style.transform = 'scale(1.1) rotate(-3deg)';
    setTimeout(() => { avatar.style.transform = ''; }, 300);
    avatar.style.transition = 'transform 0.3s cubic-bezier(.4,0,.2,1)';
  });
}
