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
      <HelpBlock label='Vous êtes une commune ?'>
        <div className='fr-search-bar' id='header-search' role='search'>
          <input
            className='fr-input'
            placeholder='Rechercher votre commune'
            type='search'
            id='commune-search'
            name='commune-search'
          />
          <button className='fr-btn' title='Rechercher'>
            Rechercher
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
