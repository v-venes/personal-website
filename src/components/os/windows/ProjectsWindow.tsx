import { projects } from '../../../lib/content/projects'

export function ProjectsWindow() {
  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <article
          key={project.slug}
          className="rounded border border-[var(--border)] bg-[var(--bg-base)] p-4"
        >
          <h3 className="font-medium text-[var(--text-primary)]">{project.title}</h3>
          <p className="mt-1 text-[var(--text-muted)]">{project.description}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded bg-[var(--bg-titlebar)] px-2 py-0.5 text-xs text-[var(--accent)]"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-3 flex gap-3 text-xs">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:underline"
              >
                Demo
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:underline"
              >
                GitHub
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}
