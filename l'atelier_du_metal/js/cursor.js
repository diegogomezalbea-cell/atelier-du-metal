const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let cx = 0, cy = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  cx = e.clientX;
  cy = e.clientY;
});

function animateCursor() {
  rx += (cx - rx) * 0.12;
  ry += (cy - ry) * 0.12;
  cursor.style.left = cx + 'px';
  cursor.style.top = cy + 'px';
  cursorRing.style.left = rx + 'px';
  cursorRing.style.top = ry + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

const hoverTargets = 'a, button, .real-item, .sf-feature, .val-card, .laser-spec, .proc-step';
document.querySelectorAll(hoverTargets).forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hovered');
    cursorRing.classList.add('hovered');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hovered');
    cursorRing.classList.remove('hovered');
  });
});
