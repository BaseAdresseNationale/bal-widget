import React, { useState } from 'react'
import { StyledBALWidget } from './BALWidget.styles'
import MainButton from './components/MainButton/MainButton'
import Window from './components/Window/Window'
import { Route, Routes, useLocation } from 'react-router-dom'
import WecomePage from './pages/Welcome'
import BALHelp from './pages/BALHelp'
import GitBookEmbeded from './pages/GitbookEmbedded'
import Contact from './pages/Contact'
import { AnimatePresence } from 'framer-motion'

function BALWidget() {
  const [isExpanded, setIsExpanded] = useState(false)
  const location = useLocation()

  return (
    <StyledBALWidget>
      <Window isExpanded={isExpanded}>
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route index element={<WecomePage />} />
            <Route path='bal-help' element={<BALHelp />} />
            <Route path='gitbook' element={<GitBookEmbeded />} />
            <Route path='contact' element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </Window>
      <MainButton isExpanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)} />
    </StyledBALWidget>
  )
}

export default BALWidget
