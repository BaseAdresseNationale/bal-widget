import { useCallback } from 'react'

export interface APIDepotRevision {
  client: {
    chefDeFile: string
    chefDeFileEmailContact: string
    mandataire: string
    nom: string
    _id: string
  }
  codeCommune: string
  context: {
    nomComplet: string
    organisation: string
    extras: {
      commune: string
      codeCommune: string
      codeDepartement: string
      codePostal: string
      departement: string
      region: string
      sourceId?: string
    }
  }
  createdAt: string
  current: boolean
  habilitation: {
    _id: string
    emailCommune: string
    codeCommune: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  publishedAt: string
  ready: null
  status: string
  updatedAt: string
  _id: string
}

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
