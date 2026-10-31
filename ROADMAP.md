# Roadmap

## Completed

- [x] Working static prototype and separated model/UI files
- [x] Behavioral tests and verified setup commands
- [x] Responsive styles, visible focus and reduced-motion support

## Next

- [ ] Add verified orbital-data provider and proper SGP4 propagation
- [ ] Add observer location and calculated pass predictions with timestamps
- [ ] Add Earth globe (artistic phase boundary complete)

## Continuity

2026-10-30: Added an explicitly artistic same/opposite-hemisphere and equator-crossing relationship between the chosen observer and illustrated ground point. It remains separate from elevation, visibility and pass prediction. Next: verified TLE/SGP4 work before any real orbital claim.

2026-10-29: Added an explicitly artistic hemisphere/equator label derived from the illustration only. Next: verified TLE/SGP4 work before any real orbital claim.

2026-10-28: Added normalized remaining-cycle context to the explicitly artistic orbit status. Next: verified TLE/SGP4 work before any real orbital claim.

2026-10-27: Added normalized artistic-orbit progress while preserving explicit non-prediction wording. Next: verified TLE/SGP4 work before any real orbital claim.

2026-10-26: Added a deterministic north/south latitude-trend label for the artistic orbit, explicitly separate from propagation and pass prediction. Next: verified TLE/SGP4 work before any real orbital claim.

2026-10-25: Added deterministic artistic phase-sector labels alongside observer separation, explicitly avoiding elevation, visibility or pass claims. Next: verified TLE/SGP4 work before any real orbital claim.

2026-10-24: Added a phase-linked schematic light boundary to the map, explicitly kept within the artistic illustration rather than presenting a calculated solar terminator. Next: verified TLE/SGP4 work before any real position, pass or illumination claims.

2026-10-23: Replaced ambiguous signed coordinate output with accessible latitude/longitude cardinal formatting while preserving the explicit artistic-position disclaimer. Next: no pass or visibility claims until verified TLE and SGP4 work exists.

2026-10-22: Added validated, session-only custom observer coordinates while preserving preset locations. The map reports only spherical angular separation from the artistic ground point; it does not calculate range, elevation, visibility, pass times or observed positions. Next: add real observer/pass work only with verified TLE data and SGP4 propagation.

2026-10-21: Added Toronto, Hyderabad and Sydney observer markers with spherical angular separation from each artistic position. The interface explicitly labels the result as illustrative and not a pass prediction; no times, visibility or live coordinates are inferred. Next: real observer/pass work only after verified TLE data and SGP4 propagation.

2026-10-21: Added validated shareable satellite/phase URLs with normalized phase and browser coverage. Links preserve artistic state only and do not imply observed or predicted positions. Next: proper orbital propagation and observer inputs after verifying a data source.

2026-10-20: Added repeatable Playwright regression checks and a public-repository-only CI workflow. Desktop, mobile and motion-enabled scenarios passed locally using Chromium 153; model tests and syntax checks passed. Screenshots generated locally for inspection. Earlier browser-unavailable notes below are historical. No deployment or live-provider validation performed. Next: expand browser coverage and review the existing PR before merging.

Initial prototype created 2026-10-17. Re-read repository contents and latest commits before continuing. No hosted deployment. No live data integrations.

## Verification

- 2 model tests passed with Node.js 24.
- JavaScript syntax checks passed.
- Local HTTP document/module/style serving and HTML anchor/ID integrity checked.
- Browser rendering and interaction QA **not completed**: no installed Chromium; browser download failed. No screenshot is claimed.
- Implementation is proposed on `feat/initial-experience` for review; inspect open PRs before starting the next change. Prioritize desktop/mobile and keyboard browser review next.


2026-10-18: Corrected seam-crossing track artifact, preserved stable satellite control focus, added time-based playback, manual phase stepping and hidden-tab/live reduced-motion handling. Four model tests pass. Positions remain artistic; SGP4 and browser review are still pending.


