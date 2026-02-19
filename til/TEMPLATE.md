# TIL Template & Flexibility Guide

## Adding a new TIL

### 1. Register in `til-data.js`

Add an entry to the `TIL_DATA` array:

```javascript
{
  id: '5',
  title: 'Your Title',
  date: '2025-02-11',  // YYYY-MM-DD
  category: 'CategoryName',
  tags: ['tag1', 'tag2'],
  slug: 'url-friendly-slug',  // becomes til/slug/
  description: 'Optional short description for the index card'
}
```

**Required:** id, title, date, category, tags, slug  
**Optional:** description, author (add more as needed)

The view counter is automatic: each TIL page includes `<span id="view-count"></span>` and `view-counter.js` (in the template).

The footer is automatic: include `<div id="site-footer"></div>` and `footer.js`. Edit `js/footer.js` to change your name and email in one place.

The navbar is automatic: include `<div id="site-navbar"></div>` and `navbar.js`.

### 2. Create your TIL folder

1. Create `til/your-slug/`
2. Copy `docs/til-article-template.html` → `til/your-slug/index.html` (no edits needed)
3. Create `til/your-slug/content.md` with your Markdown content

**Content format:**
- Write the body in Markdown (headings, lists, links, code blocks, etc.)
- Optional: Add YAML frontmatter at the top for `title`, `date`, `category`, `tags` — otherwise these are taken from `til-data.js`
- Inline HTML is supported: use `<details class="til-collapsible">` for collapsible sections
- Images: `![alt](path)` or `<img src="path" alt="..." class="til-meme">` for styled images

**Paths in Markdown:** Links and images are relative to the HTML page. Since the page is at `til/slug/index.html`, use `../../assets/` for repo-root assets.

### 3. Optional: Custom scripts

If your TIL needs custom JavaScript (e.g. loading external data into a placeholder), add an inline `<script>` at the end of `til/your-slug/index.html`, after the template scripts. The script runs after the page loads; if it targets an element injected by `til-renderer.js` (e.g. `#autounattend-xml`), poll for the element or use a short delay.

### Flexibility tips

- **Different layouts**: Omit `til-content` class and build your own layout
- **Embed media**: Add images, code demos, iframes—whatever you need
- **Extra scripts**: Include your own JS for interactive demos
- **Custom fonts**: Link additional font stylesheets per page
- **Standalone**: A TIL page can be completely independent; just keep the "← back" link for navigation
