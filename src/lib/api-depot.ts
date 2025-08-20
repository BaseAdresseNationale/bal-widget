import { APIDepotRevision } from '../types/APIDepot.types'

export const API_DEPOT_URL =
  process.env.REACT_APP_API_DEPOT_URL || 'https://plateforme-bal.adresse.data.gouv.fr/api-depot'

export const getCurrentRevision = async (codeCommune: string) => {
  const response = await fetch(`${API_DEPOT_URL}/communes/${codeCommune}/current-revision`)

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch current revision: ${response.status} ${response.statusText}`)
  }
  const data = (await response.json()) as APIDepotRevision

  return data
}

export async function getEmailsCommune(codeCommune: string): Promise<string[]> {
  const url = `${API_DEPOT_URL}/communes/${codeCommune}/emails`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Une erreur est survenue')
  }

  return response.json()
}
