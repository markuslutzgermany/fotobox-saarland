# fotobox.saarland — Static Site (Eleventy)

Statische Site für [fotobox.saarland](https://fotobox.saarland), gebaut mit **Eleventy (11ty)**, gehostet auf **Cloudflare Pages**, Formulare über **Formspree**.

Ablöse-Stack für die bisherige WordPress-/Elementor-Site bei All-Inkl.

## Stack

| Komponente | Tool |
|---|---|
| Static Site Generator | [Eleventy 3.x](https://www.11ty.dev/) |
| Templates | Nunjucks (`.njk`) + Markdown |
| Styling | Hand-CSS mit CSS-Variablen, an fotobus.saarland angeglichen |
| Hosting | Cloudflare Pages |
| Formulare | Formspree |
| DNS | All-Inkl (für fotobox.saarland) bzw. Cloudflare (Apex) — finaler DNS-Cutover am Ende der Migration |
| Deploy | Git push to `main` → Cloudflare Pages baut automatisch |

## Lokaler Dev-Setup

```bash
npm install
npm run dev          # http://localhost:8080
npm run build        # Produktions-Build nach _site/
```

## Verzeichnisstruktur

```
repo/
├── eleventy.config.mjs       # Eleventy-Konfiguration
├── package.json
├── .gitignore
├── README.md
└── src/
    ├── _data/
    │   └── site.json         # Globale Site-Daten (Brand, NAP, Nav)
    ├── _includes/
    │   ├── layout-base.njk   # Basis-Layout (Head, Body, Footer)
    │   ├── header.njk        # Header mit Top-Bar + Nav
    │   └── footer.njk        # Footer mit Schema.org-LocalBusiness
    ├── css/
    │   └── main.css          # Design Tokens + Basis-Styles
    ├── _redirects            # Cloudflare-Redirects (Migrations-Mapping)
    ├── index.njk             # Startseite
    ├── datenschutz.njk
    ├── impressum.njk
    ├── kontakt.njk
    ├── faq.njk
    ├── die-fotoboxen/        # Produkt-Sektion
    └── anlaesse/             # B2B-Long-Tail-Sektion
```

## Strategie

Diese Site ist **B2B-only** (Firmenfeier, Kundenevent, Messe, Tag der offenen Tür, Produkt-Launch). Privatanlässe (Geburtstage, Hochzeiten) werden NICHT beworben — Hochzeiten und Eye-Catcher-Outdoor-Events leitet die Marke an die Schwesterseite [fotobus.saarland](https://fotobus.saarland) weiter (Feuerwehr-Bus als USP).

## Migration-Status

Siehe Doku-Files im Eltern-Ordner:
- `../01-GSC-DNS-Verifizierung.md` — Search-Console-Setup
- `../02-URL-Inventar.md` — bestehende URLs + Redirect-Plan
- `../PROJEKT-BRIEFING-fotobox-saarland.md` — Gesamt-Briefing
