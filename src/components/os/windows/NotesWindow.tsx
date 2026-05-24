import { useState } from 'react'

export function NotesWindow() {
  const [text, setText] = useState('')

  return (
    <div className="-m-4 flex h-[calc(100%+2rem)] flex-col bg-black font-mono text-sm">
      <div className="shrink-0 border-b border-[var(--border)] px-3 py-1.5 text-xs text-[var(--accent-green)]">
        user@venes-website:~/notes$
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escreva aqui..."
        spellCheck={false}
        className="min-h-0 flex-1 resize-none border-0 bg-black px-3 py-2 font-mono text-sm leading-relaxed text-[var(--accent-green)] outline-none placeholder:text-[var(--text-muted)]/50 caret-[var(--accent-green)]"
        aria-label="Bloco de notas"
      />
    </div>
  )
}
