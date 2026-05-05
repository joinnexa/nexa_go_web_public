# Google Search Console — Nexa Go (`nexago.ma`)

Static files in `public/`:

- **`/robots.txt`** → declares `https://nexago.ma/sitemap.xml`
- **`/sitemap.xml`** → lists home + localized “About Nexa Go” URLs
- **`/about-nexa-go/`**, **`/fr/about-nexa-go/`**, **`/ar/about-nexa-go/`** — indexable HTML with `hreflang` + JSON-LD

`vercel.json` adds a SPA fallback rewrite to `index.html`; **filesystem routes override** explainer folders.

## 1. Verify property

Add URL-prefix **`https://nexago.ma`** in [Google Search Console](https://search.google.com/search-console/).

## 2. Submit sitemap

```
https://nexago.ma/sitemap.xml
```

## 3. Request indexing

- `https://nexago.ma/`
- `https://nexago.ma/about-nexa-go/`
- `https://nexago.ma/fr/about-nexa-go/`
- `https://nexago.ma/ar/about-nexa-go/`

See also [`SEO_BACKLINKS.md`](SEO_BACKLINKS.md), [`SEO_MONITORING.md`](SEO_MONITORING.md).
