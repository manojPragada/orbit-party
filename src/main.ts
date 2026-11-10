import './styles.css'
import './timeline.css'
import { locations, normalizeMinutes, passesFor, position, satellites, type Location, type Satellite } from './orbits'

const root = document.querySelector<HTMLDivElement>('#app')!
let selected = satellites[0], location = locations[0], minutes = 0
let playing = !matchMedia('(prefers-reduced-motion: reduce)').matches
const orbit = (satellite: Satellite) => { const tilt = Math.max(.18, Math.abs(Math.cos(satellite.inclination * Math.PI / 180))); return `M 13 50 A 37 ${24 * tilt} 0 1 0 87 50 A 37 ${24 * tilt} 0 1 0 13 50` }

function render() {
  const pos = position(selected, minutes), passes = passesFor(location)
  root.innerHTML = `<a class="skip" href="#passes">Skip to passes</a><header><a href="#" class="brand">ORBIT<span>✦</span>PARTY</a><nav><a href="#tracker">Tracker</a><a href="#passes">Passes</a><a href="#about">About</a></nav><div class="badge">CALCULATED DEMO</div></header><main><section class="intro"><div><p>LOCAL ORBIT EXPLORER / 001</p><h1>The sky has<br><em>a schedule.</em></h1><p>Explore fictional orbital paths and synthetic pass predictions without implying live observation.</p></div><button id="motion">${playing ? 'Pause motion' : 'Play motion'}</button></section>
  <section class="tracker" id="tracker"><div class="globe"><div class="halo"></div><svg viewBox="0 0 100 100" role="img" aria-label="Calculated satellite orbit display"><defs><radialGradient id="earth"><stop stop-color="#283c57"/><stop offset="1" stop-color="#0d1529"/></radialGradient></defs><circle cx="50" cy="50" r="27" fill="url(#earth)"/><path class="land" d="M31 40l9-8 8 4 5-3 10 7-3 9 7 7-8 9-13-2-7-8-8-3z"/><ellipse cx="50" cy="50" rx="27" ry="7"/><ellipse cx="50" cy="50" rx="11" ry="27"/><path class="orbit active" d="${orbit(selected)}" style="--color:${selected.color}"/>${satellites.filter(satellite => satellite.id !== selected.id).map(satellite => `<path class="orbit" d="${orbit(satellite)}"/>`).join('')}<g class="satellite" transform="translate(${pos.x} ${pos.y})"><circle r="4" style="fill:${selected.color};opacity:.18"/><circle r="1.2" style="fill:${selected.color}"/><path d="M-3 0h6M0-2v4"/></g></svg><div class="timeline"><label for="timeline">Calculated timeline</label><input id="timeline" type="range" min="0" max="1440" step="1" value="${Math.round(minutes)}"><output for="timeline">T+${Math.round(minutes)}m</output></div><div class="source">POSITION: CALCULATED FIXTURE · T+${minutes.toFixed(0)} MIN</div></div>
  <aside><p>${selected.kind}</p><h2>${selected.name}</h2><dl><div><dt>ORBITAL PERIOD</dt><dd>${selected.periodMinutes} min</dd></div><div><dt>INCLINATION</dt><dd>${selected.inclination}°</dd></div><div><dt>POSITION TYPE</dt><dd>CALCULATED</dd></div></dl><div class="sat-list">${satellites.map(satellite => `<button class="${satellite.id === selected.id ? 'selected' : ''}" data-sat="${satellite.id}"><i style="background:${satellite.color}"></i><span>${satellite.name}</span><small>${satellite.kind}</small></button>`).join('')}</div></aside></section>
  <section class="passes" id="passes"><div class="section-title"><div><p>OVERHEAD EXPLORATION</p><h2>Next passes near</h2></div><label>Observer location<select id="location">${locations.map(item => `<option value="${item.id}" ${item.id === location.id ? 'selected' : ''}>${item.city}</option>`).join('')}</select></label></div><div class="pass-grid">${passes.map((pass, index) => `<article><span>0${index + 1}</span><p>IN ${pass.startMinutes} MIN</p><h3>${pass.satellite}</h3><dl><div><dt>DURATION</dt><dd>${pass.durationMinutes} min</dd></div><div><dt>MAX ELEVATION</dt><dd>${pass.maxElevation}°</dd></div></dl><small>CALCULATED DEMO · NOT AN OBSERVATION</small></article>`).join('')}</div></section><section class="about" id="about"><p>PROVENANCE MATTERS</p><h2>Prediction is not observation.</h2><p>This foundation intentionally contains no real TLE, telemetry or tracking feed. Every position and pass uses deterministic fixtures so the interface can be evaluated without overstating freshness or accuracy.</p></section></main><footer><span>ORBIT PARTY / OFFLINE</span><span>NOT FOR SPACEFLIGHT OPERATIONS</span></footer>`
  document.querySelector('#motion')?.addEventListener('click', () => { playing = !playing; render() })
  document.querySelectorAll<HTMLElement>('[data-sat]').forEach(element => element.addEventListener('click', () => { selected = satellites.find(satellite => satellite.id === element.dataset.sat) ?? selected; render() }))
  document.querySelector<HTMLSelectElement>('#location')?.addEventListener('change', event => { location = locations.find(item => item.id === (event.target as HTMLSelectElement).value) ?? location; render() })
  document.querySelector<HTMLInputElement>('#timeline')?.addEventListener('input', event => { minutes = normalizeMinutes(Number((event.target as HTMLInputElement).value)); playing = false; render(); document.querySelector<HTMLInputElement>('#timeline')?.focus() })
}

function tick() {
  if (playing) {
    minutes = (minutes + .03) % 1440
    const marker = document.querySelector<SVGGElement>('.satellite')
    if (marker) { const pos = position(selected, minutes); marker.setAttribute('transform', `translate(${pos.x} ${pos.y})`) }
    const source = document.querySelector('.source'); if (source) source.textContent = `POSITION: CALCULATED FIXTURE · T+${minutes.toFixed(0)} MIN`
    const timeline = document.querySelector<HTMLInputElement>('#timeline'); if (timeline) timeline.value = String(Math.round(minutes))
    const output = document.querySelector<HTMLOutputElement>('output[for="timeline"]'); if (output) output.value = `T+${Math.round(minutes)}m`
  }
  requestAnimationFrame(tick)
}
render(); requestAnimationFrame(tick)
