import { useEffect, useState } from 'react'
import { Button } from './primitives'

export function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle')
  useEffect(() => {
    if (state === 'idle') return
    const t = setTimeout(() => setState('idle'), 2000)
    return () => clearTimeout(t)
  }, [state])
  return (
    <>
      <Button
        variant="secondary"
        className="min-h-8 px-3 py-1 text-xs"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(text)
            setState('copied')
          } catch {
            setState('failed')
          }
        }}
      >
        {state === 'copied' ? 'Copied' : state === 'failed' ? 'Select and copy manually' : label}
      </Button>
      <span className="sr-only" aria-live="polite">
        {state === 'copied' ? 'Copied to clipboard' : state === 'failed' ? 'Copy failed' : ''}
      </span>
    </>
  )
}
