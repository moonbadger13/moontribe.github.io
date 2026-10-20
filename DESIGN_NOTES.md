# Papillon — Autumn editorial redesign

Rebranded to Papillon with an original SVG butterfly outline in `assets/papillon-mark.svg`. The bottom map marks the junction of Route de Vallon d'en Bas and Route de Sixt at 46.077214, 6.7348452. Junction coordinates were checked against OpenStreetMap node 291332714 and connected road ways 448662280 and 336480711. The marker is an arrival landmark; the exact entrance is supplied with the booking.

The existing GitHub Pages site and custom domain are preserved. No framework, build step, analytics or external font service is required.

## Direction

Warm paper, woodland olive, honeyed timber and restrained rust accents. Large serif headings, asymmetric editorial layouts, generous imagery and direct booking links. English and French content is available throughout the guest journey. Mobile navigation, a persistent mobile booking link, keyboard-accessible seasonal tabs and a native dialog gallery are included.

Hospitality references researched: [Aman](https://www.aman.com/), [Le Collectionist](https://www.lecollectionist.com/en/) and [Le Coucou](https://www.lecoucoumeribel.com/). The design takes cues from their image-led storytelling and restrained hierarchy, without copying their assets or layouts.

## Images and accuracy

All eight images in `images/autumn/` are renovation concepts. The living room and rear garden were newly rendered from the supplied reference renders. The front patio was newly rendered from the supplied raw courtyard photograph, retaining the building, stairs and access routes. The five earlier bedroom, bathroom and passage renders were retained because they already match the oak, linen and olive palette. All were encoded as optimised WebP assets.

The proposed hot tub, bar and communal patio must not be described as completed amenities. On-page captions, the introduction, FAQ and booking copy direct visitors to the Airbnb listing for current photographs and facilities. Existing source photographs remain in the repository. No unverified reviews or ratings are displayed.

Booking destination: https://www.airbnb.com/rooms/1277621739729972893

## Maintenance and verification

Edit `index.html`, `assets/papillon.css` and `assets/papillon.js`. Translations are in HTML `data-fr` attributes and the JavaScript season/gallery dictionaries. Language choice is stored locally; no data is transmitted.

Run `node --check assets/papillon.js`, `python3 tests/check_site.py` and `git diff --check`. Preview the root using a static server. Check desktop and narrow-screen layouts, EN/FR, gallery next/previous and Escape, all three seasonal tabs, FAQ disclosure and booking links. GitHub Pages publishes the `main` branch; preserve `CNAME` and `.nojekyll`.
