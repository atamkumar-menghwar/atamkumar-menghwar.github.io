# Atam Kumar Menghwar — Academic Website

Personal academic website of **Atam Kumar Menghwar**, researcher at the MSC-LES Lab, University of Calabria (Italy).
Digital twins · discrete-event simulation · reinforcement learning · smart manufacturing · resilient supply chains.

Static site (HTML, CSS, JavaScript), no build step, hosted on GitHub Pages.

## Structure
```
index.html               all page content
assets/css/style.css     design (one colour theme per section)
assets/js/main.js        menu, tabs, publication filter/search, animations
assets/img/              photos and figures
assets/docs/             CV and thesis description
assets/certificates/     selected certificates
```

## Updating
- **Publication:** copy a `<li class="pub">` block in `index.html`; set `data-status` to `published`, `accepted` or `review`; update the counts in the filter buttons and hero stats.
- **CV:** replace `assets/docs/Atam_Kumar_Menghwar_CV.pdf` (same file name).
- **News:** edit the "Latest" strip near the top of `index.html`.
