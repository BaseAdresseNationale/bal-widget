import { useCallback } from 'react'
import { APIDepotRevision } from '../types/APIDepot.types'

export const API_DEPOT_URL =
  process.env.REACT_APP_API_DEPOT_URL || 'https://plateforme-bal.adresse.data.gouv.fr/api-depot'

export const useAPIDepot = () => {
  const getCurrentRevision = useCallback(async (codeCommune: string) => {
    const response = await fetch(`${API_DEPOT_URL}/communes/${codeCommune}/current-revision`)

    const data = await response.json()

    if (response.status === 200) {
      return data as APIDepotRevision
    }
  }, [])

  return {
    getCurrentRevision,
  }
}
