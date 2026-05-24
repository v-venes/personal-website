import { Suspense, lazy, type ReactNode } from 'react'
import { useOsStore, type WindowId } from '../../lib/os-store'
import { Window } from './Window'

const ProjectsWindow = lazy(() =>
  import('./windows/ProjectsWindow').then((m) => ({ default: m.ProjectsWindow })),
)
const PostsWindow = lazy(() =>
  import('./windows/PostsWindow').then((m) => ({ default: m.PostsWindow })),
)
const AboutWindow = lazy(() =>
  import('./windows/AboutWindow').then((m) => ({ default: m.AboutWindow })),
)
const GuideWindow = lazy(() =>
  import('./windows/GuideWindow').then((m) => ({ default: m.GuideWindow })),
)
const NotesWindow = lazy(() =>
  import('./windows/NotesWindow').then((m) => ({ default: m.NotesWindow })),
)
const MinecraftWindow = lazy(() =>
  import('./windows/MinecraftWindow').then((m) => ({ default: m.MinecraftWindow })),
)
const TouhouWindow = lazy(() =>
  import('./windows/TouhouWindow').then((m) => ({ default: m.TouhouWindow })),
)
const CreditsWindow = lazy(() =>
  import('./windows/CreditsWindow').then((m) => ({ default: m.CreditsWindow })),
)

const WINDOW_CONTENT: Record<WindowId, ReactNode> = {
  projects: <ProjectsWindow />,
  posts: <PostsWindow />,
  about: <AboutWindow />,
  guide: <GuideWindow />,
  notes: <NotesWindow />,
  minecraft: <MinecraftWindow />,
  touhou: <TouhouWindow />,
  credits: <CreditsWindow />,
}

function WindowContent({ id }: { id: WindowId }) {
  return (
    <Suspense
      fallback={<div className="text-[var(--text-muted)]">Carregando...</div>}
    >
      {WINDOW_CONTENT[id]}
    </Suspense>
  )
}

export function WindowManager() {
  const windows = useOsStore((s) => s.windows)
  const focusedWindowId = useOsStore((s) => s.focusedWindowId)

  return (
    <>
      {windows
        .filter((w) => !w.minimized)
        .map((w) => (
          <Window
            key={w.id}
            id={w.id}
            title={w.title}
            x={w.x}
            y={w.y}
            width={w.width}
            height={w.height}
            zIndex={w.zIndex}
            focused={focusedWindowId === w.id}
          >
            <WindowContent id={w.id} />
          </Window>
        ))}
    </>
  )
}
