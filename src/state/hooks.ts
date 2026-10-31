import { useMemo } from 'react'
import { levels } from '../content'
import { levelStatuses, type LevelStatus } from '../domain/progress'
import { useStore } from './store'

export function useLevelStatuses(): LevelStatus[] {
  const { data } = useStore()
  return useMemo(() => levelStatuses(data, levels), [data])
}

export function useLevelStatus(levelId: number): LevelStatus | undefined {
  return useLevelStatuses().find((s) => s.level.id === levelId)
}
