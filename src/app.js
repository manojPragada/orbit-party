import { satellites, coordinate, project, track, advancePhase, viewFromURL } from './model.js';
const $ = selector => document.querySelector(selector);
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const initial=viewFromURL(location.href);let selected = initial.satellite, playing = false, previous = null, frame = null;
$('#phase').value=initial.phase;
function syncURL(){const url=new URL(location.href);url.searchParams.set('satellite',selected.id);url.searchParams.set('phase',Math.round(Number($('#phase').value)));history.replaceState(null,'',url);}
const ns = 'http://www.w3.org/2000/svg';
const dot = document.createElementNS(ns, 'circle'); dot.setAttribute('r',8); dot.setAttribute('class','marker'); $('#markers').append(dot);
function drawPosition() {
  const coordinates = coordinate(selected,Number($('#phase').value)), point = project(coordinates);
  dot.setAttribute('cx',point[0]); dot.setAttribute('cy',point[1]);
  $('#coordinates').textContent = coordinates[1].toFixed(1)+'° / '+coordinates[0].toFixed(1)+'°';
}
function renderSelection() {
  for (const button of $('#list').children) button.setAttribute('aria-pressed',String(button.dataset.satellite===selected.id));
  const path = document.createElementNS(ns,'path'); path.setAttribute('class','trail');
  path.setAttribute('d',track(selected).map((point,i)=>(i?'L':'M')+point.join(',')).join(' ')); $('#tracks').replaceChildren(path);
  $('#name').textContent = selected.name;
  $('#kind').textContent = 'Illustrative latitude amplitude: '+selected.inclination+'°'; drawPosition();
}
for (const satellite of satellites) {
  const button = document.createElement('button'); button.dataset.satellite=satellite.id; button.textContent=satellite.name;
  button.addEventListener('click',()=>{selected=satellite;renderSelection();syncURL();}); $('#list').append(button);
}
function stop(message='Illustration paused.') {
  playing=false;previous=null;if(frame!==null)cancelAnimationFrame(frame);frame=null;
  $('#play').textContent='Play illustration';$('#play').setAttribute('aria-pressed','false');$('#playback-status').textContent=message;
}
function tick(time) {
  if(!playing)return;
  if(previous!==null)$('#phase').value=advancePhase(Number($('#phase').value),time-previous);
  previous=time;drawPosition();frame=requestAnimationFrame(tick);
}
function motionPreference() {
  if(reduced.matches)stop('Reduced motion enabled. Use the phase slider or phase-step buttons.');
  $('#play').disabled=reduced.matches;
}
$('#play').addEventListener('click',()=>{
  if(playing)return stop();if(reduced.matches)return;
  playing=true;previous=null;$('#play').textContent='Pause illustration';$('#play').setAttribute('aria-pressed','true');
  $('#playback-status').textContent='Playing an artistic track, not a predicted satellite position.';frame=requestAnimationFrame(tick);
});
$('#phase').addEventListener('input',()=>{stop();drawPosition();syncURL();});
for(const [id,delta] of [['#step-back',-15],['#step-forward',15]])$(id).addEventListener('click',()=>{
  stop();$('#phase').value=((Number($('#phase').value)+delta)%360+360)%360;drawPosition();syncURL();
});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop('Illustration paused while this tab is hidden.');});
reduced.addEventListener('change',motionPreference);renderSelection();motionPreference();


