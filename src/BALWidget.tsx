import React, { useContext, useEffect, useState } from 'react'
import { StyledBALWidget } from './BALWidget.styles'
import MainButton from './components/common/MainButton/MainButton'
import Window from './components/common/Window/Window'
import { Route, Routes, useLocation } from 'react-router-dom'
import HomePage from './pages'
import { AnimatePresence } from 'framer-motion'
import CommuneWelcomePage from './pages/commune'
import ParticulierWelcomePage from './pages/particulier'
import GitBookEmbededPage from './pages/common/GitBookEmbededPage'
import CommuneBALStatusPage from './pages/commune/CommuneBALStatusPage'
import ContactPage from './pages/commune/ContactPage'
import ConfigContext from './contexts/configContext'
import ParticulierTroubleshootingPage from './pages/particulier/ParticulierTroubleshootingPage'
import AdresseProblemFormPage from './pages/particulier/AdresseProblemFormPage'

function BALWidget() {
  const [isExpanded, setIsExpanded] = useState(false)
  const location = useLocation()
  const config = useContext(ConfigContext)

  // Track location change on matomo
  useEffect(() => {
    const { pathname } = location
    window.parent.postMessage(
      { type: 'BAL_WIDGET_LOCATION', content: pathname },
      'https://baseadressenationale.github.io',
    )
  }, [location.pathname])

  // Send message to parent window when widget is expanded or collapsed
  useEffect(() => {
    const message = isExpanded ? { type: 'BAL_WIDGET_OPENED' } : { type: 'BAL_WIDGET_CLOSED' }
    window.parent.postMessage(message, 'https://baseadressenationale.github.io')
  }, [isExpanded])

  return (
    <StyledBALWidget>
      <Window isExpanded={isExpanded} onClose={() => setIsExpanded(false)}>
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route index element={<HomePage />} />
            <Route path='commune' element={<CommuneWelcomePage />} />
            <Route path='commune/bal-status' element={<CommuneBALStatusPage />} />
            <Route path='commune/gitbook' element={<GitBookEmbededPage />} />
            <Route
              path='commune/contact'
              element={<ContactPage subjects={config?.contactUs.subjects} />}
            />

            <Route path='particulier' element={<ParticulierWelcomePage />} />
            <Route
              path='particulier/troubleshooting'
              element={<ParticulierTroubleshootingPage />}
            />
            <Route path='particulier/gitbook' element={<GitBookEmbededPage />} />
            <Route path='particulier/contact' element={<AdresseProblemFormPage />} />
          </Routes>
        </AnimatePresence>
      </Window>
      <MainButton isExpanded={isExpanded} onClick={() => setIsExpanded((oldState) => !oldState)} />
    </StyledBALWidget>
  )
}

export default BALWidget
