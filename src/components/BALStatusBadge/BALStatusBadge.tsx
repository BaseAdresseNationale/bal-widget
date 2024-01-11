import React from 'react'
import { StyledBALStatusBadge } from './BALStatusBadge.styles'
import { BALMesAdresses } from '../../types/MesAdresses.types'

interface BALStatusBadgeProps {
  status: 'published' | 'replaced'
  sync: {
    status: 'conflict' | 'paused' | 'outdated' | 'synced'
    isPaused: boolean
  }
}

const STATUSES = {
  conflict: {
    label: 'Conflit',
    content:
      'Une autre Base Adresses Locale est aussi synchronisée avec la Base Adresse Nationale. Veuillez entrer en contact les administrateurs de l’autre Base Adresse Locale ou notre support: adresse@data.gouv.fr',
    color: '#732e2b',
    background: 'rgb(244, 219, 219)',
  },
  paused: {
    label: 'Suspendue',
    content:
      'Les mises à jour automatiques de cette Base Adresse Locale sont actuellement suspendues. Vous pouvez relancer la synchronisation à tout moment.',
    color: '#61471a',
    background: 'rgb(252, 240, 213)',
  },
  outdated: {
    label: 'Mise à jour programmée',
    content:
      'De nouvelles modifications ont été détectées, elles seront automatiquement répercutées dans la Base Adresse Nationale dans les prochaines heures.',
    color: '#3351c5',
    background: 'rgb(216, 224, 242)',
  },
  synced: {
    label: 'À jour',
    content:
      'Cette Base Adresse Locale est à jour avec la Base Adresse Nationale. Toute modification sera automatiquement répercutée dans la Base Adresse Nationale dans les prochaines heures.',
    color: '#42705b',
    background: 'rgb(224, 241, 234)',
  },
}

export function computeStatus(balStatus: BALMesAdresses['status'], sync: BALMesAdresses['sync']) {
  if (balStatus === 'replaced' || sync?.status === 'conflict') {
    return STATUSES.conflict
  }

  if (sync?.isPaused) {
    return STATUSES.paused
  }

  if (balStatus === 'published') {
    return STATUSES[sync.status]
  }

  return STATUSES[balStatus]
}

export const BALStatusBadge = ({ status, sync }: BALStatusBadgeProps) => {
  const computedStatus = computeStatus(status, sync)
  return (
    <StyledBALStatusBadge
      $color={computedStatus.color}
      $background={computedStatus.background}
      $content={computedStatus.content}
    >
      <span className='bal-status-badge__label'>{computedStatus.label}</span>
    </StyledBALStatusBadge>
  )
}
