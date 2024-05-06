import React from 'react'

function AdresseFoundInBAN() {
  return (
    <>
      <h2>Votre adresse est bien répertoriée dans la Base d&apos;Adresse Nationale ✅</h2>
      <p>
        Votre adresse est donc bien transmise à l&apos;ensemble des services et des entreprises qui
        utilisent la Base d&apos;Adresse Nationale.
      </p>
      <p>
        Vous pouvez consulter la liste de ces organisations à cette page :{' '}
        <a
          target='_blank'
          className='fr-link'
          href='https://adresse.data.gouv.fr/donnees-nationales/usages'
          rel='noreferrer'
        >
          Liste des usages
        </a>
      </p>
    </>
  )
}

export default AdresseFoundInBAN
