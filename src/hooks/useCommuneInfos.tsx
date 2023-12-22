import React, { useEffect, useState } from 'react'
import { useBALAdmin } from './useBALAdmin'
import { CommuneInfosData } from '../types/CommuneInfos'
import { PublishedFromMesAdresses } from '../components/CommuneInfosMessage/PublishedFromMesAdresses'
import { PublishedFromMoissonneur } from '../components/CommuneInfosMessage/PublishedFromMoissonneur'
import { PublishedFromFormulaire } from '../components/CommuneInfosMessage/PublishedFromFormulaire'
import { PublishedFromOtherClient } from '../components/CommuneInfosMessage/PublishedFromOtherClient'

const MES_ADRESSES_URL =
  process.env.REACT_APP_MES_ADRESSES_URL || 'https://mes-adresses.data.gouv.fr'

const formatInfosCommune = (codeCommune: string, communeInfos: CommuneInfosData) => {
  const currentApiDepotRevision = communeInfos.apiDepotRevisions.find(
    (revision) => revision.current,
  )

  if (currentApiDepotRevision) {
    switch (currentApiDepotRevision.client.nom) {
      case 'Mes Adresses DEV':
        return <PublishedFromMesAdresses {...communeInfos} />
      case 'Moissonneur':
        return <PublishedFromMoissonneur {...communeInfos} />
      case 'Formulaire':
        return <PublishedFromFormulaire {...communeInfos} />
      default:
        return <PublishedFromOtherClient {...communeInfos} />
    }
  } else if (!currentApiDepotRevision && communeInfos.balsMesAdresses.length > 0) {
    return 'Votre commune a déjà publié des révisions mais nous ne parvenons pas à définir une révision courante. Contactez le support pour plus d’informations.'
  } else {
    return (
      <div>
        <p>
          Votre commune n’a pas encore publié sa Base Adresse Locale. Vous pouvez commencer
          l&apos;adressage de votre commune en cliquant sur le bouton ci-dessous.
        </p>
        <a
          href={`${MES_ADRESSES_URL}/new?commune=${codeCommune}`}
          className='fr-btn fr-btn--primary'
          style={{ marginTop: 20 }}
          target='_blank'
          rel='noreferrer'
        >
          Commencer l’adressage sur Mes-Adresses
        </a>
      </div>
    )
  }
}

export const useCommuneInfos = (codeCommune: string | null) => {
  const { getCommuneInfos } = useBALAdmin()
  const [status, setStatus] = useState<'pending' | 'success' | 'error' | null>(null)
  const [communeInfos, setCommuneInfos] = useState<string | React.ReactNode>(null)

  useEffect(() => {
    const fetchCommuneInfos = async () => {
      if (!codeCommune) {
        return
      }
      try {
        setStatus('pending')
        const communeInfosData = await getCommuneInfos(codeCommune)
        const communeInfos = formatInfosCommune(codeCommune, communeInfosData)
        setCommuneInfos(communeInfos)
        setStatus('success')
      } catch (error) {
        console.error(error)
        setStatus('error')
      }
    }

    fetchCommuneInfos()
  }, [codeCommune, getCommuneInfos])

  return { communeInfos, status }
}
