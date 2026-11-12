# Roadmap
## Completed
- [x] Build a cinematic calculated-orbit demo
- [x] Add satellite selection and motion controls
- [x] Add observer presets and synthetic overhead passes
- [x] Label predicted/calculated data separately from observation
- [x] Add an accessible manual timeline with keyboard-operable scrubbing
- [x] Add validated manual observer coordinates without geocoding
- [x] Define visible calculated, stale-source and propagation-error presentation states
- [x] Keep manual observer state visible and provide a keyboard reset to the default preset
## Next
- [ ] Define a TLE adapter only after source terms and update cadence are verified
- [x] Add stale-data and propagation-error states before any live mode
## Continuity
2026-11-11: Kept an active manual observer visible in the location selector and added a keyboard-operable reset to Toronto, preventing the UI from implying a preset while manual coordinates drive the synthetic pass cards. Next: verify a TLE source's terms, attribution and update cadence before defining an adapter.

2026-11-10: Added a keyboard-accessible source disclosure with explicit calculated-fixture, stale-source and propagation-error states. Stale or failed future adapters are contractually unavailable rather than allowed to show guessed positions. Next: verify a TLE source's terms, attribution and update cadence before defining an adapter.

2026-11-09: Added a no-network manual coordinate form with explicit latitude/longitude bounds and inline errors. Calculated pass fixtures update for the chosen observer point. Next: define stale-data and propagation-error states before selecting a TLE source.

2026-11-09: Added a range-based 24-hour timeline. Scrubbing pauses motion, updates the calculated marker immediately and remains keyboard-operable. Next: add bounded manual coordinates before any source adapter.

2026-11-09: Established the first working orbital explorer with deterministic satellite paths, motion controls, location presets and calculated pass cards. Every position is explicitly a fictional calculation, never observed telemetry.
