import { SearchItemType } from '../components/common/SearchInput/SearchInput'
import { APIGeoCommune } from '../types/APIGeo.types'

export const fetchCommunes = async (search: string) => {
  const response = await fetch(
    `https://geo.api.gouv.fr/communes?nom=${search}&fields=nom,code&limit=10`,
  )
  const data: APIGeoCommune[] = await response.json()

  const mappedData = data.map((commune) => ({
    label: commune.nom,
    id: commune.code,
    ...commune,
  }))

  return mappedData as SearchItemType<APIGeoCommune>[]
}
