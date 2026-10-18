import {test} from 'node:test';import assert from 'node:assert/strict';import {satellites,coordinate,track} from '../src/model.js';
test('coordinates are periodic and latitude bounded',()=>{for(const s of satellites){assert.deepEqual(coordinate(s,45),coordinate(s,405));for(let i=-360;i<720;i+=15)assert.ok(Math.abs(coordinate(s,i)[1])<=s.inclination);}});
test('ground track is finite and within viewbox',()=>{for(const p of track(satellites[0])){assert.ok(p.every(Number.isFinite));assert.ok(p[0]>=0&&p[0]<=800&&p[1]>=0&&p[1]<=400);}});
