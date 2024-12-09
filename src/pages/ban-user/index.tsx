import React, { useContext } from 'react'
import HelpBlock from '../../components/common/HelpBlock/HelpBlock'
import AnimatedPage from '../../layouts/AnimatedPage'
import RouterHistoryContext from '../../contexts/routerhistoryContext'
import ConfigContext from '../../contexts/configContext'

function BANUserWelcomePage() {
  const { navigate, isNavigatingBack } = useContext(RouterHistoryContext)

  const { parentNavigateTo } = useContext(ConfigContext)

  return (
    <AnimatedPage animation={isNavigatingBack ? 'prev' : 'next'}>
      <HelpBlock label="Accédez aux données et outils d'exploitation">
        <button
          onClick={() =>
            parentNavigateTo({
              href: '/outils',
              target: '_self',
            })
          }
          className='fr-btn fr-icon-arrow-right-line fr-btn--icon-right'
        >
          C&apos;est par ici
        </button>
      </HelpBlock>
      <HelpBlock label='Vous souhaitez contribuer aux évolutions de la BAN?'>
        <button
          onClick={() =>
            parentNavigateTo({
              href: 'https://www.ign.fr/professionnels/rejoignez-la-communaute-dutilisateurs-de-la-ban',
              target: '_blank',
            })
          }
          className='fr-btn fr-icon-arrow-right-line fr-btn--icon-right'
        >
          Rejoignez notre démarche de co-construction Adresse_lab
        </button>
      </HelpBlock>
      <HelpBlock label='Nous contacter'>
        <button
          onClick={() => navigate('/ban-user/contact')}
          className='fr-btn fr-icon-arrow-right-line fr-btn--icon-right'
        >
          Formulaire de contact
        </button>
      </HelpBlock>
    </AnimatedPage>
  )
}

export default BANUserWelcomePage
