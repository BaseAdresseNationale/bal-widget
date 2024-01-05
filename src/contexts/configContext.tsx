import React, { useEffect, useState } from 'react'
import { useBALAdmin } from '../hooks/useBALAdmin'

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
  gitbook: {
    welcomeBlockTitle: string
    topArticles: BALWidgetLink[]
  }
  commune: {
    outdatedApiDepotClients: string[]
    outdatedHarvestSources: string[]
  }
  contactUs: {
    welcomeBlockTitle: string
    subjects: string[]
  }
}

const ConfigContext = React.createContext<BALWidgetConfig | null>(null)

interface ConfigProviderProps {
  children: React.ReactNode
}

export function ConfigProvider({ children }: ConfigProviderProps) {
  const [config, setConfig] = useState<BALWidgetConfig | null>(null)
  const { getConfig } = useBALAdmin()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchConfig() {
      setIsLoading(true)
      const config = await getConfig()
      setConfig(config as BALWidgetConfig)
      setIsLoading(false)
    }

    fetchConfig()
  }, [getConfig])

  return <ConfigContext.Provider value={config}>{!isLoading && children}</ConfigContext.Provider>
}

export const ConfigConsumer = ConfigContext.Consumer

export default ConfigContext
