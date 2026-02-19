import { useContext, useEffect, useRef } from 'react'
import { StyledBALWidget } from './BALWidget.styles'
import MainButton from './components/common/MainButton/MainButton'
import Window from './components/common/Window/Window'
import { Route, Routes, useLocation } from 'react-router-dom'
import HomePage from './pages'
import { AnimatePresence } from 'framer-motion'
import CommuneWelcomePage from './pages/commune'
import ParticulierWelcomePage from './pages/particulier'
import DocAdresseEmbededPage from './pages/common/DocAdresseEmbededPage'
import CommuneBALStatusPage from './pages/commune/CommuneBALStatusPage'
import ContactPage from './pages/commune/ContactPage'
import ConfigContext from './contexts/configContext'
import ParticulierTroubleshootingPage from './pages/particulier/ParticulierTroubleshootingPage'
import AdresseProblemFormPage from './pages/particulier/AdresseProblemFormPage'
import BANUserContactPage from './pages/ban-user/BANUserContactPage'
import BANUserWelcomePage from './pages/ban-user'
import * as focusTrap from 'focus-trap'

function BALWidget() {
  const location = useLocation()
  const { config, isOpen, setIsOpen } = useContext(ConfigContext)
  const windowRef = useRef<HTMLDivElement>(null)
  const focusTrapRef = useRef<focusTrap.FocusTrap | null>(null)

  // Focus trap for accessibility
  useEffect(() => {
    if (!windowRef.current) {
      return
    }

    if (!focusTrapRef.current) {
      focusTrapRef.current = focusTrap.createFocusTrap(windowRef.current, {
        escapeDeactivates: false,
      })
    }

    if (isOpen) {
      focusTrapRef.current.activate()
    } else {
      focusTrapRef.current.deactivate()
    }
  }, [isOpen])

  // Track location change on matomo
  useEffect(() => {
    const { pathname } = location
    window.parent.postMessage({ type: 'BAL_WIDGET_LOCATION', content: pathname }, '*')
  }, [location.pathname])

  // Send message to parent window when widget is expanded or collapsed
  useEffect(() => {
    const message = isOpen ? { type: 'BAL_WIDGET_OPENED' } : { type: 'BAL_WIDGET_CLOSED' }
    window.parent.postMessage(message, '*')
  }, [isOpen])

  return (
    <StyledBALWidget>
      <MainButton
        isExpanded={isOpen}
        onClick={() => {
          setIsOpen((oldState) => !oldState)
        }}
      />
      <Window isExpanded={isOpen} onClose={() => setIsOpen(false)} ref={windowRef}>
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route index element={<HomePage />} />
            <Route path='commune' element={<CommuneWelcomePage />} />
            <Route path='commune/bal-status' element={<CommuneBALStatusPage />} />
            <Route path='commune/doc-adresse' element={<DocAdresseEmbededPage />} />
            <Route
              path='commune/contact'
              element={<ContactPage subjects={config?.contactUs.subjects} />}
            />

            <Route path='ban-user' element={<BANUserWelcomePage />} />
            <Route path='ban-user/contact' element={<BANUserContactPage />} />

            <Route path='particulier' element={<ParticulierWelcomePage />} />
            <Route
              path='particulier/troubleshooting'
              element={<ParticulierTroubleshootingPage />}
            />
            <Route path='particulier/doc-adresse' element={<DocAdresseEmbededPage />} />
            <Route path='particulier/contact' element={<AdresseProblemFormPage />} />
          </Routes>
        </AnimatePresence>
      </Window>
    </StyledBALWidget>
  )
}

export default BALWidget
