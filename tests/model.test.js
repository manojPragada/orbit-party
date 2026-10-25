import {test} from 'node:test';import assert from 'node:assert/strict';import {satellites,coordinate,track,advancePhase,viewFromURL,angularSeparation,customObserver,formatCoordinate,artisticTerminatorX} from '../src/model.js';
test('coordinates are periodic and latitude bounded',()=>{for(const s of satellites){assert.deepEqual(coordinate(s,45),coordinate(s,405));for(let i=-360;i<720;i+=15)assert.ok(Math.abs(coordinate(s,i)[1])<=s.inclination);}});
test('ground track is finite and within viewbox',()=>{for(const p of track(satellites[0])){assert.ok(p.every(Number.isFinite));assert.ok(p[0]>=0&&p[0]<=800&&p[1]>=0&&p[1]<=400);}});


test('ground track never jumps back across the map seam',()=>{for(const satellite of satellites){const points=track(satellite);assert.equal(points[0][0],0);assert.equal(points.at(-1)[0],800);for(let i=1;i<points.length;i++)assert.ok(points[i][0]-points[i-1][0]>0&&points[i][0]-points[i-1][0]<12);}});
test('phase advancement is time-based, periodic and bounded',()=>{assert.ok(Math.abs(advancePhase(0,700)-10)<1e-9);assert.ok(Math.abs(advancePhase(355,700)-5)<1e-9);assert.equal(advancePhase(50,-100),50);assert.equal(advancePhase(NaN,100),0);assert.ok(advancePhase(0,100000)<15);});
test('shareable views accept known satellites and normalize phase',()=>{assert.equal(viewFromURL('/?satellite=polar-demo&phase=390').satellite.id,'polar-demo');assert.equal(viewFromURL('/?satellite=polar-demo&phase=390').phase,30);assert.equal(viewFromURL('/?satellite=unknown&phase=oops').satellite.id,'iss-demo');assert.equal(viewFromURL('/?phase=-15').phase,345);});
test('artistic ground separation is spherical, symmetric and bounded',()=>{assert.equal(angularSeparation([0,0],[0,0]),0);assert.ok(Math.abs(angularSeparation([0,0],[180,0])-180)<1e-9);assert.ok(Math.abs(angularSeparation([10,20],[-40,50])-angularSeparation([-40,50],[10,20]))<1e-9);});
test('custom observer coordinates are finite and geographically bounded',()=>{assert.deepEqual(customObserver('-79.38','43.65').coordinate,[-79.38,43.65]);assert.equal(customObserver('',0),null);assert.equal(customObserver(181,0),null);assert.equal(customObserver(0,-91),null);assert.equal(customObserver('north',10),null);});
test('coordinates are readable with cardinal directions',()=>{assert.equal(formatCoordinate([-79.38,43.65]),'43.6°N / 79.4°W');assert.equal(formatCoordinate([151.21,-33.87]),'33.9°S / 151.2°E');});
test('artistic boundary wraps with phase',()=>{assert.equal(artisticTerminatorX(0),0);assert.equal(artisticTerminatorX(180),400);assert.equal(artisticTerminatorX(450),200);assert.equal(artisticTerminatorX('bad'),0);});


