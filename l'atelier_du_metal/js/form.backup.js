const form = document.querySelector('.contact-form');
if (!form) return;

const btn = form.querySelector('.form-submit');
const requiredFields = form.querySelectorAll('[required]');

function validateForm() {
  let valid = true;
  requiredFields.forEach(field => {
    const isEmpty = !field.value.trim();
    field.classList.toggle('error', isEmpty);
    if (isEmpty) valid = false;
  });
  return valid;
}

// Clear error state on input
requiredFields.forEach(field => {
  field.addEventListener('input', () => field.classList.remove('error'));
});

form.addEventListener('submit', e => {
  e.preventDefault();

  if (!validateForm()) return;

  btn.textContent = '✓ Message envoyé !';
  btn.style.background = '#2D7A4F';
  btn.style.color = '#fff';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = 'Envoyer ma demande →';
    btn.style.background = '';
    btn.style.color = '';
    btn.disabled = false;
    form.reset();
    requiredFields.forEach(f => f.classList.remove('error'));
  }, 3000);
});
