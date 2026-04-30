import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useBALAdmin } from '../hooks/useBALAdmin'
import { useSondage } from '../hooks/useSondage'
import { isEmbeddedInIframe } from '../utils/iframe.utils'
import RouterHistoryContext from './routerhistoryContext'
export interface BALWidgetLink {
  label: string
  url: string
}

export type SondageQuestionType = 'rating-5-stars' | 'free-text'

export interface SondageQuestion {
  id: string
  type: SondageQuestionType
  label: string
}

export interface Sondage {
  id: string
  name: string
  enabled: boolean
  site: string
  questions: SondageQuestion[]
}

export interface BALWidgetConfig {
  global: {
    title: string
    hideWidget: boolean
    showOnPages: string[]
  }
  gitbookCommunes: {
    welcomeBlockTitle: string
    topArticles: BALWidgetLink[]
  }
  communes: {
    welcomeBlockTitle: string
    outdatedApiDepotClients: string[]
    outdatedHarvestSources: string[]
  }
  contactUs: {
    welcomeBlockTitle: string
    subjects: string[]
  }
  gitbookParticuliers: {
    welcomeBlockTitle: string
    topArticles: BALWidgetLink[]
  }
  sondages: Sondage[]
}

interface ConfigContextType {
  config: BALWidgetConfig | null
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  parentNavigateTo: (url: { href: string; target?: string }) => void
  activeSondage: Sondage | null
  availableSondage: Sondage | null
  dismissActiveSondage: () => void
  markActiveSondageAsAnswered: () => void
}

const ConfigContext = React.createContext<ConfigContextType>({
  config: null,
  isOpen: false,
  setIsOpen: () => {},
  parentNavigateTo: () => {},
  activeSondage: null,
  availableSondage: null,
  dismissActiveSondage: () => {},
  markActiveSondageAsAnswered: () => {},
})

interface ConfigProviderProps {
  children: React.ReactNode
}

export function ConfigProvider({ children }: ConfigProviderProps) {
  const [config, setConfig] = useState<BALWidgetConfig | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const { navigate } = useContext(RouterHistoryContext)

  const { getConfig } = useBALAdmin()
  const [isLoading, setIsLoading] = useState(true)
  const isEmbedded = isEmbeddedInIframe()

  const { activeSondage, availableSondage, dismissSondage, markSondageAsAnswered } = useSondage(
    config?.sondages,
  )

  const dismissActiveSondage = useCallback(() => {
    if (availableSondage) {
      dismissSondage(availableSondage.id)
    }
  }, [availableSondage, dismissSondage])

  const markActiveSondageAsAnswered = useCallback(() => {
    if (availableSondage) {
      markSondageAsAnswered(availableSondage.id)
    }
  }, [availableSondage, markSondageAsAnswered])

  const parentNavigateTo = (content: { href: string; target?: string }) => {
    window.parent.postMessage({ type: 'BAL_WIDGET_PARENT_NAVIGATE_TO', content }, '*')
  }

  useEffect(() => {
    function getEventsFromParent(event: {
      data: { type: string; content: BALWidgetConfig | string }
    }) {
      if (event.data.type === 'BAL_WIDGET_CONFIG') {
        setConfig(event.data.content as BALWidgetConfig)
        setIsLoading(false)
        window.parent.postMessage({ type: 'BAL_WIDGET_CONFIG_LOADED' }, '*')
      }
      if (event.data.type === 'BAL_WIDGET_OPEN') {
        setIsOpen(true)
      }
      if (event.data.type === 'BAL_WIDGET_CLOSE') {
        setIsOpen(false)
      }
      if (event.data.type === 'BAL_WIDGET_NAVIGATE') {
        navigate(event.data.content as string)
      }
    }

    async function fetchConfig() {
      const config = await getConfig()
      setConfig(config as BALWidgetConfig)
      setIsLoading(false)
    }

    if (isEmbedded) {
      window.addEventListener('message', getEventsFromParent)
      // TODO : Remove this message after migration
      window.parent.postMessage({ type: 'BAL_WIDGET_READY' }, '*')
    } else {
      fetchConfig()
    }

    return () => {
      isEmbedded && window.removeEventListener('message', getEventsFromParent)
    }
  }, [isEmbedded, getConfig])

  const value = useMemo(
    () => ({
      config,
      isOpen,
      setIsOpen,
      parentNavigateTo,
      activeSondage,
      availableSondage,
      dismissActiveSondage,
      markActiveSondageAsAnswered,
    }),
    [
      config,
      isOpen,
      activeSondage,
      availableSondage,
      dismissActiveSondage,
      markActiveSondageAsAnswered,
    ],
  )

  return <ConfigContext.Provider value={value}>{!isLoading && children}</ConfigContext.Provider>
}

export const ConfigConsumer = ConfigContext.Consumer

export default ConfigContext
