import { create } from 'zustand'

export type Phase = 'boot' | 'login' | 'desktop'

export type WindowId = 'projects' | 'posts' | 'about' | 'guide' | 'notes' | 'minecraft' | 'touhou' | 'credits'

export interface WindowState {
  id: WindowId
  title: string
  x: number
  y: number
  width: number
  height: number
  zIndex: number
  minimized: boolean
}

export interface LauncherItem {
  id: WindowId
  label: string
  keywords: string[]
}

export const LAUNCHER_ITEMS: LauncherItem[] = [
  { id: 'projects', label: 'Projetos', keywords: ['projects', 'portfolio', 'work'] },
  { id: 'posts', label: 'Posts', keywords: ['blog', 'articles', 'writing'] },
  {
    id: 'about',
    label: 'Sobre',
    keywords: ['about', 'bio', 'skills', 'contact', 'email', 'github'],
  },
  { id: 'guide', label: 'Guia', keywords: ['help', 'guide', 'ajuda', 'atalhos', 'shortcuts'] },
  { id: 'notes', label: 'Notas', keywords: ['notes', 'notepad', 'bloco', 'texto', 'terminal'] },
  {
    id: 'minecraft',
    label: 'Minecraft',
    keywords: ['minecraft', 'game', 'jogo', 'mc', 'singleplayer'],
  },
  {
    id: 'touhou',
    label: 'Touhou',
    keywords: ['touhou', 'toho', 'danmaku', 'bullet hell', '東方', 'fangame'],
  },
  { id: 'credits', label: 'Créditos', keywords: ['credits', 'creditos', 'licença', 'fontes', 'attribution'] },
]

export const WINDOW_DEFAULTS: Record<
  WindowId,
  Pick<WindowState, 'title' | 'width' | 'height' | 'x' | 'y'>
> = {
  projects: { title: 'Projetos', width: 640, height: 480, x: 120, y: 80 },
  posts: { title: 'Posts', width: 600, height: 440, x: 180, y: 100 },
  about: { title: 'Sobre', width: 780, height: 440, x: 140, y: 64 },
  guide: { title: 'Guia', width: 380, height: 340, x: 0, y: 48 },
  notes: { title: 'Notas', width: 480, height: 360, x: 200, y: 120 },
  minecraft: { title: 'Minecraft', width: 960, height: 640, x: 80, y: 48 },
  touhou: { title: 'Touhou', width: 820, height: 620, x: 100, y: 56 },
  credits: { title: 'Créditos', width: 520, height: 480, x: 260, y: 80 },
}

const SESSION_KEY = 'os-session-ready'

interface OsStore {
  phase: Phase
  windows: WindowState[]
  focusedWindowId: WindowId | null
  launcherOpen: boolean
  nextZIndex: number
  setPhase: (phase: Phase) => void
  openWindow: (id: WindowId, position?: { x?: number; y?: number }) => void
  closeWindow: (id: WindowId) => void
  focusWindow: (id: WindowId) => void
  moveWindow: (id: WindowId, x: number, y: number) => void
  toggleLauncher: () => void
  setLauncherOpen: (open: boolean) => void
  restoreSession: () => boolean
  markSessionReady: () => void
}

export const useOsStore = create<OsStore>((set, get) => ({
  phase: 'boot',
  windows: [],
  focusedWindowId: null,
  launcherOpen: false,
  nextZIndex: 1,

  setPhase: (phase) => set({ phase }),

  openWindow: (id, position) => {
    const { windows, nextZIndex } = get()
    const existing = windows.find((w) => w.id === id)

    if (existing) {
      set({
        windows: windows.map((w) =>
          w.id === id ? { ...w, minimized: false, zIndex: nextZIndex } : w,
        ),
        focusedWindowId: id,
        launcherOpen: false,
        nextZIndex: nextZIndex + 1,
      })
      return
    }

    const defaults = WINDOW_DEFAULTS[id]
    set({
      windows: [
        ...windows,
        {
          id,
          ...defaults,
          x: position?.x ?? defaults.x,
          y: position?.y ?? defaults.y,
          zIndex: nextZIndex,
          minimized: false,
        },
      ],
      focusedWindowId: id,
      launcherOpen: false,
      nextZIndex: nextZIndex + 1,
    })
  },

  closeWindow: (id) => {
    const { windows, focusedWindowId } = get()
    const remaining = windows.filter((w) => w.id !== id)
    set({
      windows: remaining,
      focusedWindowId:
        focusedWindowId === id
          ? remaining.length > 0
            ? remaining[remaining.length - 1].id
            : null
          : focusedWindowId,
    })
  },

  focusWindow: (id) => {
    const { windows, nextZIndex } = get()
    set({
      windows: windows.map((w) =>
        w.id === id ? { ...w, zIndex: nextZIndex } : w,
      ),
      focusedWindowId: id,
      nextZIndex: nextZIndex + 1,
    })
  },

  moveWindow: (id, x, y) => {
    set({
      windows: get().windows.map((w) => (w.id === id ? { ...w, x, y } : w)),
    })
  },

  toggleLauncher: () => set({ launcherOpen: !get().launcherOpen }),

  setLauncherOpen: (open) => set({ launcherOpen: open }),

  restoreSession: () => {
    try {
      if (sessionStorage.getItem(SESSION_KEY) === 'true') {
        set({ phase: 'desktop' })
        return true
      }
    } catch {
      console.warn('Session storage is not available, session restoration failed.')
    }
    return false
  },

  markSessionReady: () => {
    try {
      sessionStorage.setItem(SESSION_KEY, 'true')
    } catch {
      console.warn('Session storage is not available, cannot mark session as ready.')
    }
  },
}))
