const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => tab.addEventListener('click', () => {
  tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
  document.querySelectorAll('.day').forEach(d => d.classList.remove('active'));
  tab.setAttribute('aria-selected', 'true');
  document.getElementById(tab.getAttribute('aria-controls')).classList.add('active');
}));
const navEl = document.querySelector('.nav');
const navToggle = document.querySelector('.nav-toggle');
if (navEl && navToggle) {
  navToggle.addEventListener('click', () => {
    const open = navEl.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('.mobile-nav a').forEach(a => a.addEventListener('click', () => {
    navEl.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));
}
document.querySelectorAll('.mc-toggle').forEach(btn => {
  const more = btn.previousElementSibling;
  btn.addEventListener('click', () => {
    const open = more.hasAttribute('hidden');
    if (open) { more.removeAttribute('hidden'); } else { more.setAttribute('hidden',''); }
    btn.setAttribute('aria-expanded', String(open));
    btn.innerHTML = open ? 'Weniger anzeigen &uarr;' : 'Weiterlesen &rarr;';
  });
});
const impressImgs = Array.from(document.querySelectorAll('.impress-tile img'));
if (impressImgs.length) {
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML = '<button class="lightbox-close" type="button" aria-label="Schliessen">&times;</button>' +
    '<button class="lightbox-nav lightbox-prev" type="button" aria-label="Zurück">&larr;</button>' +
    '<img alt="">' +
    '<button class="lightbox-nav lightbox-next" type="button" aria-label="Weiter">&rarr;</button>' +
    '<div class="lightbox-counter"></div>';
  document.body.appendChild(lb);
  const lbImg = lb.querySelector('img');
  const counter = lb.querySelector('.lightbox-counter');
  let idx = 0;
  function lbShow(i) {
    idx = (i + impressImgs.length) % impressImgs.length;
    lbImg.src = impressImgs[idx].src;
    lbImg.alt = impressImgs[idx].alt;
    counter.textContent = (idx + 1) + ' / ' + impressImgs.length;
  }
  function lbOpen(i) {
    lbShow(i);
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function lbClose() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }
  impressImgs.forEach((img, i) => img.addEventListener('click', () => lbOpen(i)));
  lb.querySelector('.lightbox-close').addEventListener('click', lbClose);
  lb.querySelector('.lightbox-prev').addEventListener('click', () => lbShow(idx - 1));
  lb.querySelector('.lightbox-next').addEventListener('click', () => lbShow(idx + 1));
  lb.addEventListener('click', (e) => { if (e.target === lb) lbClose(); });
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') lbClose();
    if (e.key === 'ArrowLeft') lbShow(idx - 1);
    if (e.key === 'ArrowRight') lbShow(idx + 1);
  });
}