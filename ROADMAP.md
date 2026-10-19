# Roadmap

## Completed

- [x] Working static prototype and separated model/UI files
- [x] Behavioral tests and verified setup commands
- [x] Responsive styles, visible focus and reduced-motion support

## Next

- [ ] Add verified orbital-data provider and proper SGP4 propagation
- [ ] Add observer location and calculated pass predictions with timestamps
- [ ] Add Earth globe and day/night boundary

## Continuity

Initial prototype created 2026-10-17. Re-read repository contents and latest commits before continuing. No hosted deployment. No live data integrations.

## Verification

- 2 model tests passed with Node.js 24.
- JavaScript syntax checks passed.
- Local HTTP document/module/style serving and HTML anchor/ID integrity checked.
- Browser rendering and interaction QA **not completed**: no installed Chromium; browser download failed. No screenshot is claimed.
- Implementation is proposed on `feat/initial-experience` for review; inspect open PRs before starting the next change. Prioritize desktop/mobile and keyboard browser review next.


2026-10-18: Corrected seam-crossing track artifact, preserved stable satellite control focus, added time-based playback, manual phase stepping and hidden-tab/live reduced-motion handling. Four model tests pass. Positions remain artistic; SGP4 and browser review are still pending.
