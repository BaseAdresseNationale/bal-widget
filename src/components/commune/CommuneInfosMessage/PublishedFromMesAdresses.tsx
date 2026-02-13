import { StyledCommuneInfosMessage } from './CommuneInfosMessage.style'
import { BALStatusBadge } from '../BALStatusBadge/BALStatusBadge'
import { MES_ADRESSES_URL } from '../../../hooks/useMesAdresses'
import { BALMesAdresses } from '../../../types/MesAdresses.types'
import { isEmbeddedInIframe } from '../../../utils/iframe.utils'

type PublishedFromMesAdressesProps = {
  publishedBals: BALMesAdresses[]
}

export const PublishedFromMesAdresses = ({ publishedBals }: PublishedFromMesAdressesProps) => {
  return (
    <StyledCommuneInfosMessage>
      <p>Voici la liste des Bases Adresses Locales publiées par votre commune sur Mes Adresses :</p>
      {publishedBals.map((bal) => (
        <details key={bal.id}>
          <summary>
            <div>
              <h3>{bal.nom}</h3>
              <BALStatusBadge status={bal.status} sync={bal.sync} balId={bal.id} />
            </div>
          </summary>
          <div>
            <div>
              <p>Créée le {new Date(bal.createdAt).toLocaleDateString('fr')}</p>
              <p>Dernière mise à jour le {new Date(bal.updatedAt).toLocaleDateString('fr')}</p>
            </div>
            <a
              href={`${MES_ADRESSES_URL}/bal/${bal.id}`}
              className='fr-btn fr-btn--primary'
              target={isEmbeddedInIframe() ? '_parent' : '_blank'}
              rel='noreferrer'
              aria-label='Consulter la Base Adresse Locale de la commune'
            >
              Consulter
            </a>
          </div>
        </details>
      ))}
    </StyledCommuneInfosMessage>
  )
}
