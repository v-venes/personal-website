import { useState } from 'react'
import { posts } from '../../../lib/content/posts'

export function PostsWindow() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const selected = posts.find((p) => p.slug === selectedSlug)

  if (selected) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setSelectedSlug(null)}
          className="mb-4 text-xs text-[var(--accent)] hover:underline"
        >
          ← Voltar
        </button>
        <h3 className="text-lg font-medium text-[var(--text-primary)]">{selected.title}</h3>
        <time className="text-xs text-[var(--text-muted)]">{selected.date}</time>
        <div className="mt-4 whitespace-pre-line text-[var(--text-muted)] leading-relaxed">
          {selected.content}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {posts.map((post) => (
        <button
          key={post.slug}
          type="button"
          onClick={() => setSelectedSlug(post.slug)}
          className="block w-full rounded border border-[var(--border)] bg-[var(--bg-base)] p-4 text-left transition hover:border-[var(--accent)]/50"
        >
          <h3 className="font-medium text-[var(--text-primary)]">{post.title}</h3>
          <time className="text-xs text-[var(--text-muted)]">{post.date}</time>
          <p className="mt-1 text-sm text-[var(--text-muted)]">{post.excerpt}</p>
        </button>
      ))}
    </div>
  )
}
