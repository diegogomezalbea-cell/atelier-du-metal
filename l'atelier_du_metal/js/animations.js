// ── Scroll reveal ──
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

reveals.forEach(r => revealObserver.observe(r));

// Trigger elements already in viewport on load
setTimeout(() => {
  reveals.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.classList.add('visible');
    }
  });
}, 50);

// ── Count-up animation ──
function countUp(el, target, duration = 1800) {
  const textNode = el.childNodes[0];
  let start = null;

  const step = ts => {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    textNode.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else textNode.textContent = target;
  };
  requestAnimationFrame(step);
}

const statNums = document.querySelectorAll('.stat-num');
const statTargets = [20, 500, 100];

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const idx = Array.from(statNums).indexOf(e.target);
      countUp(e.target, statTargets[idx]);
      statsObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(n => statsObserver.observe(n));
