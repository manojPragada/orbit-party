import {test} from 'node:test';import assert from 'node:assert/strict';import {artisticLatitudeTrend} from '../src/model.js';
test('artistic latitude trend wraps without orbital claims',()=>{assert.match(artisticLatitudeTrend(0),/north.*illustration/);assert.match(artisticLatitudeTrend(180),/south.*illustration/);assert.equal(artisticLatitudeTrend('bad'),'unknown trend');});
