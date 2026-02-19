import React from 'react'
import { browseToMesSignalements } from '../../../utils/signalement.utils'
import { SignalementType } from '../../../types/signalement.types'

interface AdresseFoundInBANProps {
  adresseId: string
}

function AdresseFoundInBAN({ adresseId }: AdresseFoundInBANProps) {
  return (
    <>
      <h2>Votre adresse est bien répertoriée dans la Base d&apos;Adresse Nationale ✅</h2>
      <p>
        Votre adresse est donc bien transmise à l&apos;ensemble des services et des entreprises qui
        utilisent la Base d&apos;Adresse Nationale.
      </p>
      <p>Est-elle correctement positionnée?</p>
      <button
        type='button'
        className='fr-btn'
        onClick={() => {
          if (adresseId) {
            browseToMesSignalements(adresseId, SignalementType.LOCATION_TO_UPDATE)
          }
        }}
      >
        Consulter sur la carte
      </button>
    </>
  )
}

export default AdresseFoundInBAN
