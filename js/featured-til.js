(function () {
  const container = document.getElementById('featured-til-list');
  if (!container) return;

  async function load() {
    try {
      const res = await fetch('featured-til.json');
      const data = await res.json();
      const items = data.featured || [];

      const tilBySlug = {};
      if (typeof TIL_DATA !== 'undefined') {
        TIL_DATA.forEach((t) => { tilBySlug[t.slug] = t; });
      }

      let html = '<div class="featured-til-list">';
      items.forEach((item) => {
        const slug = typeof item === 'string' ? item : (item.slug || '');
        const customPreview = typeof item === 'object' ? item.preview : null;
        const til = tilBySlug[slug];
        const href = 'til/' + slug + '.html';
        const title = til ? til.title : slug;
        const preview = customPreview || (til && til.description) || '';
        const escapedPreview = (preview || '').replace(/</g, '&lt;').replace(/"/g, '&quot;');
        html += '<a href="' + href + '" class="featured-card"><span class="featured-card-title">' + title + '</span>' + (escapedPreview ? '<span class="featured-card-preview">' + escapedPreview + '</span>' : '') + '</a>';
      });
      html += '</div>';

      container.innerHTML = html;
    } catch (_) {
      container.innerHTML = '';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', load);
  } else {
    load();
  }
})();
