export type SourceCondition = 'calculated-demo' | 'stale-elements' | 'propagation-error'

export const sourceStates: Readonly<Record<SourceCondition, { label: string; positionType: 'calculated' | 'unavailable'; description: string }>> = {
  'calculated-demo': { label: 'Calculated fixture', positionType: 'calculated', description: 'Deterministic display geometry. No TLE or observed telemetry is loaded.' },
  'stale-elements': { label: 'Stale source', positionType: 'unavailable', description: 'Future adapters must stop presenting positions when their element age exceeds a documented provider cadence.' },
  'propagation-error': { label: 'Propagation unavailable', positionType: 'unavailable', description: 'Invalid elements or propagation failures must produce an error state instead of a guessed position.' },
}
