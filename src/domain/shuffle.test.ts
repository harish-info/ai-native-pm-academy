import { describe, expect, it } from 'vitest'
import { shuffled } from './shuffle'

describe('shuffled', () => {
  const items = Array.from({ length: 10 }, (_, i) => i)

  it('keeps every item and is stable for a seed', () => {
    expect([...shuffled(items, 'a')].sort((x, y) => x - y)).toEqual(items)
    expect(shuffled(items, 'a')).toEqual(shuffled(items, 'a'))
  })

  it('changes order between seeds', () => {
    expect(shuffled(items, 'quiz-1-0')).not.toEqual(shuffled(items, 'quiz-1-1'))
  })
})
