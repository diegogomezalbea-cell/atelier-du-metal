window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('pageLoader');
    if (!loader) return;
    loader.classList.add('done');
    setTimeout(() => loader.remove(), 800);
  }, 1700);
});
