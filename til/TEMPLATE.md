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
  slug: 'url-friendly-slug',  // becomes til/slug.html
  description: 'Optional short description for the index card'
}
```

**Required:** id, title, date, category, tags, slug  
**Optional:** description, author (add more as needed)

The view counter is automatic: include `<span id="view-count"></span>` and `view-counter.js` in each TIL page (see template below).

The footer is automatic: include `<div id="site-footer"></div>` and `footer.js`. Edit `js/footer.js` to change your name and email in one place.

The navbar is automatic: include `<div id="site-navbar"></div>` and `navbar.js`.

### 2. Create your TIL page

Create `til/your-slug.html`. The page is **fully flexible**—you can:

- **Minimal**: Just use the shared `style.css` for consistent looks
- **Custom**: Add your own `<style>` or link other CSS
- **Plain**: Skip the TIL layout and write raw HTML
- **Markdown-rendered**: Use a script or preprocessor if you prefer

**Minimum viable structure** (copy & adapt):

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>TIL: Your Title</title>
  <link rel="stylesheet" href="../css/style.css">
</head>
<body>
  <div id="site-navbar"></div>
  <p><a href="../index.html">← back</a></p>
  <article class="til-content">
    <h1>Your Title</h1>
    <p class="meta">DATE · CATEGORY · tag1, tag2 · <span id="view-count"></span></p>
    <!-- Your content here -->
  </article>
  <div id="site-footer"></div>
  <script src="../js/navbar.js"></script>
  <script src="../js/footer.js"></script>
  <script src="../js/supabase-config.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
  <script src="../js/view-counter.js"></script>
</body>
</html>
```

### Flexibility tips

- **Different layouts**: Omit `til-content` class and build your own layout
- **Embed media**: Add images, code demos, iframes—whatever you need
- **Extra scripts**: Include your own JS for interactive demos
- **Custom fonts**: Link additional font stylesheets per page
- **Standalone**: A TIL page can be completely independent; just keep the "← back" link for navigation
