const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const realItems = Array.from(document.querySelectorAll('.real-item[data-src]'));
let currentIndex = 0;

function openLightbox(idx) {
  currentIndex = idx;
  const item = realItems[idx];
  lightboxImg.src = item.dataset.src;
  lightboxImg.alt = item.dataset.caption || '';
  lightboxCaption.textContent = item.dataset.caption || '';
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function navigate(direction) {
  const next = (currentIndex + direction + realItems.length) % realItems.length;
  openLightbox(next);
}

realItems.forEach((item, i) => item.addEventListener('click', () => openLightbox(i)));
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
lightboxPrev.addEventListener('click', e => { e.stopPropagation(); navigate(-1); });
lightboxNext.addEventListener('click', e => { e.stopPropagation(); navigate(1); });

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') navigate(-1);
  if (e.key === 'ArrowRight') navigate(1);
});

// Touch swipe
let touchStartX = 0;
lightbox.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });
lightbox.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) navigate(dx < 0 ? 1 : -1);
});
