import { MINECRAFT_IFRAME_URL } from '../../../lib/content/minecraft'

export function MinecraftWindow() {
  return (
    <div className="-m-4 flex h-[calc(100%+2rem)] flex-col">
      <iframe
        src={MINECRAFT_IFRAME_URL}
        title="Minecraft Web Client"
        className="min-h-0 flex-1 border-0 bg-black"
        allow="fullscreen; pointer-lock; gamepad"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="shrink-0 border-t border-[var(--border)] bg-[var(--bg-titlebar)] px-3 py-1 text-[10px] text-[var(--text-muted)]">
        Sandbox educacional · LabyStudio · não afiliado à Mojang/Microsoft ·{' '}
        <a
          href={MINECRAFT_IFRAME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--accent)] hover:underline"
        >
          abrir em nova aba
        </a>
      </div>
    </div>
  )
}
