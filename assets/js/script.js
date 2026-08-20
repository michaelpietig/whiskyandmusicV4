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
var GEWINNSPIEL_LIVE = true; // auf true setzen, sobald die bezahlte Kampagne startet und das Gewinnspiel beworben werden soll
(function () {
  if (!GEWINNSPIEL_LIVE) return;
  var path = location.pathname.split('/').pop();
  if (path === 'gewinnspiel.html' || path === 'en-gewinnspiel.html') return;
  if (localStorage.getItem('wm_promo_dismissed_v1')) return;
  var isEn = document.documentElement.lang === 'en';
  var href = isEn ? 'en-gewinnspiel.html' : 'gewinnspiel.html';
  var banner = document.createElement('div');
  banner.className = 'promo-banner';
  banner.innerHTML = isEn
    ? '<div class="wrap"><div class="pb-text"><p class="pb-eyebrow">Giveaway</p><p class="pb-msg">Enter now for a chance to win one of three <b>exclusive 2026 experiences</b>.</p></div><div class="pb-actions"><a class="btn" href="' + href + '">Learn more &rarr;</a><button class="pb-close" type="button" aria-label="Close">&times;</button></div></div>'
    : '<div class="wrap"><div class="pb-text"><p class="pb-eyebrow">Gewinnspiel</p><p class="pb-msg">Jetzt eintragen und eines von drei <b>exklusiven Erlebnissen 2026</b> gewinnen.</p></div><div class="pb-actions"><a class="btn" href="' + href + '">Mehr erfahren &rarr;</a><button class="pb-close" type="button" aria-label="Schliessen">&times;</button></div></div>';
  document.body.appendChild(banner);
  setTimeout(function () { banner.classList.add('show'); }, 1200);
  banner.querySelector('.pb-close').addEventListener('click', function () {
    banner.classList.remove('show');
    localStorage.setItem('wm_promo_dismissed_v1', '1');
    setTimeout(function () { banner.remove(); }, 500);
  });
})();
var GWSP_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz_ks-4NAJWFFxm1pS5UGVvPfQUfIIdQnAdLEn7ExoMgzlQP_wHUv0X_Su3I1_dtc3x/exec';
(function () {
  var form = document.getElementById('gwsp-form');
  if (!form) return;
  var thanks = document.getElementById('gwsp-thanks');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var vorname = document.getElementById('gwsp-vorname').value.trim();
    var nachname = document.getElementById('gwsp-nachname').value.trim();
    var email = document.getElementById('gwsp-email').value.trim();
    var newsletter = document.getElementById('gwsp-newsletter').checked ? '1' : '0';
    if (!vorname || !nachname || !email) return;
    var url = GWSP_SCRIPT_URL + '?vorname=' + encodeURIComponent(vorname) +
      '&nachname=' + encodeURIComponent(nachname) +
      '&email=' + encodeURIComponent(email) +
      '&newsletter=' + newsletter;
    try { fetch(url, { mode: 'no-cors', keepalive: true }); } catch (err) {}
    form.hidden = true;
    thanks.hidden = false;
  });
})();