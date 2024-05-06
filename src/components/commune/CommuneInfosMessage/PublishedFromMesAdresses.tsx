import React from 'react'
import { StyledCommuneInfosMessage } from './CommuneInfosMessage.style'
import { BALStatusBadge } from '../BALStatusBadge/BALStatusBadge'
import { MES_ADRESSES_URL } from '../../../hooks/useMesAdresses'
import { BALMesAdresses } from '../../../types/MesAdresses.types'

type PublishedFromMesAdressesProps = {
  publishedBals: BALMesAdresses[]
}

export const PublishedFromMesAdresses = ({ publishedBals }: PublishedFromMesAdressesProps) => {
  return (
    <StyledCommuneInfosMessage>
      <p>Voici la liste des Bases Adresses Locales publiées par votre commune sur Mes Adresses :</p>
      {publishedBals.map((bal) => (
        <details key={bal._id}>
          <summary>
            <span>{bal.nom}</span> <BALStatusBadge status={bal.status} sync={bal.sync} />
          </summary>
          <div>
            <div>
              <div>Créée le {new Date(bal._created).toLocaleDateString('fr')}</div>
              <div>Dernière mise à jour le {new Date(bal._updated).toLocaleDateString('fr')}</div>
            </div>
            <a
              href={`${MES_ADRESSES_URL}/bal/${bal._id}`}
              className='fr-btn fr-btn--primary'
              target='_blank'
              rel='noreferrer'
            >
              Consulter
            </a>
          </div>
        </details>
      ))}
    </StyledCommuneInfosMessage>
  )
}
