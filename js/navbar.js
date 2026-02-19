(function () {
  var segments = window.location.pathname.split('/').filter(Boolean);
  var depth = Math.max(0, segments.length - 1);
  var tilHref = depth > 0 ? '../'.repeat(depth) + 'index.html' : 'index.html';

  var nav = document.getElementById('site-navbar');
  if (!nav) return;

  nav.className = 'site-navbar';
  nav.innerHTML =
    '<a href="#">Blog</a>' +
    '<a href="' + tilHref + '">TIL</a>' +
    '<a href="#">Portfolio</a>';
})();
