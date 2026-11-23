(() => {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const TO = 'latelierdumetal.bygomez@gmail.com';
  const btn = form.querySelector('.form-submit');
  const requiredFields = form.querySelectorAll('[required]');
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateForm() {
    let valid = true;
    requiredFields.forEach(field => {
      const v = field.value.trim();
      const min = Number(field.getAttribute('minlength')) || 0;
      const bad = !v || v.length < min || (field.type === 'email' && !emailRe.test(v));
      field.classList.toggle('error', bad);
      if (bad) valid = false;
    });
    return valid;
  }

  requiredFields.forEach(field => {
    field.addEventListener('input', () => field.classList.remove('error'));
    field.addEventListener('change', () => field.classList.remove('error'));
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validateForm()) {
      const first = form.querySelector('.error');
      if (first) first.focus();
      return;
    }

    const val = name => (form.elements[name]?.value || '').trim();
    const typeSel = form.elements.projectType;
    const type = typeSel.options[typeSel.selectedIndex]?.text || '';

    const subject = `Demande de devis — ${type} — ${val('firstName')} ${val('lastName')}`;
    const body = [
      `Nom : ${val('firstName')} ${val('lastName')}`,
      `Email : ${val('email')}`,
      `Téléphone : ${val('phone') || '—'}`,
      `Entreprise : ${val('company') || '—'}`,
      `Type de projet : ${type}`,
      '',
      'Description du projet :',
      val('message'),
    ].join('\n');

    window.location.href =
      `mailto:${TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    btn.textContent = 'Votre messagerie s’ouvre…';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Envoyer ma demande →';
      btn.disabled = false;
    }, 4000);
  });
})();
