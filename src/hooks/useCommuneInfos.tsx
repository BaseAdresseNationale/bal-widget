import React, { useEffect, useState } from 'react'
import { PublishedFromMesAdresses } from '../components/CommuneInfosMessage/PublishedFromMesAdresses'
import { PublishedFromMoissonneur } from '../components/CommuneInfosMessage/PublishedFromMoissonneur'
import { PublishedFromOtherClient } from '../components/CommuneInfosMessage/PublishedFromOtherClient'
import { useAPIDepot } from './useAPIDepot'
import { useMesAdressesAPI } from './useMesAdresses'
import { APIDepotRevision } from '../types/APIDepot.types'
import { BALMesAdresses } from '../types/MesAdresses.types'

const ADRESSE_DATA_GOUV_URL =
  process.env.REACT_APP_ADRESSE_DATA_GOUV_URL || 'https://adresse.data.gouv.fr'

interface CommuneInfosData {
  balsMesAdresses: BALMesAdresses[]
  currentRevision?: APIDepotRevision
}

const formatInfosCommune = (communeInfos: CommuneInfosData) => {
  const { balsMesAdresses, currentRevision } = communeInfos

  if (currentRevision) {
    switch (currentRevision.client.nom) {
      case 'Mes Adresses':
        return <PublishedFromMesAdresses publishedBals={balsMesAdresses} />
      case 'Moissonneur BAL':
        return <PublishedFromMoissonneur currentRevision={currentRevision} />
      default:
        return <PublishedFromOtherClient currentRevision={currentRevision} />
    }
  } else if (!currentRevision && communeInfos.balsMesAdresses.length > 0) {
    return 'Votre commune a déjà publié des révisions mais nous ne parvenons pas à définir une révision courante. Contactez le support pour plus d’informations.'
  } else {
    return (
      <div>
        <p>
          Votre commune n’a pas encore publié sa Base Adresse Locale. Vous trouverez tous les
          renseignements nécessaires à commencer votre adressage sur{' '}
          <a href={`${ADRESSE_DATA_GOUV_URL}/gerer-mes-adresses`} className='fr-link'>
            cette page
          </a>
          .
        </p>
      </div>
    )
  }
}

export const useCommuneInfos = (codeCommune: string | null) => {
  const { getCurrentRevision } = useAPIDepot()
  const { getPublishedBals } = useMesAdressesAPI()
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
        const communeInfos = formatInfosCommune({
          balsMesAdresses,
          currentRevision,
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
