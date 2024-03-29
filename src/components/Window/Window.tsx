import React, { useContext } from 'react'
import { StyledWindow } from './Window.styles'
import Logo from '../../../assets/logo.png'
import { useNavigate, useLocation } from 'react-router-dom'
import ConfigContext from '../../contexts/configContext'

interface WindowProps {
  children: React.ReactNode
  isExpanded: boolean
  onClose?: () => void
}

function Window({ children, isExpanded, onClose }: WindowProps) {
  const config = useContext(ConfigContext)
  const navigate = useNavigate()
  const onClick = () => {
    navigate('/')
  }
  const location = useLocation()
  const isOnHomePage = location.pathname === '/'
  return (
    <StyledWindow $isExpanded={isExpanded}>
      <header>
        <div>
          {isOnHomePage ? (
            <div className='logo-wrapper'>
              <img src={Logo} alt='Logo BAL' height={30} width={30} />
            </div>
          ) : (
            <button title='Retour' onClick={onClick} className='fr-btn fr-icon-arrow-left-line' />
          )}
          <h1>{config?.global?.title}</h1>
        </div>
        <button onClick={onClose} className='fr-btn fr-icon-close-line' title='Fermer' />
      </header>
      <main className='main-container'>{children}</main>
    </StyledWindow>
  )
}

export default Window
