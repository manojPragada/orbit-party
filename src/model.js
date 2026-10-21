export const satellites=[{id:'iss-demo',name:'ISS / illustration',inclination:51.6,offset:0},{id:'polar-demo',name:'Polar explorer',inclination:82,offset:70},{id:'equator-demo',name:'Equatorial drifter',inclination:12,offset:150}];
export function coordinate(satellite,phase){const angle=((phase+satellite.offset)%360+360)%360;return [angle-180,Math.sin(angle*Math.PI/180)*satellite.inclination];}
export function project([lon,lat]){return [(lon+180)/360*800,(90-lat)/180*400];}
export function track(satellite) {
  // Use unwrapped longitudes at the seam: do not draw a line from +180 back to -180.
  return Array.from({length:73}, (_,i) => project([i*5-180, Math.sin(i*5*Math.PI/180)*satellite.inclination]));
}
export function advancePhase(phase, elapsedMs) {
  if (!Number.isFinite(phase) || !Number.isFinite(elapsedMs)) return 0;
  return ((phase + Math.max(0, Math.min(elapsedMs,1000))/70)%360+360)%360;
}
export function viewFromURL(value) {
  try {
    const params=new URL(value,'https://orbit.invalid/').searchParams;
    const satellite=satellites.find(item=>item.id===params.get('satellite'))??satellites[0];
    const raw=Number(params.get('phase'));const phase=Number.isFinite(raw)?((raw%360)+360)%360:0;
    return {satellite,phase};
  } catch { return {satellite:satellites[0],phase:0}; }
}



