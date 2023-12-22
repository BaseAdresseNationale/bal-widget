import React, { useContext, useEffect, useState } from 'react'
import { StyledBALWidget } from './BALWidget.styles'
import MainButton from './components/MainButton/MainButton'
import Window from './components/Window/Window'
import { Route, Routes, useLocation } from 'react-router-dom'
import WecomePage from './pages/Welcome'
import Commune from './pages/Commune'
import GitBookEmbeded from './pages/GitbookEmbedded'
import Contact from './pages/Contact'
import { AnimatePresence } from 'framer-motion'
import { useLocationChange } from './hooks/useLocationChange'
import ConfigContext from './contexts/configContext'

function BALWidget() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)

  const location = useLocation()
  const config = useContext(ConfigContext)
  useLocationChange()

  useEffect(() => {
    if (!config) {
      return
    }
    const updateIsDisabled = () => {
      const availablePages = config.global.showOnPages || []
      const isWidgetHidden =
        config.global.hideWidget ||
        (availablePages.length > 0 && availablePages.every((page) => window.location.href !== page))
      setIsDisabled(isWidgetHidden)
    }

    window.addEventListener('locationchange', updateIsDisabled)
    updateIsDisabled()
    return () => {
      window.removeEventListener('locationchange', updateIsDisabled)
    }
  }, [config])

  const isWidgetDisplayed = !isDisabled || isExpanded

  return isWidgetDisplayed ? (
    <StyledBALWidget>
      <Window isExpanded={isExpanded}>
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route index element={<WecomePage />} />
            <Route path='commune' element={<Commune />} />
            <Route path='gitbook' element={<GitBookEmbeded />} />
            <Route path='contact' element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </Window>
      <MainButton isExpanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)} />
    </StyledBALWidget>
  ) : null
}

export default BALWidget
