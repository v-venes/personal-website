import { useEffect, useState } from 'react'
import { useOsStore } from '../../lib/os-store'

const USERNAME = 'venes'
const PASSWORD = 'archlinux'
const CHAR_DELAY_MS = 60
const START_DELAY_MS = 800

export function LoginScreen() {
  const setPhase = useOsStore((s) => s.setPhase)
  const markSessionReady = useOsStore((s) => s.markSessionReady)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [phase, setLocalPhase] = useState<'typing-user' | 'typing-pass' | 'ready'>('typing-user')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    timers.push(
      setTimeout(() => {
        let i = 0
        const typeUser = () => {
          if (i <= USERNAME.length) {
            setUsername(USERNAME.slice(0, i))
            i++
            timers.push(setTimeout(typeUser, CHAR_DELAY_MS))
          } else {
            setLocalPhase('typing-pass')
            let j = 0
            const typePass = () => {
              if (j <= PASSWORD.length) {
                setPassword('•'.repeat(j))
                j++
                timers.push(setTimeout(typePass, CHAR_DELAY_MS))
              } else {
                setLocalPhase('ready')
              }
            }
            typePass()
          }
        }
        typeUser()
      }, START_DELAY_MS),
    )

    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (phase !== 'ready' || submitting) return

    const timer = setTimeout(() => {
      setSubmitting(true)
      markSessionReady()
      setPhase('desktop')
    }, 600)

    return () => clearTimeout(timer)
  }, [phase, submitting, setPhase, markSessionReady])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (phase !== 'ready') return
    setSubmitting(true)
    markSessionReady()
    setPhase('desktop')
  }

  return (
    <div className="flex h-full items-center justify-center bg-black animate-fade-in">
      <div className="w-full max-w-md px-6">
        <div className="mb-8 text-center">
          <div className="text-2xl font-semibold text-[var(--text-primary)]">user@venes-website</div>
          <div className="mt-1 text-sm text-[var(--text-muted)]">Personal Website — login</div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="mb-1 block text-xs text-[var(--text-muted)]">
              Usuário
            </label>
            <input
              id="username"
              type="text"
              value={username}
              readOnly
              className="w-full border border-[var(--border)] bg-[var(--bg-panel)] px-3 py-2 text-[var(--accent-green)] outline-none"
              autoComplete="off"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-xs text-[var(--text-muted)]">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              readOnly
              className="w-full border border-[var(--border)] bg-[var(--bg-panel)] px-3 py-2 text-[var(--accent-green)] outline-none"
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            disabled={phase !== 'ready' || submitting}
            className="w-full border border-[var(--border)] bg-[var(--bg-titlebar)] px-4 py-2 text-sm text-[var(--text-primary)] transition hover:border-[var(--accent)] disabled:opacity-50"
          >
            {submitting ? 'Entrando...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}
