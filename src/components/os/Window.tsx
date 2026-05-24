import { useRef, type ReactNode } from 'react'
import { useOsStore, type WindowId } from '../../lib/os-store'

interface WindowProps {
  id: WindowId
  title: string
  x: number
  y: number
  width: number
  height: number
  zIndex: number
  focused: boolean
  children: ReactNode
}

export function Window({
  id,
  title,
  x,
  y,
  width,
  height,
  zIndex,
  focused,
  children,
}: WindowProps) {
  const closeWindow = useOsStore((s) => s.closeWindow)
  const focusWindow = useOsStore((s) => s.focusWindow)
  const moveWindow = useOsStore((s) => s.moveWindow)
  const dragRef = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(
    null,
  )

  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('button')) return
    focusWindow(id)
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: x,
      origY: y,
    }
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return
    const dx = e.clientX - dragRef.current.startX
    const dy = e.clientY - dragRef.current.startY
    moveWindow(id, dragRef.current.origX + dx, dragRef.current.origY + dy)
  }

  const onPointerUp = (e: React.PointerEvent) => {
    dragRef.current = null
    ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
  }

  return (
    <div
      className={`absolute flex flex-col overflow-hidden border bg-[var(--bg-panel)] shadow-xl transition-shadow ${
        focused ? 'border-[var(--accent)]/50 shadow-[var(--accent)]/10' : 'border-[var(--border)]'
      } max-sm:inset-4 max-sm:!h-auto max-sm:!w-auto max-sm:max-h-[calc(100%-5rem)]`}
      style={{
        left: x,
        top: y,
        width,
        height,
        zIndex,
      }}
      onMouseDown={() => focusWindow(id)}
      role="dialog"
      aria-label={title}
    >
      <div
        className="flex h-8 shrink-0 cursor-grab items-center justify-between border-b border-[var(--border)] bg-[var(--bg-titlebar)] px-2 active:cursor-grabbing max-sm:cursor-default"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <span className="truncate px-2 text-xs text-[var(--text-muted)]">{title}</span>
        <button
          type="button"
          onClick={() => closeWindow(id)}
          className="flex h-6 w-6 items-center justify-center text-[var(--text-muted)] transition hover:bg-[var(--accent-red)]/20 hover:text-[var(--accent-red)]"
          aria-label={`Fechar ${title}`}
        >
          ×
        </button>
      </div>
      <div className="flex-1 overflow-auto p-4 font-sans text-sm">{children}</div>
    </div>
  )
}
