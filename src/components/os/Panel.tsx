import { useEffect, useState } from 'react'
import { useOsStore } from '../../lib/os-store'

export function Panel() {
  const toggleLauncher = useOsStore((s) => s.toggleLauncher)
  const [time, setTime] = useState(() => formatTime(new Date()))

  useEffect(() => {
    const id = setInterval(() => setTime(formatTime(new Date())), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <header className="flex h-8 shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--bg-titlebar)] px-3 text-xs">
      <div className="flex items-center gap-4">
        <span className="text-[var(--text-muted)]">ws:1</span>
        <button
          type="button"
          onClick={toggleLauncher}
          className="text-[var(--text-muted)] transition hover:text-[var(--accent)]"
          aria-label="Abrir launcher (Super+Alt+D)"
        >
          <span className="hidden sm:inline">Super+Alt+D — menu</span>
          <span className="sm:hidden">Menu</span>
        </button>
      </div>
      <div className="flex items-center gap-4 text-[var(--text-muted)]">
        <span>user@venes-website</span>
        <time>{time}</time>
      </div>
    </header>
  )
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })
}
