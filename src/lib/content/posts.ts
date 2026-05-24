export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
}

export const posts: Post[] = [
  {
    slug: 'building-pseudo-os',
    title: 'Construindo um pseudo-OS no browser',
    date: '2026-05-20',
    excerpt: 'Como emular boot, login e window manager com React.',
    content: `Sempre quis um portfólio que refletisse minha identidade como desenvolvedor Linux.

A ideia foi simples: boot screen, login automático e um desktop minimalista sem ícones — tudo navegável via um launcher estilo rofi.

O window manager é flutuante (não-tiling), com janelas arrastáveis e múltiplas abertas ao mesmo tempo.`,
  },
  {
    slug: 'why-vite',
    title: 'Por que Vite para este projeto',
    date: '2026-05-15',
    excerpt: 'SPA pura, HMR rápido e build estático enxuto.',
    content: `Para uma experiência 100% client-side como esta, Vite + React é a combinação ideal.

Sem necessidade de SSR ou rotas — todo o estado vive no browser, e o deploy é um bundle estático.`,
  },
]
