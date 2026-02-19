import { StyledCommuneInfosMessage } from './CommuneInfosMessage.style'
import { BALStatusBadge } from '../BALStatusBadge/BALStatusBadge'
import { MES_ADRESSES_URL } from '../../../hooks/useMesAdresses'
import { BALMesAdresses } from '../../../types/MesAdresses.types'
import { isEmbeddedInIframe } from '../../../utils/iframe.utils'
import Button from '@codegouvfr/react-dsfr/Button'

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
            <span role='heading' aria-level={3}>
              {bal.nom}
            </span>
          </summary>
          <div>
            <div>
              <div className='status-wrapper'>
                Statut <BALStatusBadge status={bal.status} sync={bal.sync} balId={bal.id} />
              </div>
              <p>
                Créée le <span>{new Date(bal.createdAt).toLocaleDateString('fr')}</span>
              </p>
              <p>
                Dernière mise à jour le{' '}
                <span>{new Date(bal.updatedAt).toLocaleDateString('fr')}</span>
              </p>
            </div>
            <Button
              linkProps={
                {
                  href: `${MES_ADRESSES_URL}/bal/${bal.id}`,
                  target: isEmbeddedInIframe() ? '_parent' : '_blank',
                  rel: 'noreferrer',
                } as React.AnchorHTMLAttributes<HTMLAnchorElement>
              }
              size='small'
              aria-label='Consulter la Base Adresse Locale de la commune'
            >
              Consulter
            </Button>
          </div>
        </details>
      ))}
    </StyledCommuneInfosMessage>
  )
}
