import { describe, expect, it } from 'vitest'
import { sourceStates } from './sourceState'

describe('source-state disclosure', () => {
  it('never describes the demo as observed telemetry', () => {
    expect(sourceStates['calculated-demo'].positionType).toBe('calculated')
    expect(sourceStates['calculated-demo'].description.toLowerCase()).toContain('no tle or observed telemetry')
  })
  it('withholds positions for stale and failed future sources', () => {
    expect(sourceStates['stale-elements'].positionType).toBe('unavailable')
    expect(sourceStates['propagation-error'].positionType).toBe('unavailable')
  })
})
