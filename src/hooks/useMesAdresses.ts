import { useCallback } from 'react'
import { BALMesAdresses } from '../types/MesAdresses.types'

export const MES_ADRESSES_URL =
  process.env.REACT_APP_MES_ADRESSES_URL || 'https://mes-adresses.data.gouv.fr'

export const MES_ADRESSES_API_URL =
  process.env.REACT_APP_MES_ADRESSES_API_URL || 'https://api-bal.adresse.data.gouv.fr/v2'

export const useMesAdressesAPI = () => {
  const getPublishedBals = useCallback(async (codeCommune: string) => {
    const response = await fetch(
      `${MES_ADRESSES_API_URL}/bases-locales/search?commune=${codeCommune}`,
    )

    const data = await response.json()
    if (response.status !== 200) {
      throw new Error(data.message)
    }
    const publisedBals = (data.results as BALMesAdresses[]).filter(({ status }) => {
      return status === 'published' || status === 'replaced'
    })

    return publisedBals
  }, [])

  return {
    getPublishedBals,
  }
}
