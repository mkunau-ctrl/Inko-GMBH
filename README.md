# Inko GmbH — Website

Neue Website für die **Inko GmbH** (Marke „inkO"), einen der größten
Gartenmöbelanbieter der Region (Lemgo / Hille-Hartum).

Reines HTML/CSS/JavaScript – kein Framework, Mobile First, responsive.

## Seiten (7)

| Datei | Inhalt |
|---|---|
| `index.html` | Startseite: Hero, Highlights, Über-uns-Teaser, Services, CTA |
| `produkte.html` | 6 Materialwelten: Teakholz, Aluminium, Beton, Edelstahl, Eisen, Geflecht |
| `service.html` | Beratung, Logistik, Fachhandels-Partnerschaft, Qualitätskontrolle |
| `galerie.html` | Filterbare Galerie nach Material |
| `grillcorner.html` | Grill Corner: Grills, Zubehör, Spirituosen, Dekoration |
| `ueber-uns.html` | Geschichte, Werte, Standorte |
| `kontakt.html` | Kontaktformular, Öffnungszeiten, beide Standorte |

## Struktur

```
.
├── index.html / produkte.html / service.html / galerie.html
├── grillcorner.html / ueber-uns.html / kontakt.html
├── css/style.css   — gemeinsames Stylesheet (Design Tokens, Komponenten)
└── js/main.js      — Navigation, Scroll-Reveal, Galerie-Filter, Formular
```

## Design

Premium-Natur-Stil mit den Farben Teak-Braun (`#7B5A3C`), Anthrazit
(`#2C2C2C`), Cremeweiß (`#F7F3EE`) und Waldgrün (`#4A6741`). Jedes
Inhaltselement (Karte, Feature, Info-Block) sitzt in einem eigenen,
modularen Container.

Bilder sind aktuell als CSS-Gradient-Platzhalter umgesetzt und können
später durch echte Fotos ersetzt werden.

## Lokal ansehen

Einfach `index.html` im Browser öffnen – keine Build-Schritte nötig.
