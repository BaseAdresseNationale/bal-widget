import React, { useCallback, useEffect, useState } from 'react'
import { StyledParticulierToubleshooting } from './ParticulierToubleshooting.styles'
import Autocomplete from '../../common/Autocomplete/Autocomplete'
import Loader from '../../common/Loader/Loader'
import AdresseNotFoundInBAN from '../AdresseNotFoundInBAN/AdresseNotFoundInBAN'
import AdresseFoundInBAN from '../AdresseFoundInBAN/AdresseFoundInBAN'
import { SignalementMode } from '../../../types/signalement.types'
import { getSignalementMode } from '../../../utils/signalement.utils'
import { useAPIDepot } from '../../../hooks/useAPIDepot'
import { getSignalementCommuneStatus, getSignalementSourceId } from '../../../lib/api-signalement'

interface APIAdresseResult {
  nom: string
  code: string
  postcode: string
}

export const ParticulierTroubleshooting = () => {
  const [adresse, setAdresse] = useState<{
    municipality: { nom: string; code: string } | null
    street: { nom: string; code: string } | null
    number: string
  }>({
    municipality: null,
    street: null,
    number: '',
  })
  const { getCurrentRevision } = useAPIDepot()
  const [signalementMode, setSignalementMode] = useState<SignalementMode>(SignalementMode.EMAIL)
  const [numeros, setNumeros] = useState<string[]>([])
  const [numeroNotFound, setNumeroNotFound] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const browseToMesSignalements = useCallback(
    () =>
      window.open(
        `${process.env.REACT_APP_MES_SIGNALEMENTS_URL}/#/${adresse.street
          ?.code}?sourceId=${getSignalementSourceId()}&type=LOCATION_TO_CREATE`,
        '_blank',
      ),
    [adresse],
  )

  const fetchBAN = (type: string) => async (search: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${search}&type=${type}&limit=10${
          adresse.municipality ? `&citycode=${adresse.municipality.code}` : ''
        }`,
      )
      const data = await response.json()

      return data.features.map(
        ({ properties }: { properties: { id: string; name: string; postcode?: string } }) => ({
          code: properties.id,
          nom: properties.name,
          ...(properties.postcode && { postcode: properties.postcode }),
        }),
      )
    } catch (error) {
      console.error(error)
      return []
    } finally {
      setIsLoading(false)
    }
  }

  const fetchNumeros = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(
        `https://plateforme.adresse.data.gouv.fr/lookup/${adresse.street?.code}`,
      )
      const data = await response.json()
      const numeros =
        data?.numeros.map(({ numero, suffixe }: { numero: number; suffixe: string }) =>
          suffixe ? `${numero} ${suffixe}` : numero,
        ) || []

      return numeros
    } catch (error) {
      console.error(error)
      return []
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (adresse.municipality && adresse.street) {
        fetchNumeros().then(setNumeros)
      } else if (adresse.municipality) {
        let isCommuneDisabled
        try {
          const communeStatus = await getSignalementCommuneStatus(adresse.municipality.code)
          isCommuneDisabled = communeStatus.disabled
        } catch (err) {
          console.error('Error fetching commune disabled status:', err)
          setSignalementMode(SignalementMode.EMAIL)
          return
        }

        let currentRevision = null
        try {
          currentRevision = await getCurrentRevision(adresse.municipality.code)
        } catch (err) {
          console.error('Error fetching current revision:', err)
        }
        setSignalementMode(getSignalementMode(currentRevision, isCommuneDisabled))
      }
    }

    void fetchData()
  }, [adresse])

  return (
    <StyledParticulierToubleshooting>
      {adresse.municipality && adresse.street && adresse.number ? (
        <AdresseFoundInBAN />
      ) : numeroNotFound ? (
        <AdresseNotFoundInBAN adresse={adresse} />
      ) : (
        <>
          <h2>Votre adresse existe-t-elle dans la Base d&apos;Adresse Nationale ?</h2>
          <div className='step'>
            <div className='step-label'>
              <span>1.</span>Dans quelle commune se situe votre adresse?
            </div>
            {adresse.municipality ? (
              <div className='selection'>
                Ma commune : <span>{adresse.municipality.nom}</span>{' '}
                <button
                  type='button'
                  onClick={() =>
                    setAdresse({
                      municipality: null,
                      street: null,
                      number: '',
                    })
                  }
                  className='fr-icon-close-line'
                  title='Réinitialiser la commune'
                />
              </div>
            ) : (
              <Autocomplete
                inputProps={{ placeholder: 'Rechercher ma commune' }}
                fetchResults={fetchBAN('municipality')}
                ResultCmp={(commune: APIAdresseResult) => (
                  <div key={commune.code}>
                    <button
                      tabIndex={0}
                      type='button'
                      onClick={() => setAdresse(() => ({ ...adresse, municipality: commune }))}
                    >
                      {commune.nom} ({commune.postcode})
                    </button>
                  </div>
                )}
              />
            )}
          </div>
          {adresse.municipality && (
            <div className='step'>
              <div className='step-label'>
                <span>2.</span> Recherchez votre voie
              </div>
              {adresse.street ? (
                <div className='selection'>
                  Ma voie : <span>{adresse.street.nom}</span>{' '}
                  <button
                    type='button'
                    onClick={() =>
                      setAdresse((adresse) => ({
                        ...adresse,
                        street: null,
                        number: '',
                      }))
                    }
                    className='fr-icon-close-line'
                    title='Réinitialiser la voie'
                  />
                </div>
              ) : (
                <>
                  <Autocomplete
                    inputProps={{ placeholder: 'Rechercher ma voie' }}
                    fetchResults={fetchBAN('street')}
                    ResultCmp={(voie: APIAdresseResult) => (
                      <div key={voie.code}>
                        <button
                          tabIndex={0}
                          type='button'
                          onClick={() =>
                            setAdresse(() => ({
                              ...adresse,
                              street: { nom: voie.nom, code: voie.code },
                            }))
                          }
                        >
                          {voie.nom}
                        </button>
                      </div>
                    )}
                  />
                  <button
                    type='button'
                    className='fr-btn fr-btn--secondary fr-btn--sm not-found'
                    onClick={() => setNumeroNotFound(true)}
                  >
                    Je ne trouve pas ma voie
                  </button>
                </>
              )}
            </div>
          )}
          {adresse.municipality && adresse.street && (
            <div className='step'>
              <div className='step-label'>
                <span>3.</span> Sélectionnez votre numéro
              </div>

              {isLoading ? (
                <Loader />
              ) : (
                <>
                  <select
                    defaultValue=''
                    className='fr-select'
                    onChange={(event) =>
                      setAdresse(() => ({
                        ...adresse,
                        number: event.target.value,
                      }))
                    }
                  >
                    <option value='' disabled>
                      -- Choisir votre numéro dans la liste
                    </option>
                    {numeros.map((numero) => (
                      <option key={numero} value={numero}>
                        {numero}
                      </option>
                    ))}
                  </select>
                  <button
                    type='button'
                    className='fr-btn fr-btn--secondary fr-btn--sm not-found'
                    {...(signalementMode === SignalementMode.MES_SIGNALEMENTS
                      ? {
                          onClick: browseToMesSignalements,
                        }
                      : {
                          onClick: () => setNumeroNotFound(true),
                        })}
                  >
                    Mon numéro n&apos;est pas dans la liste
                  </button>
                </>
              )}
            </div>
          )}
        </>
      )}
    </StyledParticulierToubleshooting>
  )
}
