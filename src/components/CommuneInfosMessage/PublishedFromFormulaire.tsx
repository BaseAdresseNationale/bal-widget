import React from 'react'
import { StyledCommuneInfosMessage } from './CommuneInfosMessage.style'
import { CommuneInfosData } from '../../types/CommuneInfos'

export const PublishedFromFormulaire = (communeInfos: CommuneInfosData) => {
  console.log('communeInfos', communeInfos)
  return (
    <StyledCommuneInfosMessage>
      <p>
        Votre commune a publié une révision depuis le formulaire. Vous pouvez la consulter en
        cliquant sur le bouton ci-dessous.
      </p>
    </StyledCommuneInfosMessage>
  )
}
