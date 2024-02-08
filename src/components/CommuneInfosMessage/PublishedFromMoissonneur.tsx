import React, { useContext, useEffect, useState } from 'react'
import { StyledCommuneInfosMessage } from './CommuneInfosMessage.style'
import ConfigContext from '../../contexts/configContext'
import { useDataGouv } from '../../hooks/useDataGouv'
import { MES_ADRESSES_URL } from '../../hooks/useMesAdresses'
import { DataGouvOrganization } from '../../types/DataGouv.types'
import { APIDepotRevision } from '../../types/APIDepot.types'

type PublishedFromMoissonneurProps = {
  currentRevision: APIDepotRevision
}

export const PublishedFromMoissonneur = ({ currentRevision }: PublishedFromMoissonneurProps) => {
  const config = useContext(ConfigContext)
  const { getDataset } = useDataGouv()
  const sourceId = currentRevision?.context?.extras?.sourceId
  const [organization, setOrganization] = useState<DataGouvOrganization | null>(null)
  const [isOutdated, setIsOutdated] = useState(false)

  useEffect(() => {
    const loadOrganization = async () => {
      if (sourceId) {
        const id: string[] = sourceId.split('-')
        const dataset = await getDataset(id[1])

        setOrganization(dataset.organization)
        setIsOutdated(config?.communes?.outdatedHarvestSources?.includes(sourceId) || false)
      }
    }

    loadOrganization()
  }, [config, sourceId])

  return (
    <StyledCommuneInfosMessage>
      {organization ? (
        <>
          <p>
            Une Base Adresse Locale a déjà été publiée par{' '}
            <a
              target='_blank'
              href={`${organization.page}`}
              rel='noopener noreferrer'
              className='fr-link'
            >
              {organization.name}
            </a>{' '}
            pour votre commune.
          </p>
          {isOutdated ? (
            <p>
              Cependant cette organisation ne met plus à jour vos adresses. Afin de reprendre la
              main sur votre adressage, vous pouvez créer une Base Adresse Locale sur{' '}
              <a href={MES_ADRESSES_URL} className='fr-link' target='_blank' rel='noreferrer'>
                Mes-Adresses
              </a>
              et &quot;Forcer la publication&quot;.
            </p>
          ) : (
            <p>Nous recommandons de prendre contact avec cet organisme.</p>
          )}
        </>
      ) : (
        <p>Une Base Adresse Locale a déjà été déposée pour votre commune</p>
      )}

      <p>
        Toutefois, la commune étant compétente en matière d’adressage, vous pouvez prendre la main
        directement via Mes Adresses.
      </p>
    </StyledCommuneInfosMessage>
  )
}
