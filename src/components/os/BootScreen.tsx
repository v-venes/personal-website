import { useEffect, useState, useCallback } from 'react'
import { useOsStore } from '../../lib/os-store'

const BOOT_LINES = [
  '[ OK ] Started systemd-journald.service',
  '[ OK ] Reached target Basic System',
  '[ OK ] Started NetworkManager.service',
  '[ OK ] Started personal-website.service',
  '[ OK ] Reached target Multi-User System',
  '',
  'Personal Website v1.0 — boot complete',
]

const LINE_DELAY_MS = 350
const MIN_BOOT_MS = 1500

export function BootScreen() {
  const setPhase = useOsStore((s) => s.setPhase)
  const [visibleLines, setVisibleLines] = useState<string[]>([])
  const [startedAt] = useState(() => Date.now())
  const [done, setDone] = useState(false)

  const skip = useCallback(() => {
    setPhase('login')
  }, [setPhase])

  useEffect(() => {
    if (done) {
      const timer = setTimeout(() => setPhase('login'), 400)
      return () => clearTimeout(timer)
    }

    if (visibleLines.length >= BOOT_LINES.length) {
      const elapsed = Date.now() - startedAt
      const remaining = Math.max(0, MIN_BOOT_MS - elapsed)
      const timer = setTimeout(() => setDone(true), remaining)
      return () => clearTimeout(timer)
    }

    const timer = setTimeout(() => {
      setVisibleLines((prev) => [...prev, BOOT_LINES[prev.length]])
    }, LINE_DELAY_MS)

    return () => clearTimeout(timer)
  }, [visibleLines, done, startedAt, setPhase])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        skip()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [skip])

  return (
    <div
      className="flex h-full flex-col bg-black p-6 text-sm text-[var(--accent-green)] animate-fade-in cursor-pointer select-none"
      onClick={skip}
      role="status"
      aria-live="polite"
      aria-label="Boot screen"
    >
      <div className="mb-4 text-[var(--text-muted)]">
        Personal Website — booting...
      </div>
      <div className="flex flex-1 flex-col gap-1 font-mono">
        {visibleLines.map((line, i) => (
          <div key={i} className={line.startsWith('[ OK ]') ? '' : 'text-[var(--text-primary)]'}>
            {line || '\u00A0'}
          </div>
        ))}
        {!done && <div className="cursor-blink">&nbsp;</div>}
      </div>
      <div className="text-xs text-[var(--text-muted)]">
        Pressione Enter ou clique para pular
      </div>
    </div>
  )
}
