import React from 'react'
import { StyledCommuneInfosMessage } from './CommuneInfosMessage.style'
import { CommuneInfosData } from '../../types/CommuneInfos'

export const PublishedFromOtherClient = (communeInfos: CommuneInfosData) => {
  console.log('communeInfos', communeInfos)
  // Cas guichet adresse
  return (
    <StyledCommuneInfosMessage>
      <p>
        Votre commune a publié une révision depuis un autre client. Vous pouvez la consulter en
        cliquant sur le bouton ci-dessous.
      </p>
    </StyledCommuneInfosMessage>
  )
}
