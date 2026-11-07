import test from 'node:test';import assert from 'node:assert/strict';import {artisticOrbitRemaining} from '../src/model.js';
test('artisticOrbitRemaining complements normalized progress',()=>{assert.equal(artisticOrbitRemaining(0),100);assert.equal(artisticOrbitRemaining(180),50);assert.equal(artisticOrbitRemaining(359),0);});
