import React, { useContext } from 'react'
import HelpBlock from '../components/HelpBlock/HelpBlock'
import GitBookTopArticles from '../components/GitbookTopArticles/GitbookTopArticles'
import { useNavigate } from 'react-router-dom'
import AnimatedPage from '../layouts/AnimatedPage'
import ConfigContext from '../contexts/configContext'
import CommuneAutocomplete, {
  APIGeoCommune,
} from '../components/CommuneAutocomplete/CommuneAutocomplete'

function WecomePage() {
  const navigate = useNavigate()
  const config = useContext(ConfigContext)

  const onSelectCommune = (commune: APIGeoCommune) => {
    navigate(`/commune?code=${commune.code}&nom=${commune.nom}`)
  }

  return (
    <AnimatedPage animation='prev'>
      <HelpBlock label='Vous êtes une commune ?'>
        <CommuneAutocomplete onChange={onSelectCommune} />
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
