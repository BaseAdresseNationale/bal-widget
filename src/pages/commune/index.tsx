import React, { useContext } from 'react'
import HelpBlock from '../../components/common/HelpBlock/HelpBlock'
import GitBookTopArticles from '../../components/common/GitbookTopArticles/GitbookTopArticles'
import AnimatedPage from '../../layouts/AnimatedPage'
import ConfigContext from '../../contexts/configContext'
import Autocomplete from '../../components/common/Autocomplete/Autocomplete'
import RouterHistoryContext from '../../contexts/routerhistoryContext'

interface APIGeoCommune {
  nom: string
  code: string
}

function CommuneWelcomePage() {
  const { navigate, isNavigatingBack } = useContext(RouterHistoryContext)

  const fetchCommunes = async (search: string) => {
    const response = await fetch(
      `https://geo.api.gouv.fr/communes?nom=${search}&fields=nom,code&limit=10`,
    )
    const data = await response.json()

    return data as APIGeoCommune[]
  }

  const config = useContext(ConfigContext)

  const onSelectCommune = (commune: APIGeoCommune) => {
    navigate(`/commune/bal-status?code=${commune.code}&nom=${commune.nom}`)
  }

  return (
    <AnimatedPage animation={isNavigatingBack ? 'prev' : 'next'}>
      <HelpBlock label={config?.communes?.welcomeBlockTitle || ''}>
        <Autocomplete
          inputProps={{ placeholder: 'Rechercher une commune' }}
          fetchResults={fetchCommunes}
          ResultCmp={(commune: APIGeoCommune) => (
            <div key={commune.code}>
              <button
                type='button'
                className='autocomplete-btn'
                onClick={() => onSelectCommune(commune)}
              >
                {commune.nom} ({commune.code})
              </button>
            </div>
          )}
        />
      </HelpBlock>
      <HelpBlock label={config?.gitbookCommunes?.welcomeBlockTitle || ''}>
        <GitBookTopArticles articles={config?.gitbookCommunes?.topArticles || []} />
      </HelpBlock>
      <HelpBlock label={config?.contactUs?.welcomeBlockTitle || ''}>
        <button
          onClick={() => navigate('/commune/contact')}
          style={{ textAlign: 'left' }}
          className='fr-link fr-icon-arrow-right-line fr-link--icon-right'
        >
          Formulaire de contact
        </button>
      </HelpBlock>
    </AnimatedPage>
  )
}

export default CommuneWelcomePage
