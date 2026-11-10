export type Satellite={id:string;name:string;kind:string;periodMinutes:number;inclination:number;phase:number;color:string;source:'calculated-demo'}
export type Location={id:string;city:string;lat:number;lon:number}
export const satellites:readonly Satellite[]=[
 {id:'demo-iss',name:'ISS analogue',kind:'CREWED LAB',periodMinutes:92.7,inclination:51.6,phase:.08,color:'#b8ff67',source:'calculated-demo'},
 {id:'demo-weather',name:'Aurora Weather',kind:'WEATHER',periodMinutes:101.2,inclination:98.7,phase:.39,color:'#73d9ff',source:'calculated-demo'},
 {id:'demo-comms',name:'Relay Seven',kind:'COMMUNICATION',periodMinutes:1436,inclination:.2,phase:.72,color:'#ff7bd4',source:'calculated-demo'},
]
export const locations:readonly Location[]=[{id:'toronto',city:'Toronto',lat:43.65,lon:-79.38},{id:'hyderabad',city:'Hyderabad',lat:17.39,lon:78.49},{id:'london',city:'London',lat:51.51,lon:-.13}]
export function position(s:Satellite,minutes:number){const angle=(s.phase+minutes/s.periodMinutes)*Math.PI*2;return{x:50+Math.cos(angle)*37,y:50+Math.sin(angle)*Math.cos(s.inclination*Math.PI/180)*24}}
export function passesFor(location:Location){return satellites.map((sat,index)=>({satellite:sat.name,startMinutes:18+index*27+Math.round(Math.abs(location.lat)/10),durationMinutes:4+index,maxElevation:31+index*17,source:'calculated-demo' as const}))}
export function normalizeMinutes(value:number){return Math.max(0,Math.min(1440,Math.round(value)))}
export function manualLocation(latitude:string,longitude:string):Location|null{const lat=Number(latitude),lon=Number(longitude);if(!Number.isFinite(lat)||!Number.isFinite(lon)||lat < -90||lat > 90||lon < -180||lon > 180)return null;return{id:'manual',city:`Manual ${lat.toFixed(2)}, ${lon.toFixed(2)}`,lat,lon}}
