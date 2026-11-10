# Orbit Party
A cinematic offline satellite and overhead-pass explorer.

**Status:** working calculated-data demo. Three fictional satellites, selectable orbital paths, motion pause, a keyboard-operable timeline, observer presets, validated manual coordinates and synthetic pass cards are implemented. There is no TLE/live feed, observed position or hosted demo.

## Run and verify
Requires Node.js 22+ and npm 11+.
```bash
npm install
npm run dev
npm run check
npm run build
```
`check` runs strict TypeScript and unit tests. No linter is configured.

## Data contract
Every record carries `source: calculated-demo`. Positions use a deterministic circular display formula, not SGP4 propagation; pass times are authored calculations for interface testing. They must never be represented as observations, real predictions or operational data.

## Structure
```text
src/orbits.ts       synthetic satellite/location models and calculations
src/main.ts         UI state, SVG scene and motion loop
src/styles.css      responsive cinematic system
src/orbits.test.ts  provenance and display-bound tests
ROADMAP.md          sequenced integration work
```

## Configuration and deployment
No environment variables or network services are used; see `.env.example`. `npm run build` creates `dist/` for static hosting. No deployment has been performed. A real adapter must document TLE provenance, terms, attribution, update time and propagation limitations before release.

## Accessibility and performance
Native buttons and a select control expose all choices, a skip link reaches pass results, and the animation can be paused. Reduced-motion visitors start with motion disabled. The scene is one compact SVG with no tile, image or model downloads.

## Troubleshooting
- Motion feels distracting: choose “Pause motion” or enable reduced motion in the OS.
- Pass values look unusual: they are fictional fixtures, not real predictions.
- Build fails: confirm Node.js 22+, run `npm install`, then `npm run check`.

All visual assets and fixtures are original code. Keep calculations clearly labeled, update the roadmap, and run checks before contributing. No license has been selected.
