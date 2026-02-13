import { StyledPartenaireCard } from './PartenaireCard.style'
import { PartenaireDeLaChartType } from '../../../types/PartenaireDeLaCharte.types'

type PartenaireCardProps = {
  partenaireDeLaCharte: PartenaireDeLaChartType
}

export const PartenaireCard = ({ partenaireDeLaCharte }: PartenaireCardProps) => {
  return (
    <StyledPartenaireCard>
      <img src={partenaireDeLaCharte.picture} alt='' style={{ objectFit: 'contain' }} />
      <div>
        <a href={partenaireDeLaCharte.link} target='_blank' rel='noreferrer'>
          <h4>{partenaireDeLaCharte.name}</h4>
        </a>
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
