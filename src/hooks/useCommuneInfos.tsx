import React, { useEffect, useState } from 'react'
import { PublishedFromMesAdresses } from '../components/commune/CommuneInfosMessage/PublishedFromMesAdresses'
import { PublishedFromMoissonneur } from '../components/commune/CommuneInfosMessage/PublishedFromMoissonneur'
import { PublishedFromOtherClient } from '../components/commune/CommuneInfosMessage/PublishedFromOtherClient'
import { useMesAdressesAPI } from './useMesAdresses'
import { APIDepotRevision } from '../types/APIDepot.types'
import { BALMesAdresses } from '../types/MesAdresses.types'
import { isEmbeddedInIframe } from '../utils/iframe.utils'
import { getCurrentRevision } from '../lib/api-depot'
import { useBALAdmin } from './useBALAdmin'
import {
  PartenaireDeLaCharteTypeEnum,
  PartenaireDeLaChartType,
} from '../types/PartenaireDeLaCharte.types'
import { PartenaireCard } from '../components/commune/PartenaireCard/PartenaireCard'
import styled from 'styled-components'

const ADRESSE_DATA_GOUV_URL =
  process.env.REACT_APP_ADRESSE_DATA_GOUV_URL || 'https://adresse.data.gouv.fr'

const ObjectIdRE = new RegExp('^[0-9a-fA-F]{24}$')

interface CommuneInfosData {
  balsMesAdresses: BALMesAdresses[]
  currentRevision: APIDepotRevision | null
  availablePartenaires: PartenaireDeLaChartType[]
}

const StyledCommuneInfosMessage = styled.div`
  .custom-accompaniement {
    margin-top: 1.5rem;
  }

  .partenaire-cards-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`

const formatInfosCommune = (communeInfos: CommuneInfosData) => {
  const { balsMesAdresses, currentRevision, availablePartenaires } = communeInfos

  let communeInfoContent: string | React.ReactNode = ''

  if (currentRevision) {
    // Commune publiée via Mes Adresses
    if (
      currentRevision?.context?.extras?.balId &&
      ObjectIdRE.test(currentRevision.context.extras.balId)
    ) {
      communeInfoContent = <PublishedFromMesAdresses publishedBals={balsMesAdresses} />
    }
    // Commune publiée via le Moissonneur BAL
    else if (currentRevision?.context?.extras?.sourceId) {
      communeInfoContent = <PublishedFromMoissonneur currentRevision={currentRevision} />
    } else {
      communeInfoContent = <PublishedFromOtherClient currentRevision={currentRevision} />
    }
  } else if (!currentRevision && communeInfos.balsMesAdresses.length > 0) {
    communeInfoContent =
      'Votre commune a déjà publié des révisions mais nous ne parvenons pas à définir une révision courante. Contactez le support pour plus d’informations.'
  } else {
    communeInfoContent = (
      <div>
        <p>
          Votre commune n’a pas encore publié sa Base Adresse Locale. Vous trouverez tous les
          renseignements nécessaires à commencer votre adressage sur{' '}
          <a
            href={`${ADRESSE_DATA_GOUV_URL}/gerer-mes-adresses`}
            target={isEmbeddedInIframe() ? '_parent' : '_blank'}
            className='fr-link'
            rel='noreferrer'
          >
            cette page
          </a>
          .
        </p>
      </div>
    )
  }

  if (availablePartenaires.length > 0) {
    communeInfoContent = (
      <StyledCommuneInfosMessage>
        {communeInfoContent}
        <div className='custom-accompaniement'>
          <h3>Besoin d&apos;un accompagnement personnalisé?</h3>
          <p>
            Votre commune peut bénéficier de l’accompagnement gratuit d’un organisme partenaire de
            la Charte Base Adresse Locale. N’hésitez pas à les contacter :
          </p>
          <div className='partenaire-cards-wrapper'>
            {availablePartenaires.map((partenaire) => (
              <PartenaireCard key={partenaire.id} partenaireDeLaCharte={partenaire} />
            ))}
          </div>
        </div>
      </StyledCommuneInfosMessage>
    )
  }

  return communeInfoContent
}

export const useCommuneInfos = (codeCommune: string | null) => {
  const { getPublishedBals } = useMesAdressesAPI()
  const { getPartenairesDeLaCharte } = useBALAdmin()
  const [status, setStatus] = useState<'pending' | 'success' | 'error' | null>(null)
  const [communeInfos, setCommuneInfos] = useState<string | React.ReactNode>(null)

  useEffect(() => {
    const fetchCommuneInfos = async () => {
      if (!codeCommune) {
        return
      }
      try {
        setStatus('pending')
        const balsMesAdresses = await getPublishedBals(codeCommune)
        const currentRevision = await getCurrentRevision(codeCommune)
        const availablePartenaires = await getPartenairesDeLaCharte({
          type: PartenaireDeLaCharteTypeEnum.ORGANISME,
          codeDepartement: [codeCommune.substring(0, 2)],
        })
        const communeInfos = formatInfosCommune({
          balsMesAdresses,
          currentRevision,
          availablePartenaires,
        })

        setCommuneInfos(communeInfos)
        setStatus('success')
      } catch (error) {
        console.error(error)
        setStatus('error')
      }
    }

    fetchCommuneInfos()
  }, [codeCommune, getCurrentRevision, getPublishedBals])

  return { communeInfos, status }
}
