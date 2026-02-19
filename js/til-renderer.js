(function () {
  const article = document.getElementById('til-article');
  if (!article) return;

  function getSlugFromPath() {
    const segments = window.location.pathname.split('/').filter(Boolean);
    const tilIdx = segments.indexOf('til');
    if (tilIdx >= 0 && tilIdx < segments.length - 1) {
      return segments[tilIdx + 1];
    }
    const match = window.location.pathname.match(/\/til\/([^/]+)\/?/);
    return match ? match[1] : null;
  }

  function parseFrontmatter(md) {
    const m = md.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!m) return { body: md, meta: null };
    const meta = {};
    m[1].split('\n').forEach(function (line) {
      const kv = line.match(/^(\w+):\s*(.+)$/);
      if (kv) meta[kv[1]] = kv[2].trim();
    });
    return { body: m[2], meta };
  }

  function getTilMeta(slug) {
    if (typeof TIL_DATA === 'undefined') return null;
    for (let i = 0; i < TIL_DATA.length; i++) {
      if (TIL_DATA[i].slug === slug) return TIL_DATA[i];
    }
    return null;
  }

  function addTargetBlankToExternalLinks(container) {
    const links = container.querySelectorAll('a[href^="http"]');
    links.forEach(function (a) {
      const href = a.getAttribute('href') || '';
      if (href.indexOf(window.location.origin) !== 0) {
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener noreferrer');
      }
    });
  }

  function run() {
    const slug = getSlugFromPath();
    if (!slug) {
      article.innerHTML = '<p>TIL not found.</p>';
      return;
    }

    const tilData = getTilMeta(slug);
    if (tilData) {
      document.title = 'TIL: ' + tilData.title;
    }

    fetch('content.md')
      .then(function (r) {
        if (!r.ok) throw new Error('Not found');
        return r.text();
      })
      .then(function (md) {
        const parsed = parseFrontmatter(md);
        const body = parsed.body;

        if (typeof marked === 'undefined') {
          article.innerHTML = '<p>Markdown library not loaded.</p>';
          return;
        }

        marked.setOptions({ gfm: true });
        const rendered = marked.parse(body);

        let title = (parsed.meta && parsed.meta.title) || (tilData && tilData.title) || 'TIL';
        const date = (parsed.meta && parsed.meta.date) || (tilData && tilData.date) || '';
        const category = (parsed.meta && parsed.meta.category) || (tilData && tilData.category) || '';
        const tags = (parsed.meta && parsed.meta.tags)
          ? (typeof parsed.meta.tags === 'string' ? parsed.meta.tags.split(/,\s*/) : parsed.meta.tags)
          : (tilData && tilData.tags) || [];
        const tagStr = Array.isArray(tags) ? tags.join(', ') : tags;

        let metaHtml = '';
        if (date || category || tagStr) {
          const parts = [date, category, tagStr].filter(Boolean);
          metaHtml = '<p class="meta">' + parts.join(' &middot; ') + ' &middot; <span id="view-count"></span></p>';
        } else {
          metaHtml = '<p class="meta"><span id="view-count"></span></p>';
        }

        article.innerHTML = '<h1>' + title.replace(/</g, '&lt;') + '</h1>' + metaHtml + rendered;
        addTargetBlankToExternalLinks(article);
        if (window.TIL_VIEWS && window.TIL_VIEWS.recordAndShow) {
          window.TIL_VIEWS.recordAndShow(slug, document.getElementById('view-count'));
        }
      })
      .catch(function () {
        article.innerHTML = '<p>TIL not found.</p>';
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
