# Nexa Go — Public Website Product Specification

**Document type:** Product specification (TestSprite / QA)  
**Product:** `nexa_go_web_public` — Nexa Go marketing & launch-list site  
**Version:** 1.0  
**Last updated:** May 2026

---

## 1. Product overview

### 1.1 What this product is

**Nexa Go** is the **mobility layer** of the Nexa platform: ride-hailing, delivery (courier / food / merchant orders), and driver or courier opportunities, aimed at Moroccan cities. The **Nexa Go public website** (`nexa_go_web_public`) is **not** the consumer or driver app. It is a **single-page marketing site** (Vite + React) plus **static SEO article pages** that explain the product, build trust, support **English, French, and Arabic**, and collect **launch-list / waitlist** sign-ups.

### 1.2 Purpose of this website

| Goal | Description |
|------|-------------|
| **Educate** | Present Nexa Go as rides, delivery, and local commerce in one Morocco-first app; explain flows for riders, delivery users, and drivers/couriers; show city rollout narrative. |
| **Convert** | Collect leads via the **Join the Waitlist** form at the bottom of the page (`#waitlist`). |
| **Discoverability** | Ship meta tags, JSON-LD in `index.html`, `sitemap.xml`, `robots.txt`, and standalone **“What is Nexa Go?”** pages in EN / FR / AR. |
| **Brand** | Link to Nexa umbrella (`joinnexa.ma`), Nexa Pay (`nexapay.ma`), Instagram, and contact emails. |

### 1.3 How it should work (high level)

1. Visitors open **`/`** — the SPA loads `App.tsx`: hero with CTAs, stats strip, phone mock preview, sections (why → services → how it works → trust → drivers → cities → waitlist), then footer.
2. **Navigation** (desktop and mobile quick-nav) uses **smooth scroll** to section IDs: `why`, `services`, `how`, `trust`, `drivers`, `waitlist` (contact maps to waitlist with a positive offset). Brand button scrolls to top.
3. Users switch **language** (EN / FR / AR) via dropdown; **Arabic** uses **RTL** (`document.documentElement.dir`). Preference persists as `nexa-go-locale`.
4. Users toggle **light / dark** theme; `document.documentElement.dataset.theme` is set and **`nexa-go-theme`** is stored in `localStorage`.
5. Submitting the form **POST**s JSON to **`{VITE_API_BASE_URL}/api/v1/waitlist`** (default base URL in code: `http://localhost:3000` if env unset). Payload includes `source: "nexa_go_web_public"` and mobility-specific **`user_type`** values (see §5).
6. **`/about-nexa-go/`**, **`/fr/about-nexa-go/`**, **`/ar/about-nexa-go/`** are **static HTML** files in `public/` (not React routes); they include language switcher links and link back to `/`.

---

## 2. Technical context

| Item | Detail |
|------|--------|
| **Stack** | Vite 8, React 18, TypeScript; global styles in `src/styles.css` |
| **Routing model** | SPA: `vercel.json` rewrites `/(.*)` → `/index.html`. About URLs are real static paths under `public/`. |
| **Dev server** | `npm run dev` → Vite default (**typically port 5173** unless overridden). |
| **Production origin (canonical)** | `https://nexago.ma` (used in `index.html`, sitemap, canonical links). |
| **API base (client)** | `import.meta.env.VITE_API_BASE_URL` or fallback `http://localhost:3000` — point this at your running **Nexa backend** (or proxy) when testing waitlist end-to-end. |

---

## 3. Information architecture & URLs

| Path | Behavior |
|------|----------|
| `/` | Main React landing (all sections + waitlist). |
| `/about-nexa-go/` | Static English article (“What is Nexa Go?”). |
| `/fr/about-nexa-go/` | Static French article. |
| `/ar/about-nexa-go/` | Static Arabic article (RTL page content). |
| `/sitemap.xml` | Lists home + three about URLs (`nexago.ma`). |
| `/robots.txt` | Allows crawlers; references sitemap. |
| `/assets/*` | Static assets (e.g. `nexa-go.png` logo). |

---

## 4. Feature requirements (for testing)

### 4.1 Home page sections (single scroll)

In vertical order:

1. **Hero** — Eyebrow (“Rides, delivery…”), headline, body, primary CTA to `#waitlist`, secondary to `#services`, stat chips, **phone mock** (sample route, fare “34 MAD”, service pills).
2. **Why Nexa Go** — Four value cards (Morocco-first, rides + delivery in one app, pricing clarity, Nexa ecosystem).
3. **Services** — Six feature cards (city rides, moto, courier, food/merchant orders, driver workspace, merchant visibility).
4. **How it works** — Three columns: rider flow, delivery flow, driver/courier flow (ordered lists).
5. **Trust & safety** — Three cards (onboarding, transparent trip context, support/traceability).
6. **Drivers** — Split section with checklist steps.
7. **City rollout** — Cards (e.g. Casablanca, Rabat, Marrakech, Agadir) with status text.
8. **Waitlist CTA** — Form (`#waitlist`): see §5.
9. **Footer** — Logo, disclaimer, quick links (including anchor scrolls and **`/about-nexa-go/`**), `mailto:` contacts, Instagram links (`joinnexa`, `nexago.ma`), copyright.

**Expected:** No fatal runtime errors; sections visible; hero CTAs navigate via hash or scroll.

### 4.2 Navigation & scroll

