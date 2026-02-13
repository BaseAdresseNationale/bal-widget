import { useContext } from 'react'
import HelpBlock from '../../components/common/HelpBlock/HelpBlock'
import DocAdresseTopArticles from '../../components/common/DocAdresseTopArticles/DocAdresseTopArticles'
import AnimatedPage from '../../layouts/AnimatedPage'
import ConfigContext from '../../contexts/configContext'
import RouterHistoryContext from '../../contexts/routerhistoryContext'
import { fetchCommunes } from '../../lib/api-geo'
import SearchInput from '../../components/common/SearchInput'
import { SearchItemType } from '../../components/common/SearchInput/SearchInput'

interface APIGeoCommune {
  nom: string
  code: string
}

function CommuneWelcomePage() {
  const { navigate, isNavigatingBack } = useContext(RouterHistoryContext)

  const { config } = useContext(ConfigContext)

  const onSelectCommune = (commune: APIGeoCommune) => {
    navigate(`/commune/bal-status?code=${commune.code}&nom=${commune.nom}`)
  }

  return (
    <AnimatedPage animation={isNavigatingBack ? 'prev' : 'next'}>
      <HelpBlock label={config?.communes?.welcomeBlockTitle || ''}>
        <SearchInput
          onSearch={fetchCommunes}
          itemToString={(commune?: SearchItemType<APIGeoCommune> | null) =>
            commune ? `${commune.nom} (${commune.code})` : ''
          }
          onSelect={(commune?: SearchItemType<APIGeoCommune> | null) => {
            if (commune) {
              onSelectCommune(commune)
            }
          }}
          nativeInputProps={{ placeholder: 'Rechercher ma commune' }}
          label={null}
        />
      </HelpBlock>
      <HelpBlock label={config?.gitbookCommunes?.welcomeBlockTitle || ''}>
        <DocAdresseTopArticles
          path='/commune/doc-adresse'
          articles={config?.gitbookCommunes?.topArticles || []}
        />
      </HelpBlock>
      <HelpBlock label={config?.contactUs?.welcomeBlockTitle || ''}>
        <button
          onClick={() => navigate('/commune/contact')}
          className='fr-btn fr-icon-arrow-right-line fr-btn--icon-right'
        >
          Formulaire de contact
        </button>
      </HelpBlock>
    </AnimatedPage>
  )
}

export default CommuneWelcomePage
