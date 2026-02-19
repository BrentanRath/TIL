(function () {
  const SESSION_PREFIX = 'til-viewed-';

  function getSlugFromPath() {
    const match = window.location.pathname.match(/\/til\/([^/.]+)\.html?$/);
    return match ? match[1] : null;
  }

  function formatCount(n) {
    return n + ' view' + (n !== 1 ? 's' : '');
  }

  function displayCount(el, n) {
    if (el) el.textContent = n !== null && n !== undefined ? formatCount(n) : '';
  }

  async function recordAndShow(slug, el) {
    const config = window.SUPABASE_CONFIG;
    const supabaseLib = window.supabase;
    if (!config || !config.url || !config.anonKey || !supabaseLib) {
      displayCount(el, null);
      return;
    }
    const supabase = supabaseLib.createClient(config.url, config.anonKey);
    const sessionKey = SESSION_PREFIX + slug;
    if (sessionStorage.getItem(sessionKey)) {
      const { data } = await supabase.from('til_views').select('count').eq('slug', slug).single();
      displayCount(el, data ? Number(data.count) : 0);
      return;
    }
    try {
      const { data, error } = await supabase.rpc('increment_til_view', { slug_param: slug });
      if (error) throw error;
      sessionStorage.setItem(sessionKey, '1');
      displayCount(el, data != null ? Number(data) : 0);
    } catch (e) {
      console.warn('View counter:', e);
      displayCount(el, null);
    }
  }

  window.TIL_VIEWS = {
    recordAndShow,
    formatCount
  };

  const slug = getSlugFromPath();
  if (slug) {
    const el = document.getElementById('view-count');
    recordAndShow(slug, el);
  }
})();
