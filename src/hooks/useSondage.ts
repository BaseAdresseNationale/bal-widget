import { useCallback, useMemo } from 'react'
import { Sondage } from '../contexts/configContext'

const STORAGE_PREFIX = 'bal-widget-sondage-'

export type SondageStatus = 'answered' | 'dismissed'

const getParentHostname = (): string => {
  // When embedded in an iframe, document.referrer points to the parent page.
  // Fallback to window.location.hostname when used standalone.
  if (typeof window === 'undefined') {
    return ''
  }
  if (document.referrer) {
    try {
      return new URL(document.referrer).hostname
    } catch {
      // ignore parse error
    }
  }
  return window.location.hostname
}

const matchesHostname = (site: string, hostname: string): boolean => {
  if (!site || !hostname) {
    return false
  }
  return hostname === site
}

export const getSondageStatus = (id: string): SondageStatus | null => {
  try {
    return window.localStorage.getItem(STORAGE_PREFIX + id) as SondageStatus | null
  } catch {
    return null
  }
}

export const setSondageStatus = (id: string, status: SondageStatus): void => {
  try {
    window.localStorage.setItem(STORAGE_PREFIX + id, status)
  } catch {
    // ignore storage error (quota, private mode, ...)
  }
}

export const useSondage = (sondages: Sondage[] | undefined) => {
  const matchingSondage = useMemo<Sondage | null>(() => {
    if (!sondages?.length) {
      return null
    }
    const hostname = getParentHostname()
    return sondages.find((s) => s.enabled && matchesHostname(s.site, hostname)) || null
  }, [sondages])

  // Sondage proposé à l'utilisateur (bouton sur la home) : visible tant qu'il n'a pas
  // répondu, même s'il l'a précédemment dismissé.
  const availableSondage = useMemo<Sondage | null>(() => {
    if (!matchingSondage) {
      return null
    }
    return getSondageStatus(matchingSondage.id) === 'answered' ? null : matchingSondage
  }, [matchingSondage])

  // Sondage qui déclenche l'ouverture automatique + wizz : uniquement si l'utilisateur
  // n'a ni répondu ni dismissé.
  const activeSondage = useMemo<Sondage | null>(() => {
    if (!matchingSondage) {
      return null
    }
    return getSondageStatus(matchingSondage.id) === null ? matchingSondage : null
  }, [matchingSondage])

  const dismissSondage = useCallback((id: string) => {
    setSondageStatus(id, 'dismissed')
  }, [])

  const markSondageAsAnswered = useCallback((id: string) => {
    setSondageStatus(id, 'answered')
  }, [])

  return { activeSondage, availableSondage, dismissSondage, markSondageAsAnswered }
}
