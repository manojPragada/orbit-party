export const satellites=[{id:'iss-demo',name:'ISS / illustration',inclination:51.6,offset:0},{id:'polar-demo',name:'Polar explorer',inclination:82,offset:70},{id:'equator-demo',name:'Equatorial drifter',inclination:12,offset:150}];
export const observers=[{id:'toronto',name:'Toronto',coordinate:[-79.38,43.65]},{id:'hyderabad',name:'Hyderabad',coordinate:[78.49,17.39]},{id:'sydney',name:'Sydney',coordinate:[151.21,-33.87]}];
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
export function angularSeparation([lonA,latA],[lonB,latB]){const rad=Math.PI/180;const a=latA*rad,b=latB*rad,delta=(lonB-lonA)*rad;const cosine=Math.sin(a)*Math.sin(b)+Math.cos(a)*Math.cos(b)*Math.cos(delta);return Math.acos(Math.max(-1,Math.min(1,cosine)))/rad;}
export function formatCoordinate([lon,lat]){const latitude=`${Math.abs(lat).toFixed(1)}°${lat<0?'S':'N'}`,longitude=`${Math.abs(lon).toFixed(1)}°${lon<0?'W':'E'}`;return `${latitude} / ${longitude}`;}
export function customObserver(longitude,latitude){
  if(longitude===''||latitude==='')return null;
  const lon=Number(longitude),lat=Number(latitude);
  return Number.isFinite(lon)&&Number.isFinite(lat)&&lon>=-180&&lon<=180&&lat>=-90&&lat<=90
    ? {id:'custom',name:'Custom observer',coordinate:[lon,lat]}
    : null;
}



