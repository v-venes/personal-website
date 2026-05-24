export interface Project {
  slug: string
  title: string
  description: string
  tech: string[]
  url?: string
  github?: string
}

export const projects: Project[] = [
  {
    slug: 'personal-website',
    title: 'Personal Website',
    description:
      'Este site — um portfólio pessoal que emula uma distro Linux com window manager flutuante.',
    tech: ['React', 'Vite', 'TypeScript', 'Tailwind'],
    github: 'https://github.com/v-venes/personal-website',
  },
  {
    slug: 'cli-tool',
    title: 'CLI Tool',
    description:
      'Ferramenta de linha de comando para automatizar tarefas do dia a dia de desenvolvimento.',
    tech: ['Rust', 'Clap'],
    github: 'https://github.com/v-venes',
  },
  {
    slug: 'api-service',
    title: 'API Service',
    description:
      'Serviço REST com autenticação, cache e observabilidade para aplicações web.',
    tech: ['Go', 'PostgreSQL', 'Redis'],
    url: 'https://example.com',
    github: 'https://github.com/v-venes',
  },
]
