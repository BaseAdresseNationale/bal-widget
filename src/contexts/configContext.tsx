import React, { useEffect, useState } from 'react'
import { useBALAdmin } from '../hooks/useBALAdmin'
import { useLocationChange } from '../hooks/useLocationChange'

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
  const [showWidget, setShowWidget] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  useLocationChange()

  useEffect(() => {
    async function fetchConfig() {
      setIsLoading(true)
      const config = await getConfig()
      setConfig(config as BALWidgetConfig)
      setIsLoading(false)
    }

    fetchConfig()
  }, [getConfig])

  useEffect(() => {
    if (!config) {
      return
    }
    const updateShowWidget = () => {
      const availablePages = config.global.showOnPages || []
      const hideWidget =
        config.global.hideWidget || availablePages.every((page) => window.location.href !== page)
      setShowWidget(!hideWidget)
    }

    window.addEventListener('locationchange', updateShowWidget)
    updateShowWidget()
    return () => {
      window.removeEventListener('locationchange', updateShowWidget)
    }
  }, [config])

  return (
    <ConfigContext.Provider value={config}>
      {!isLoading && showWidget && children}
    </ConfigContext.Provider>
  )
}

export const ConfigConsumer = ConfigContext.Consumer

export default ConfigContext
