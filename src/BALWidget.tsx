import React, { useEffect, useState } from 'react'
import { StyledBALWidget } from './BALWidget.styles'
import MainButton from './components/MainButton/MainButton'
import Window from './components/Window/Window'
import { Route, Routes, useLocation } from 'react-router-dom'
import WecomePage from './pages/Welcome'
import Commune from './pages/Commune'
import GitBookEmbeded from './pages/GitbookEmbedded'
import Contact from './pages/Contact'
import { AnimatePresence } from 'framer-motion'

function BALWidget() {
  const [isExpanded, setIsExpanded] = useState(false)
  const location = useLocation()

  // Track location change on matomo
  useEffect(() => {
    const { pathname } = location
    window.parent.postMessage({ type: 'BAL_WIDGET_LOCATION', content: pathname }, '*')
  }, [location.pathname])

  // Send message to parent window when widget is expanded or collapsed
  useEffect(() => {
    const message = isExpanded ? { type: 'BAL_WIDGET_OPENED' } : { type: 'BAL_WIDGET_CLOSED' }
    window.parent.postMessage(message, '*')
  }, [isExpanded])

  return (
    <StyledBALWidget>
      <Window isExpanded={isExpanded} onClose={() => setIsExpanded(false)}>
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route index element={<WecomePage />} />
            <Route path='commune' element={<Commune />} />
            <Route path='gitbook' element={<GitBookEmbeded />} />
            <Route path='contact' element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </Window>
      <MainButton isExpanded={isExpanded} onClick={() => setIsExpanded((oldState) => !oldState)} />
    </StyledBALWidget>
  )
}

export default BALWidget
