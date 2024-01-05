import { useCallback } from 'react'

export const MES_ADRESSES_URL =
  process.env.REACT_APP_MES_ADRESSES_URL || 'https://mes-adresses.data.gouv.fr'

export const MES_ADRESSES_API_URL =
  process.env.REACT_APP_MES_ADRESSES_API_URL || 'https://api-bal.adresse.data.gouv.fr/v2'

export interface BALMesAdresses {
  _id: string
  _updated: string
  _created: string
  nom: string
  status: 'published' | 'replaced'
  sync: {
    status: 'conflict' | 'paused' | 'outdated' | 'synced'
    isPaused: boolean
  }
  nbNumeros: number
  nbNumerosCertifies: number
  isAllCertified: boolean
}

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
