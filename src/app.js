import { satellites, observers, coordinate, project, track, advancePhase, viewFromURL, angularSeparation, customObserver, formatCoordinate, artisticTerminatorX } from './model.js';
const $ = selector => document.querySelector(selector);
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const initial=viewFromURL(location.href);let selected = initial.satellite, playing = false, previous = null, frame = null, appliedObserver = null;
$('#phase').value=initial.phase;
function syncURL(){const url=new URL(location.href);url.searchParams.set('satellite',selected.id);url.searchParams.set('phase',Math.round(Number($('#phase').value)));history.replaceState(null,'',url);}
const ns = 'http://www.w3.org/2000/svg';
const dot = document.createElementNS(ns, 'circle'); dot.setAttribute('r',8); dot.setAttribute('class','marker'); $('#markers').append(dot);
const observerDot=document.createElementNS(ns,'circle');observerDot.setAttribute('r',5);observerDot.setAttribute('class','observer-marker');$('#markers').append(observerDot);
const terminator=document.createElementNS(ns,'line');terminator.id='terminator';terminator.setAttribute('y1','0');terminator.setAttribute('y2','400');terminator.setAttribute('class','terminator');$('.land').before(terminator);
const observerLabel=document.createElement('label');observerLabel.textContent='Observer ';const observerSelect=document.createElement('select');observerSelect.id='observer';for(const item of observers){const option=document.createElement('option');option.value=item.id;option.textContent=item.name;observerSelect.append(option);}observerLabel.append(observerSelect);$('.controls').append(observerLabel);
const coordinateGroup=document.createElement('div');coordinateGroup.className='coordinate-inputs';coordinateGroup.innerHTML='<label>Longitude <input id="observer-lon" type="number" min="-180" max="180" step="0.01" inputmode="decimal" placeholder="-79.38"></label><label>Latitude <input id="observer-lat" type="number" min="-90" max="90" step="0.01" inputmode="decimal" placeholder="43.65"></label><button id="apply-observer" type="button">Use coordinates</button>';$('.controls').append(coordinateGroup);
const separation=document.createElement('p');separation.id='separation';separation.className='status';separation.setAttribute('aria-live','polite');$('#coordinates').after(separation);
function drawPosition() {
  const coordinates = coordinate(selected,Number($('#phase').value)), point = project(coordinates);
  const boundary=artisticTerminatorX($('#phase').value);terminator.setAttribute('x1',boundary);terminator.setAttribute('x2',boundary);
  dot.setAttribute('cx',point[0]); dot.setAttribute('cy',point[1]);
  $('#coordinates').textContent = formatCoordinate(coordinates);
  const observer=appliedObserver??observers.find(item=>item.id===$('#observer').value)??observers[0],observerPoint=project(observer.coordinate);observerDot.setAttribute('cx',observerPoint[0]);observerDot.setAttribute('cy',observerPoint[1]);
  $('#separation').textContent=`${angularSeparation(observer.coordinate,coordinates).toFixed(1)}° artistic ground separation from ${observer.name} · not a pass prediction`;
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
$('#observer').addEventListener('change',()=>{appliedObserver=null;drawPosition();});
$('#apply-observer').addEventListener('click',()=>{
  const observer=customObserver($('#observer-lon').value,$('#observer-lat').value);
  if(!observer){$('#separation').textContent='Enter longitude from -180 to 180 and latitude from -90 to 90.';return;}
  appliedObserver=observer;drawPosition();
});
for(const [id,delta] of [['#step-back',-15],['#step-forward',15]])$(id).addEventListener('click',()=>{
  stop();$('#phase').value=((Number($('#phase').value)+delta)%360+360)%360;drawPosition();syncURL();
});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop('Illustration paused while this tab is hidden.');});
reduced.addEventListener('change',motionPreference);renderSelection();motionPreference();


