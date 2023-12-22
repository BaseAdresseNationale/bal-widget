import React from 'react'
import { StyledCommuneInfosMessage } from './CommuneInfosMessage.style'
import { BALStatusBadge } from '../BALStatusBadge/BALStatusBadge'
import { CommuneInfosData } from '../../types/CommuneInfos'

const MES_ADRESSES_URL =
  process.env.REACT_APP_MES_ADRESSES_URL || 'https://mes-adresses.data.gouv.fr'

export const PublishedFromMesAdresses = (communeInfos: CommuneInfosData) => {
  const publishedBals = communeInfos.balsMesAdresses

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
