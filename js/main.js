(function () {
  let tils, tags;

  function parseDate(str) {
    return new Date(str);
  }

  function sortByDate(tils) {
    return [...tils].sort((a, b) => parseDate(b.date) - parseDate(a.date));
  }

  function collectTags(tils) {
    const set = new Set();
    tils.forEach((til) => (til.tags || []).forEach((t) => set.add(t)));
    return [...set].sort();
  }

  function renderTilCard(til, views) {
    const tagStr = (til.tags || []).join(',');
    const searchText = (til.title + ' ' + (til.description || '') + ' ' + (til.category || '') + ' ' + tagStr).toLowerCase();
    const viewCount = views[til.slug] || 0;
    const viewLabel = viewCount ? ' &middot; ' + viewCount + ' view' + (viewCount !== 1 ? 's' : '') : '';
    return '<a href="til/' + til.slug + '.html" class="til-card" data-tags="' + tagStr + '" data-search="' + searchText.replace(/"/g, '&quot;') + '"><span class="til-head">' + til.date + viewLabel + '</span><span class="til-body"><strong>' + til.title + '</strong>' + (til.description ? '<span class="desc"> &mdash; ' + til.description + '</span>' : '') + '<span class="tags"> ' + tagStr.replace(/,/g, ', ') + '</span></span></a>';
  }

  function buildHTML(views) {
    views = views || {};
    const tagFilter = document.getElementById('tag-filter');
    const container = document.getElementById('til-container');

    tagFilter.innerHTML = '<span class="tag-btn active" data-tag="*">all</span>';
    tags.forEach((tag) => {
      const span = document.createElement('span');
      span.className = 'tag-btn';
      span.dataset.tag = tag;
      span.textContent = tag;
      tagFilter.appendChild(span);
    });

    const sortedTils = sortByDate(tils);
    let html = '<section class="til-section til-section-date" data-view="date"><h2>Recent</h2>';
    sortedTils.forEach((til) => {
      html += renderTilCard(til, views);
    });
    html += '</section>';

    container.innerHTML = html;
  }

  function applyFilters() {
    const searchEl = document.getElementById('search');
    const searchVal = (searchEl ? searchEl.value : '').trim().toLowerCase();
    const activeTag = (document.querySelector('#tag-filter .tag-btn.active') || {}).dataset?.tag || '*';

    document.querySelectorAll('.til-card').forEach((card) => {
      const tagMatch = activeTag === '*' || (card.dataset.tags || '').split(',').includes(activeTag);
      const searchMatch = !searchVal || (card.dataset.search || '').indexOf(searchVal) >= 0;
      card.style.display = tagMatch && searchMatch ? '' : 'none';
    });

    document.querySelectorAll('.til-section').forEach((section) => {
      const cards = section.querySelectorAll('.til-card');
      const visible = [...cards].some((c) => c.style.display !== 'none');
      section.style.display = visible ? '' : 'none';
    });
  }

  function initTagFilter() {
    document.getElementById('tag-filter').addEventListener('click', (e) => {
      const btn = e.target.closest('.tag-btn');
      if (!btn) return;
      document.querySelectorAll('#tag-filter .tag-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilters();
    });
  }

  function initSearch() {
    const searchEl = document.getElementById('search');
    if (searchEl) searchEl.addEventListener('input', applyFilters);
  }

  function initNextSection() {
    const btn = document.getElementById('next-section-btn');
    if (!btn) return;

    let currentIdx = -1;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const sections = [...document.querySelectorAll('.til-section[data-section-idx]')].filter(
        (s) => s.style.display !== 'none'
      );
      if (sections.length === 0) return;

      currentIdx++;
      if (currentIdx >= sections.length) {
        window.scrollTo(0, 0);
        btn.textContent = 'Next \u2192';
        currentIdx = -1;
      } else {
        sections[currentIdx].scrollIntoView(true);
        btn.textContent = currentIdx === sections.length - 1 ? '\u2191 top' : 'Next \u2192';
      }
    });
  }

  async function fetchViews() {
    const config = window.SUPABASE_CONFIG;
    const supabaseLib = window.supabase;
    if (!config?.url || !config?.anonKey || !supabaseLib) return {};
    try {
      const supabase = supabaseLib.createClient(config.url, config.anonKey);
      const { data, error } = await supabase.from('til_views').select('slug, count');
      if (error) throw error;
      const out = {};
      (data || []).forEach((r) => { out[r.slug] = Number(r.count) || 0; });
      return out;
    } catch (_) {
      return {};
    }
  }

  async function run() {
    if (typeof TIL_DATA === 'undefined') {
      document.getElementById('til-container').innerHTML = '<p>Add entries to til-data.js.</p>';
      return;
    }

    tils = TIL_DATA;
    tags = collectTags(tils);

    const views = await fetchViews();
    buildHTML(views);
    initTagFilter();
    initSearch();
    initNextSection();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
