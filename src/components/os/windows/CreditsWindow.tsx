import { CREDIT_SECTIONS } from '../../../lib/content/credits'

function CreditItem({ name, role, url, license }: (typeof CREDIT_SECTIONS)[0]['items'][0]) {
  return (
    <div className="leading-snug">
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--accent)] hover:underline"
        >
          {name}
        </a>
      ) : (
        <span className="text-[var(--text-primary)]">{name}</span>
      )}
      <span className="text-[var(--text-muted)]"> — {role}</span>
      {license && (
        <div className="text-[10px] text-[var(--text-muted)]/80">{license}</div>
      )}
    </div>
  )
}

export function CreditsWindow() {
  return (
    <div className="space-y-4 font-mono text-xs">
      <div>
        <div className="text-[var(--text-primary)]">user@venes-website:~/credits</div>
        <div className="text-[var(--text-muted)]">{'─'.repeat(28)}</div>
      </div>

      {CREDIT_SECTIONS.map((section) => (
        <section key={section.title}>
          <h3 className="mb-1.5 text-[var(--accent-green)]">{section.title}</h3>
          <div className="space-y-1.5">
            {section.items.map((item) => (
              <CreditItem key={`${section.title}-${item.name}`} {...item} />
            ))}
          </div>
          {section.note && (
            <p className="mt-1.5 font-sans text-[11px] leading-relaxed text-[var(--text-muted)]">
              {section.note}
            </p>
          )}
        </section>
      ))}
    </div>
  )
}
