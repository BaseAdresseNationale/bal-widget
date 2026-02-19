import { useContext } from 'react'
import HelpBlock from '../../components/common/HelpBlock/HelpBlock'
import DocAdresseTopArticles from '../../components/common/DocAdresseTopArticles/DocAdresseTopArticles'
import AnimatedPage from '../../layouts/AnimatedPage'
import ConfigContext from '../../contexts/configContext'
import RouterHistoryContext from '../../contexts/routerhistoryContext'

function ParticulierWelcomePage() {
  const { config } = useContext(ConfigContext)
  const { navigate, isNavigatingBack } = useContext(RouterHistoryContext)

  return (
    <AnimatedPage animation={isNavigatingBack ? 'prev' : 'next'}>
      <HelpBlock label="Vous rencontrez un problème d'adressage?">
        <button
          onClick={() => navigate('/particulier/troubleshooting')}
          style={{ textAlign: 'left' }}
          className='fr-btn fr-icon-arrow-right-line fr-btn--icon-right'
          aria-label="Pour vérifier si votre adresse est répertoriée, c'est par ici"
        >
          C&apos;est par ici
        </button>
      </HelpBlock>
      <HelpBlock label={config?.gitbookParticuliers?.welcomeBlockTitle || ''}>
        <DocAdresseTopArticles
          path='/particulier/doc-adresse'
          articles={config?.gitbookParticuliers?.topArticles || []}
        />
      </HelpBlock>
    </AnimatedPage>
  )
}

export default ParticulierWelcomePage
