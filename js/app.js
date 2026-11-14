/* Mi Motor Ecuador — portada. La compra y la búsqueda de tickets siguen en la tienda WooCommerce. */
(function () {
  'use strict';
  var d = document, root = d.documentElement;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };

  /* ===== Datos del sorteo (cambiar aquí o, más adelante, desde el panel) ===== */
  var BENDECIDOS = ['04827', '11111', '26394', '33333', '45182', '55555', '67421', '77777', '82946', '99999',
    '18463', '22222', '39671', '44444', '66666', '88888', '95724', '31685', '73158', '51839'];
  var ul = $('#nums');
  if (ul) BENDECIDOS.forEach(function (n, i) {
    var li = d.createElement('li'); li.style.setProperty('--i', i);
    li.innerHTML = '<b></b><small>Premio de $250</small>'; li.firstChild.textContent = n;
    ul.appendChild(li);
  });
  var y = $('#y'); if (y) y.textContent = new Date().getFullYear();

  /* ===== Otra cantidad de tickets ===== */
  var q = $('#qty');
  $('#moref').addEventListener('submit', function (e) {
    var v = Math.round(+q.value);
    if (!(v >= 1)) { e.preventDefault(); q.focus(); return; }
    q.value = v;
  });

  /* ===== Animaciones: arrancan con la primera interacción ===== */
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var started = false;
  function start() {
    if (started || reduce) return;
    started = true;
    root.classList.add('go');
    reveal(); countPct();
  }
  ['pointerdown', 'touchstart', 'keydown', 'scroll', 'wheel'].forEach(function (ev) {
    window.addEventListener(ev, start, { once: true, passive: true });
  });

  function reveal() {
    if (!('IntersectionObserver' in window)) return;
    var vh = window.innerHeight;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('vis'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    $$('.rv').forEach(function (el) {
      if (el.getBoundingClientRect().top < vh) el.classList.add('vis'); else io.observe(el);
    });
  }

  function countPct() {
    var el = $('#pct'); if (!el) return;
    var end = +el.getAttribute('data-p'), bar = $('.prog'), t0 = performance.now();
    (function step(t) {
      var k = Math.min(1, (t - t0) / 1600), v = end * (1 - Math.pow(1 - k, 3));
      el.textContent = v.toFixed(2).replace('.', ',') + ' %';
      bar.style.setProperty('--p', v + '%');
      if (k < 1) requestAnimationFrame(step);
    })(t0);
  }

  /* ===== Aviso de cookies (esta portada no usa cookies de seguimiento) ===== */
  var KEY = 'mm-aviso', seen = false;
  try { seen = localStorage.getItem(KEY) === '1'; } catch (e) { }
  if (!seen) setTimeout(function () {
    var bx = d.createElement('div');
    bx.className = 'ck'; bx.setAttribute('role', 'region'); bx.setAttribute('aria-label', 'Aviso de cookies');
    bx.innerHTML = '<p>Esta página no usa cookies de publicidad. Al comprar pasas a la tienda, que usa cookies necesarias para el carrito y el pago.</p><button type="button" class="btn btn-gold">Entendido</button>';
    bx.querySelector('button').addEventListener('click', function () { try { localStorage.setItem(KEY, '1'); } catch (e) { } bx.remove(); });
    d.body.appendChild(bx);
  }, 1800);
})();
