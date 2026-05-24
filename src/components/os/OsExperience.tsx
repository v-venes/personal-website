import { useEffect } from 'react'
import { useOsStore } from '../../lib/os-store'
import { BootScreen } from './BootScreen'
import { LoginScreen } from './LoginScreen'
import { Desktop } from './Desktop'

export function OsExperience() {
  const phase = useOsStore((s) => s.phase)
  const restoreSession = useOsStore((s) => s.restoreSession)

  useEffect(() => {
    restoreSession()
  }, [restoreSession])

  if (phase === 'boot') return <BootScreen />
  if (phase === 'login') return <LoginScreen />
  return <Desktop />
}
