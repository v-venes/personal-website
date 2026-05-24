import { useEffect } from 'react'
import { WINDOW_DEFAULTS, useOsStore } from '../../lib/os-store'
import { Panel } from './Panel'
import { Launcher } from './Launcher'
import { WindowManager } from './WindowManager'

export function useKeyboardShortcuts() {
  const toggleLauncher = useOsStore((s) => s.toggleLauncher)
  const setLauncherOpen = useOsStore((s) => s.setLauncherOpen)
  const launcherOpen = useOsStore((s) => s.launcherOpen)
  const closeWindow = useOsStore((s) => s.closeWindow)
  const focusedWindowId = useOsStore((s) => s.focusedWindowId)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.altKey && e.key === 'd') {
        e.preventDefault()
        toggleLauncher()
        return
      }

      if (e.altKey && e.key === ' ') {
        e.preventDefault()
        toggleLauncher()
        return
      }

      if (e.key === 'Escape') {
        if (launcherOpen) {
          setLauncherOpen(false)
          return
        }
        if (focusedWindowId) {
          closeWindow(focusedWindowId)
        }
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [toggleLauncher, setLauncherOpen, launcherOpen, closeWindow, focusedWindowId])
}

export function Desktop() {
  useKeyboardShortcuts()
  const openWindow = useOsStore((s) => s.openWindow)

  useEffect(() => {
    openWindow('about')

    const { width } = WINDOW_DEFAULTS.guide
    const margin = 16
    const panelHeight = 32
    const x = Math.max(margin, window.innerWidth - width - margin)
    const y = panelHeight + margin

    openWindow('guide', { x, y })
  }, [openWindow])

  return (
    <div className="relative flex h-full flex-col animate-fade-in">
      <Panel />
      <main
        className="relative flex-1 overflow-hidden"
        style={{
          background:
            'radial-gradient(ellipse at 30% 20%, #161b22 0%, #0d1117 50%, #010409 100%)',
        }}
      >
        <WindowManager />
        <Launcher />
      </main>
    </div>
  )
}
