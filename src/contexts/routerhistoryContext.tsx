import React, { useEffect, useState } from 'react'
import { NavigateOptions, useLocation, useNavigate } from 'react-router-dom'

interface RouterHistoryContextType {
  routerHistory: string[]
  isNavigatingBack: boolean
  navigate: (to: string, options?: NavigateOptions | undefined) => void
}

const RouterHistoryContext = React.createContext<RouterHistoryContextType>({
  routerHistory: [],
  isNavigatingBack: false,
  navigate: () => {},
})

interface RouterHistoryProps {
  children: React.ReactNode
}

export function RouterHistoryProvider({ children }: RouterHistoryProps) {
  const _navigate = useNavigate()
  const [routerHistory, setRouterHistory] = useState<string[]>([])
  const [isNavigatingBack, setIsNavigatingBack] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setRouterHistory([...routerHistory, location.pathname])
  }, [location.pathname])

  const navigate = (to: string, options?: NavigateOptions | undefined) => {
    const lastLocation = routerHistory[routerHistory.length - 1]
    if (to.length < lastLocation.length) {
      setIsNavigatingBack(true)
    } else {
      setIsNavigatingBack(false)
    }
    _navigate(to, options)
  }

  return (
    <RouterHistoryContext.Provider
      value={{
        routerHistory,
        isNavigatingBack,
        navigate,
      }}
    >
      {children}
    </RouterHistoryContext.Provider>
  )
}

export const ConfigConsumer = RouterHistoryContext.Consumer

export default RouterHistoryContext
