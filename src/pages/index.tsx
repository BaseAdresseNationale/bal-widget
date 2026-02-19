import { useContext } from 'react'
import HelpBlock from '../components/common/HelpBlock/HelpBlock'
import AnimatedPage from '../layouts/AnimatedPage'
import RouterHistoryContext from '../contexts/routerhistoryContext'

function HomePage() {
  const { navigate } = useContext(RouterHistoryContext)

  return (
    <AnimatedPage animation='prev'>
      <HelpBlock label='Vous êtes ?'>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <li>
            <button
              onClick={() => navigate('/commune')}
              className='fr-btn fr-btn--icon-right fr-icon-france-line'
              aria-label='Vous êtes une commune'
            >
              Une commune
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate('/ban-user')}
              className='fr-btn fr-btn--icon-right fr-icon-settings-5-line'
              aria-label='Vous êtes un utilisateur de la BAN'
            >
              Un utilisateur BAN
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate('/particulier')}
              className='fr-btn fr-btn--icon-right fr-icon-user-line'
              aria-label='Vous êtes un particulier'
            >
              Un particulier
            </button>
          </li>
        </ul>
      </HelpBlock>
    </AnimatedPage>
  )
}

export default HomePage