- **Desktop nav** and **mobile quick-nav** buttons call smooth scroll to the correct `id`.
- **Join the Waitlist** scrolls to `#waitlist` with offset tuned for fixed header (see `handleScroll` / narrow layout adjustment).
- Footer internal buttons reuse the same scroll helper.

### 4.3 Internationalization (i18n)

- **Locales:** `en`, `fr`, `ar`.
- **Persistence:** `nexa-go-locale` in `localStorage`; initial locale from saved value or `navigator.languages` (ar → fr → en fallback).
- **DOM:** `document.documentElement.lang` and `dir` (`rtl` for Arabic).
- **Expectation:** All visible copy from the `copy` object updates when locale changes (nav, hero, sections, form labels, footer).

### 4.4 Theme (light / dark)

- **Persistence:** `nexa-go-theme` in `localStorage`; default from `prefers-color-scheme` if unset.
- **Implementation:** `document.documentElement.dataset.theme` toggled (`light` | `dark`).
- **Expectation:** Theme toggle in header (and mobile) switches appearance; content remains readable.

### 4.5 SEO & static metadata

- Root **`index.html`:** title, description, canonical `https://nexago.ma/`, Open Graph, Twitter card, theme-color, favicon, **JSON-LD** (Organization + WebSite).
- **`public/sitemap.xml`:** four URLs as listed in §3.
- **About pages:** per-locale titles/descriptions, `hreflang` alternates, article-style JSON-LD where present.

### 4.6 Static “What is Nexa Go?” pages

- Language nav links between EN / FR / AR versions.
- Footer link back to `/`.
- Content positions Nexa Go inside the Nexa ecosystem and references Nexa Pay / joinnexa where applicable.

---

## 5. Waitlist / launch list (critical path)

### 5.1 Form fields (browser)

| Field | Required | Client name | Notes |
|-------|----------|-------------|--------|
| Full name | Yes | `full_name` | Text input |
| Phone | Yes | `phone_number` | Tel input |
| Email | Yes | `email` | Email input |
| Role | Yes | maps to **`user_type`** | Dropdown values: `investor`, `rider`, `driver_courier`, `merchant_partner` |
| City | Yes | `city` | Dropdown of Moroccan cities (values like `Casablanca`, `Rabat`, …; labels localized) |
| Usage note | No | sent as **`how_will_use_nexa`** | Textarea |
| Source | Auto | **`source`** | Always `nexa_go_web_public` |

### 5.2 API — `POST /api/v1/waitlist`

**Full URL:** `{VITE_API_BASE_URL}/api/v1/waitlist`  
**Headers:** `Content-Type: application/json`

**Example body:**

```json
{
  "full_name": "Test User",
  "phone_number": "+212612345678",
  "email": "test@example.com",
  "city": "Casablanca",
  "how_will_use_nexa": "Daily rides in Casa",
  "user_type": "rider",
  "source": "nexa_go_web_public"
}
```

**Backend alignment:** The Nexa backend `SubmitWaitlistDto` accepts **`user_type`** in: `consumer`, `merchant`, `investor`, `rider`, `driver_courier`, `merchant_partner`. The Nexa Go site uses the mobility-oriented subset plus **`investor`**.

**Success:** Typically `200`/`201` with a JSON body including `data` and a thank-you **message** (exact shape depends on API version).

**Errors:** Non-OK responses should surface `message` from JSON when present; otherwise show generic localized error string.

### 5.3 UI expectations

- Submit button shows submitting state; double submit prevented while in flight.
- On success: localized success message; form reset (empty name/phone/email/role/usage; city resets to `Casablanca`).
- On failure: error message visible above/beside form.

---

## 6. Relationship to Nexa Go apps

The **mobile apps** (consumer rides/delivery, driver app) implement live trips, matching, maps, and wallet flows. **This site** describes the roadmap and captures interest; it must **not** imply users can book a ride solely through the marketing site. Footer **disclaimer** states development status and non-advice.

---

## 7. Out of scope for this website

- Live ride booking, map, pricing engine, or payment capture.
- Driver onboarding document upload (app/backend responsibility).

---

## 8. Suggested TestSprite / E2E scenarios (summary)

1. Load `/` — hero, phone mock, and footer render; no uncaught console errors.
2. Switch **FR** and **AR** — copy updates; **AR** sets RTL on `<html>`.
3. Toggle **dark** theme — `dataset.theme` / visuals update; reload restores preference.
4. Click each **nav** target — scroll lands on correct section (`why`, `services`, `how`, `trust`, `drivers`, `waitlist`).
5. Open **`/about-nexa-go/`** — article loads; switch to FR/AR via nav links; **Back to home** works.
6. Submit waitlist with **valid** data and API reachable — success path.
7. Submit with **invalid email** or missing required field — browser validation and/or API error handling.
8. `GET /sitemap.xml` — contains expected `loc` entries.  
9. `GET /robots.txt` — allows `/`, references sitemap.

---

## 9. Document control

| Field | Value |
|-------|--------|
| **Repository path** | `nexa_go_web_public/` |
| **Main UI** | `src/App.tsx` |
| **Entry / HTML shell** | `index.html`, `src/main.tsx` |
| **Styles** | `src/styles.css` |
| **Static SEO pages** | `public/about-nexa-go/`, `public/fr/about-nexa-go/`, `public/ar/about-nexa-go/` |
| **Deploy SPA fallback** | `vercel.json` rewrites |

---

*Upload this file as the Product Specification when configuring Nexa Go public web tests in TestSprite.*
