import { SearchItemType } from '../components/common/SearchInput/SearchInput'
import { APIGeoCommune } from '../types/APIGeo.types'

export const fetchCommunes = async (search: string, signal?: AbortSignal) => {
  const response = await fetch(
    `https://geo.api.gouv.fr/communes?nom=${encodeURIComponent(search)}&fields=nom,code&limit=10`,
    { signal },
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch communes: ${response.status}`)
  }

  const data: APIGeoCommune[] = await response.json()

  const mappedData = data.map((commune) => ({
    label: commune.nom,
    id: commune.code,
    ...commune,
  }))

  return mappedData as SearchItemType<APIGeoCommune>[]
}
