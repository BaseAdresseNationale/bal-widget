import React from 'react'
import { StyledPartenaireCard } from './PartenaireCard.style'
import { PartenaireDeLaChartType } from '../../../types/PartenaireDeLaCharte.types'

type PartenaireCardProps = {
  partenaireDeLaCharte: PartenaireDeLaChartType
}

export const PartenaireCard = ({ partenaireDeLaCharte }: PartenaireCardProps) => {
  return (
    <StyledPartenaireCard href={partenaireDeLaCharte.link} target='_blank' rel='noreferrer'>
      <img
        src={partenaireDeLaCharte.picture}
        alt={`Logo de ${partenaireDeLaCharte.name}`}
        style={{ objectFit: 'contain' }}
      />
      <div>
        <h3>{partenaireDeLaCharte.name}</h3>
        <ul className='fr-badges-group'>
          {partenaireDeLaCharte.services.map((service) => (
            <li key={service} className='fr-badge fr-badge--info fr-badge--sm fr-badge--no-icon'>
              {service}
            </li>
          ))}
        </ul>
      </div>
    </StyledPartenaireCard>
  )
}
