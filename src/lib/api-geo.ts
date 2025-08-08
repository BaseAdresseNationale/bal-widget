import { APIGeoCommune } from '../types/APIGeo.types'

export const fetchCommunes = async (search: string) => {
  const response = await fetch(
    `https://geo.api.gouv.fr/communes?nom=${search}&fields=nom,code&limit=10`,
  )
  const data = await response.json()

  return data as APIGeoCommune[]
}
