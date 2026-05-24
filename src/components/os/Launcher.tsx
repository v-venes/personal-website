import { useEffect, useMemo, useRef, useState } from 'react'
import { LAUNCHER_ITEMS, useOsStore } from '../../lib/os-store'

export function Launcher() {
  const launcherOpen = useOsStore((s) => s.launcherOpen)
  const setLauncherOpen = useOsStore((s) => s.setLauncherOpen)
  const openWindow = useOsStore((s) => s.openWindow)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return LAUNCHER_ITEMS
    return LAUNCHER_ITEMS.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.keywords.some((k) => k.includes(q)),
    )
  }, [query])

  useEffect(() => {
    if (launcherOpen) {
      setQuery('')
      setSelectedIndex(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [launcherOpen])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  useEffect(() => {
    if (!launcherOpen) return

    const selected = listRef.current?.querySelector('[data-selected="true"]')
    selected?.scrollIntoView({ block: 'nearest' })
  }, [selectedIndex, launcherOpen, filtered])

  const selectItem = (index: number) => {
    const item = filtered[index]
    if (item) openWindow(item.id)
  }

  useEffect(() => {
    if (!launcherOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setLauncherOpen(false)
        return
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1))
        return
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((i) => Math.max(i - 1, 0))
        return
      }

      if (e.key === 'Enter') {
        e.preventDefault()
        selectItem(selectedIndex)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [launcherOpen, filtered, selectedIndex, setLauncherOpen, openWindow])

  if (!launcherOpen) return null

  return (
    <div
      className="absolute inset-0 z-50 flex items-start justify-center bg-black/50 pt-[15vh] backdrop-blur-sm"
      onClick={() => setLauncherOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Launcher"
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded border border-[var(--border)] bg-[var(--launcher-bg)] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Digite para filtrar..."
          className="w-full border-b border-[var(--border)] bg-transparent px-4 py-3 text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
          aria-label="Filtrar aplicativos"
          autoComplete="off"
        />
        <div ref={listRef} className="max-h-64 overflow-y-auto py-1" role="listbox">
          {filtered.length === 0 ? (
            <div className="px-4 py-3 text-sm text-[var(--text-muted)]">Nenhum resultado</div>
          ) : (
            filtered.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="option"
                aria-selected={index === selectedIndex}
                data-selected={index === selectedIndex}
                className={`flex w-full items-center px-4 py-2.5 text-left text-sm transition ${
                  index === selectedIndex
                    ? 'bg-[var(--accent)]/20 text-[var(--accent)]'
                    : 'text-[var(--text-primary)] hover:bg-[var(--bg-panel)]'
                }`}
                onMouseEnter={() => setSelectedIndex(index)}
                onClick={() => selectItem(index)}
              >
                {item.label}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
