import React, { useEffect, useState } from 'react'
import { useBALAdmin } from '../hooks/useBALAdmin'
import { isEmbeddedInIframe } from '../utils/iframe.utils'
export interface BALWidgetLink {
  label: string
  url: string
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
}

const ConfigContext = React.createContext<BALWidgetConfig | null>(null)

interface ConfigProviderProps {
  children: React.ReactNode
}

export function ConfigProvider({ children }: ConfigProviderProps) {
  const [config, setConfig] = useState<BALWidgetConfig | null>(null)
  const { getConfig } = useBALAdmin()
  const [isLoading, setIsLoading] = useState(true)
  const isEmbedded = isEmbeddedInIframe()

  useEffect(() => {
    function getConfigFromParent(event: { data: { type: string; content: BALWidgetConfig } }) {
      if (event.data.type === 'BAL_WIDGET_CONFIG') {
        setConfig(event.data.content)
        setIsLoading(false)
      }
    }

    async function fetchConfig() {
      const config = await getConfig()
      setConfig(config as BALWidgetConfig)
      setIsLoading(false)
    }

    if (isEmbedded) {
      window.parent.postMessage({ type: 'BAL_WIDGET_READY' }, window.parent.origin)
      window.addEventListener('message', getConfigFromParent)
    } else {
      fetchConfig()
    }

    return () => {
      isEmbedded && window.removeEventListener('message', getConfigFromParent)
    }
  }, [isEmbedded, getConfig])

  return <ConfigContext.Provider value={config}>{!isLoading && children}</ConfigContext.Provider>
}

export const ConfigConsumer = ConfigContext.Consumer

export default ConfigContext
