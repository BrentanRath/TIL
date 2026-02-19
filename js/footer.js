(function () {
  var segments = window.location.pathname.split('/').filter(Boolean);
  var depth = Math.max(0, segments.length - 1);
  var homeHref = depth > 0 ? '../'.repeat(depth) + 'index.html' : 'index.html';
  var config = {
    name: 'Brentan Rath',
    email: 'brentanrath@gmail.com',
    homeHref: homeHref
  };

  var footer = document.getElementById('site-footer');
  if (!footer) return;

  footer.className = 'site-footer';
  footer.innerHTML =
    '<div class="footer-section">' +
    'made by <a href="mailto:' + config.email + '">' + config.name + '</a> &middot; ' +
    '<a href="mailto:' + config.email + '">mail</a> &middot; ' +
    '<a href="' + config.homeHref + '">home</a>' +
    '</div>';
})();
