import React, { useContext } from 'react'
import HelpBlock from '../components/common/HelpBlock/HelpBlock'
import AnimatedPage from '../layouts/AnimatedPage'
import RouterHistoryContext from '../contexts/routerhistoryContext'

function HomePage() {
  const { navigate } = useContext(RouterHistoryContext)

  return (
    <AnimatedPage animation='prev'>
      <HelpBlock label='Vous êtes ?'>
        <button
          onClick={() => navigate('/commune')}
          style={{ textAlign: 'left', display: 'block' }}
          className='fr-link fr-icon-arrow-right-line fr-link--icon-right'
        >
          Une commune
        </button>
        <button
          onClick={() => navigate('/particulier')}
          style={{ textAlign: 'left', display: 'block', marginTop: '1rem' }}
          className='fr-link fr-icon-arrow-right-line fr-link--icon-right'
        >
          Un particulier
        </button>
      </HelpBlock>
    </AnimatedPage>
  )
}

export default HomePage
