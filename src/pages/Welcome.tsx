import React, { useContext } from 'react'
import HelpBlock from '../components/HelpBlock/HelpBlock'
import GitBookTopArticles from '../components/GitbookTopArticles/GitbookTopArticles'
import { useNavigate } from 'react-router-dom'
import AnimatedPage from '../layouts/AnimatedPage'
import ConfigContext from '../contexts/configContext'

function WecomePage() {
  const navigate = useNavigate()
  const config = useContext(ConfigContext)

  return (
    <AnimatedPage animation='prev'>
      <HelpBlock label='Vous êtes ?'>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <button
            onClick={() => navigate('/gitbook')}
            style={{ textAlign: 'left' }}
            className='fr-link fr-icon-arrow-right-line fr-link--icon-right'
          >
            Un EPCI
          </button>
          <button
            style={{ textAlign: 'left' }}
            className='fr-link fr-icon-arrow-right-line fr-link--icon-right'
          >
            Une commune
          </button>
        </div>
      </HelpBlock>
      <HelpBlock label={config?.gitbook?.welcomeBlockTitle || ''}>
        <GitBookTopArticles articles={config?.gitbook?.topArticles || []} />
      </HelpBlock>
      <HelpBlock label={config?.contactUs?.welcomeBlockTitle || ''}>
        <button
          onClick={() => navigate('/contact')}
          style={{ textAlign: 'left' }}
          className='fr-link fr-icon-arrow-right-line fr-link--icon-right'
        >
          Formulaire de contact
        </button>
      </HelpBlock>
    </AnimatedPage>
  )
}

export default WecomePage
