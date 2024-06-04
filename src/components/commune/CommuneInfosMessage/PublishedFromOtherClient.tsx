import React, { useContext, useMemo } from 'react'
import { StyledCommuneInfosMessage } from './CommuneInfosMessage.style'
import ConfigContext from '../../../contexts/configContext'
import { MES_ADRESSES_URL } from '../../../hooks/useMesAdresses'
import { APIDepotRevision } from '../../../types/APIDepot.types'
import { isEmbeddedInIframe } from '../../../utils/iframe.utils'

type PublishedFromOtherClientProps = {
  currentRevision: APIDepotRevision
}

export const PublishedFromOtherClient = ({ currentRevision }: PublishedFromOtherClientProps) => {
  const config = useContext(ConfigContext)
  const client = currentRevision?.client

  const isOutdated = useMemo(() => {
    return (
      config?.communes?.outdatedApiDepotClients?.includes(currentRevision?.client?._id || '') ||
      false
    )
  }, [config, client])

  return (
    <StyledCommuneInfosMessage>
      <p>
        Une Base Adresse Locale a déjà été publiée par <b>{client.chefDeFile || client.nom}</b> pour
        votre commune.
        {client.chefDeFileEmailContact && (
          <>
            Vous pouvez contacter cet organisme via l&apos;adresse :{' '}
            <b>{client.chefDeFileEmailContact}</b>
          </>
        )}
      </p>
      {isOutdated ? (
        <p>
          Cependant cette organisation ne met plus à jour vos adresses. Afin de reprendre la main
          sur votre adressage, vous pouvez créer une Base Adresse Locale sur{' '}
          <a
            href={MES_ADRESSES_URL}
            className='fr-link'
            target={isEmbeddedInIframe() ? '_parent' : '_blank'}
            rel='noreferrer'
          >
            Mes-Adresses
          </a>
          et &quot;Forcer la publication&quot;.
        </p>
      ) : (
        <p>
          La commune reste toutefois l’autorité compétente en matière d’adressage, et vous pouvez
          décider à tout moment de reprendre la main sur la publication de votre BAL via
          l&apos;outil{' '}
          <a
            href={MES_ADRESSES_URL}
            className='fr-link'
            target={isEmbeddedInIframe() ? '_parent' : '_blank'}
            rel='noreferrer'
          >
            Mes-Adresses
          </a>
          .
        </p>
      )}
    </StyledCommuneInfosMessage>
  )
}
