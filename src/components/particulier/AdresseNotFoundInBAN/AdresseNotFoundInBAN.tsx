import React, { useContext } from 'react'
import RouterHistoryContext from '../../../contexts/routerhistoryContext'

interface AdresseNotFoundInBANProps {
  adresse: {
    municipality: { nom: string; code: string } | null
    street: { nom: string; code: string } | null
    number: { nom: string; code: string } | null
  }
}

function AdresseNotFoundInBAN({ adresse }: AdresseNotFoundInBANProps) {
  const { navigate } = useContext(RouterHistoryContext)

  return (
    <>
      <h2>Votre adresse n&apos;est pas répertoriée dans la Base d&apos;Adresse Nationale ❌</h2>
      <p>
        Afin de vous aider à résoudre votre problème, nous vous invitons à contacter le service
        urbanisme de votre commune.
      </p>
      <p>Nous pouvons transmettre votre demande à la commune via notre formulaire de contact.</p>
      <button
        type='button'
        className='fr-btn'
        onClick={() =>
          navigate(
            `/particulier/contact?cityName=${adresse.municipality?.nom}&cityCode=${adresse
              .municipality?.code}${adresse.street ? `&street=${adresse.street.nom}` : ''}`,
          )
        }
      >
        Envoyer un signalement
      </button>
    </>
  )
}

export default AdresseNotFoundInBAN
