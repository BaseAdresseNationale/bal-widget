import React, { useContext } from 'react'
import { StyledWindow } from './Window.styles'
import Logo from '../../../../assets/logo.png'
import { useLocation } from 'react-router-dom'
import ConfigContext from '../../../contexts/configContext'
import RouterHistoryContext from '../../../contexts/routerhistoryContext'

interface WindowProps {
  children: React.ReactNode
  isExpanded: boolean
  onClose?: () => void
}

function Window({ children, isExpanded, onClose }: WindowProps, ref: React.Ref<HTMLDivElement>) {
  const { config } = useContext(ConfigContext)
  const location = useLocation()
  const { navigate } = useContext(RouterHistoryContext)

  const onClick = () => {
    const prevLocation = location.pathname.split('/').slice(0, -1).join('/')
    navigate(prevLocation || '/')
  }

  const isOnHomePage = location.pathname === '/'

  return (
    <StyledWindow
      ref={ref}
      $isExpanded={isExpanded}
      role='dialog'
      aria-modal='true'
      aria-label="Centre d'aide"
    >
      <header role='banner'>
        <div>
          {isOnHomePage ? (
            <div className='logo-wrapper'>
              <img src={Logo} alt='' height={30} width={30} />
            </div>
          ) : (
            <button title='Retour' onClick={onClick} className='fr-btn fr-icon-arrow-left-line' />
          )}
          <h1>{config?.global?.title}</h1>
        </div>
        <button onClick={onClose} className='fr-btn fr-icon-close-line' title='Fermer'>
          <span className='fr-sr-only'>Fermer</span>
        </button>
      </header>
      <main role='main' className='main-container'>
        {children}
      </main>
    </StyledWindow>
  )
}

export default React.forwardRef(Window)
