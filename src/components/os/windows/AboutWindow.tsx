const SNOWFLAKE = `⠄⠄⠄⠄⠄⠄⠄⠄⣀⡀⠄⣴⡆⠄⢀⡀⠄⠄⠄⠄⠄⠄⠄⠄
⠄⠄⠄⠄⠄⢠⣤⠄⠙⢿⣆⣿⣇⣴⡿⠋⣼⡇⠄⢀⡀⠄⠄⠄
⠄⠄⠄⢠⣄⡈⢿⣆⠄⠄⠹⣿⡿⠋⠄⢠⣿⣥⣶⠿⠃⠄⠄⠄
⠄⠄⠄⠈⠙⢻⣿⣿⣆⡀⠄⣿⡇⢀⣤⣾⢿⣿⣶⣤⣤⠄⠄⠄
⠄⠄⠄⠶⠿⠟⠛⠉⠙⠻⣿⣿⣿⣿⠋⠄⠄⠄⠄⠄⠁⠄⠄⠄
⠄⠄⠄⣴⣦⣤⣤⣤⣤⣾⠿⢿⡿⠿⢷⣦⣤⣶⡾⠿⠛⠄⠄⠄
⠄⠄⠄⠄⢀⣬⣿⣿⡟⠄⠄⢸⡇⠄⠄⠈⢿⡿⠿⣶⣤⠄⠄⠄
⠄⠄⠄⠄⠛⠉⢠⣿⠁⠄⣴⣿⣿⣦⠄⠄⠘⣿⡄⠄⠉⠄⠄⠄
⠄⠄⠄⠄⠄⠄⠘⠋⣠⡾⠋⢸⡇⠙⢷⣄⠄⠈⠁⠄⠄⠄⠄⠄
⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠸⠇⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄`

const INFO_LINES: { label: string; value: string; href?: string }[] = [
  { label: 'OS', value: 'venes-os x86_64' },
  { label: 'Host', value: 'venes-website' },
  { label: 'Kernel', value: 'Linux 7.0.9-arch1-1' },
  { label: 'Shell', value: 'zsh' },
  { label: 'WM', value: 'floating' },
  { label: 'Terminal', value: 'browser' },
  { label: 'Role', value: 'Desenvolvedor de Software' },
  { label: 'Email', value: 'venes.dev@gmail.com', href: 'mailto:venes.dev@gmail.com' },
  { label: 'GitHub', value: 'github.com/v-venes', href: 'https://github.com/v-venes' },
  { label: 'LinkedIn', value: 'linkedin.com/in/victor-neves99', href: 'https://linkedin.com/in/victor-neves99' },
]

const SKILLS = ['TypeScript', 'React', 'Go', 'Linux', 'Docker', 'Terraform', 'AWS']

function SnowflakeArt() {
  return (
    <pre
      className="shrink-0 text-[11px] leading-[1.15] text-[#58a6ff] select-none sm:text-[13px]"
      aria-hidden="true"
    >
      {SNOWFLAKE}
    </pre>
  )
}

function InfoLine({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="leading-snug">
      <span className="text-[var(--accent-green)]">{label}</span>
      <span className="text-[var(--text-muted)]">: </span>
      {href ? (
        <a
          href={href}
          target={href.startsWith('mailto') ? undefined : '_blank'}
          rel="noopener noreferrer"
          className="text-[var(--text-primary)] hover:text-[var(--accent)] hover:underline"
        >
          {value}
        </a>
      ) : (
        <span className="text-[var(--text-primary)]">{value}</span>
      )}
    </div>
  )
}

export function AboutWindow() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
      <SnowflakeArt />

      <div className="min-w-0 flex-1 space-y-3 font-mono text-xs">
        <div>
          <div className="text-[var(--text-primary)]">user@venes-website</div>
          <div className="text-[var(--text-muted)]">{'─'.repeat(28)}</div>
        </div>

        <div className="space-y-0.5">
          {INFO_LINES.map((line) => (
            <InfoLine key={line.label} {...line} />
          ))}
        </div>

        <div>
          <span className="text-[var(--accent-green)]">Skills</span>
          <span className="text-[var(--text-muted)]">: </span>
          <span className="text-[var(--text-primary)]">{SKILLS.join(', ')}</span>
        </div>

        <p className="font-sans text-sm leading-relaxed text-[var(--text-muted)]">
          Sou um desenvolvedor de software curioso e entusiasta de novas tecnologias.
          Este site é meu portfólio pessoal — disfarçado de uma sessão de desktop.
        </p>
      </div>
    </div>
  )
}
