import React from 'react'
import { StyledWindow } from './Window.styles'
import Logo from '../../assets/logo.png'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'

interface WindowProps {
  children: React.ReactNode
  isExpanded: boolean
}

function Window({ children, isExpanded }: WindowProps) {
  const navigate = useNavigate()
  const onClick = () => {
    navigate('/')
  }
  const location = useLocation()
  const isOnHomePage = location.pathname === '/'
  return (
    <StyledWindow isExpanded={isExpanded}>
      <header>
        <div className='logo-wrapper'>
          <img src={Logo} alt='Logo BAL' height={30} width={30} />
        </div>
        <div>
          <h1>Centre d&apos;aide Base Adresse Locale</h1>
          {!isOnHomePage && (
            <button
              onClick={onClick}
              className='fr-link fr-icon-arrow-left-line fr-link--icon-left'
            >
              Retour
            </button>
          )}
        </div>
      </header>
      <motion.main
        className='main-container'
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        exit={{ x: '100%', opacity: 0 }}
        transition={{ duration: 2 }}
      >
        {children}
      </motion.main>
    </StyledWindow>
  )
}

export default Window
