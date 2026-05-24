const HELP_LINES: { keys: string; action: string }[] = [
  { keys: 'Super+Alt+D', action: 'Abrir ou fechar o menu (launcher)' },
  { keys: 'Alt+Space', action: 'Abrir ou fechar o menu (launcher)' },
  { keys: 'Clique em "Menu"', action: 'Abrir o menu pela barra superior' },
  { keys: 'Digitar', action: 'Filtrar itens no menu' },
  { keys: '↑ / ↓ + Enter', action: 'Navegar e abrir uma janela' },
  { keys: 'Esc', action: 'Fechar menu ou janela focada' },
  { keys: 'Arrastar title bar', action: 'Mover janelas pela tela' },
]

const AVAILABLE_WINDOWS = [
  'Projetos',
  'Posts',
  'Sobre',
  'Guia',
  'Notas',
  'Minecraft',
  'Touhou',
  'Créditos',
]

export function GuideWindow() {
  return (
    <div className="space-y-3 font-mono text-xs">
      <div>
        <div className="text-[var(--text-primary)]">user@venes-website</div>
        <div className="text-[var(--text-muted)]">{'─'.repeat(28)}</div>
      </div>

      <p className="font-sans text-sm leading-relaxed text-[var(--text-muted)]">
        Bem-vindo! Este site funciona como um desktop Linux. Use o menu para abrir
        janelas e explore o conteúdo.
      </p>

      <div className="space-y-1">
        {HELP_LINES.map((line) => (
          <div key={line.keys} className="leading-snug">
            <span className="text-[var(--accent)]">{line.keys}</span>
            <span className="text-[var(--text-muted)]"> — </span>
            <span className="text-[var(--text-primary)]">{line.action}</span>
          </div>
        ))}
      </div>

      <div className="leading-snug">
        <span className="text-[var(--accent-green)]">Janelas</span>
        <span className="text-[var(--text-muted)]">: </span>
        <span className="text-[var(--text-primary)]">{AVAILABLE_WINDOWS.join(', ')}</span>
      </div>
    </div>
  )
}
