import React from 'react'
import { StyledCommuneInfosMessage } from './CommuneInfosMessage.style'
import { CommuneInfosData } from '../../types/CommuneInfos'

export const PublishedFromMoissonneur = (communeInfos: CommuneInfosData) => {
  console.log('communeInfos', communeInfos)
  // Cas RGD Savoie
  return (
    <StyledCommuneInfosMessage>
      <p>
        Votre commune a publié une révision depuis Moissonneur. Vous pouvez la consulter en cliquant
        sur le bouton ci-dessous.
      </p>
    </StyledCommuneInfosMessage>
  )
}
