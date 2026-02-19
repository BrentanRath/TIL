(function () {
  var config = {
    name: 'Brentan Rath',
    email: 'brentanrath@gmail.com',
    homeHref: '../index.html'
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
