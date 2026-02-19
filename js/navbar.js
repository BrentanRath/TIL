(function () {
  var isInSubdir = window.location.pathname.split('/').filter(Boolean).length > 1;
  var tilHref = isInSubdir ? '../index.html' : 'index.html';

  var nav = document.getElementById('site-navbar');
  if (!nav) return;

  nav.className = 'site-navbar';
  nav.innerHTML =
    '<a href="#">Blog</a>' +
    '<a href="' + tilHref + '">TIL</a>' +
    '<a href="#">Portfolio</a>';
})();
