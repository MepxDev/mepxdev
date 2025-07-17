// Smooth scroll
document.querySelectorAll('nav a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Theme toggle
const toggle = document.getElementById('theme-toggle');
toggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
});

// Contact form validation
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
form.addEventListener('submit', e => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  if (!name || !email || !message) {
    status.textContent = 'Please fill all fields.';
    status.style.color = 'red';
    return;
  }
  status.textContent = 'Thanks for reaching out!';
  status.style.color = 'green';
  form.reset();
});
