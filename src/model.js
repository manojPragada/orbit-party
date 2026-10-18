export const satellites=[{id:'iss-demo',name:'ISS / illustration',inclination:51.6,offset:0},{id:'polar-demo',name:'Polar explorer',inclination:82,offset:70},{id:'equator-demo',name:'Equatorial drifter',inclination:12,offset:150}];
export function coordinate(satellite,phase){const angle=((phase+satellite.offset)%360+360)%360;return [angle-180,Math.sin(angle*Math.PI/180)*satellite.inclination];}
export function project([lon,lat]){return [(lon+180)/360*800,(90-lat)/180*400];}
export function track(satellite){return Array.from({length:73},(_,i)=>project(coordinate(satellite,i*5-satellite.offset)));}
