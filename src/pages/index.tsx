import React, { useContext } from 'react'
import HelpBlock from '../components/common/HelpBlock/HelpBlock'
import AnimatedPage from '../layouts/AnimatedPage'
import RouterHistoryContext from '../contexts/routerhistoryContext'

function HomePage() {
  const { navigate } = useContext(RouterHistoryContext)

  return (
    <AnimatedPage animation='prev'>
      <HelpBlock label='Vous êtes ?'>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <button
            onClick={() => navigate('/commune')}
            className='fr-btn fr-btn--icon-right fr-icon-france-line'
          >
            Une commune
          </button>
          <button
            onClick={() => navigate('/ban-user')}
            className='fr-btn fr-btn--icon-right fr-icon-settings-5-line'
          >
            Un utilisateur BAN
          </button>
          <button
            onClick={() => navigate('/particulier')}
            className='fr-btn fr-btn--icon-right fr-icon-user-line'
          >
            Un particulier
          </button>
        </div>
      </HelpBlock>
    </AnimatedPage>
  )
}

export default HomePage
