export interface CreditEntry {
  name: string
  role: string
  url?: string
  license?: string
}

export interface CreditSection {
  title: string
  items: CreditEntry[]
  note?: string
}

export const CREDIT_SECTIONS: CreditSection[] = [
  {
    title: 'Este site',
    items: [
      {
        name: 'Venes',
        role: 'Design, desenvolvimento e pseudo-OS',
        url: 'https://github.com/v-venes',
      },
    ],
  },
  {
    title: 'Fontes tipográficas',
    items: [
      {
        name: 'JetBrains Mono',
        role: 'Interface, boot, login e terminal',
        url: 'https://www.jetbrains.com/lp/mono/',
        license: 'SIL Open Font License 1.1',
      },
      {
        name: 'Inter',
        role: 'Textos longos dentro das janelas',
        url: 'https://rsms.me/inter/',
        license: 'SIL Open Font License 1.1',
      },
    ],
    note: 'Servidas via Google Fonts.',
  },
  {
    title: 'Tecnologias',
    items: [
      { name: 'React', role: 'Interface', url: 'https://react.dev/', license: 'MIT' },
      { name: 'Vite', role: 'Build e dev server', url: 'https://vite.dev/', license: 'MIT' },
      {
        name: 'Tailwind CSS',
        role: 'Estilização',
        url: 'https://tailwindcss.com/',
        license: 'MIT',
      },
      { name: 'Zustand', role: 'Estado global', url: 'https://zustand.docs.pmnd.rs/', license: 'MIT' },
    ],
  },
  {
    title: 'Jogos incorporados (iframe)',
    items: [
      {
        name: 'js-minecraft',
        role: 'Sandbox Minecraft no browser — LabyStudio',
        url: 'https://github.com/labystudio/js-minecraft',
        license: 'Projeto educacional; não afiliado à Mojang/Microsoft',
      },
      {
        name: 'toho-like-js',
        role: 'Danmaku inspirado em Touhou — Takahiro Kawashima (@suprehoge)',
        url: 'https://github.com/takahirox/toho-like-js',
        license: 'Fangame não oficial; assets creditados na página do jogo',
      },
    ],
    note: 'Estes jogos são easter eggs embedados via iframe. Não são desenvolvidos nem hospedados por este site.',
  }
]
