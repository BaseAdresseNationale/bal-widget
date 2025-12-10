import { useCallback } from 'react'
import { addSearchParams } from '../utils/url.utils'
import {
  PartenaireDeLaChartType,
  PartenairesDeLaCharteQuery,
} from '../types/PartenaireDeLaCharte.types'

export const BAL_ADMIN_API_URL =
  process.env.REACT_APP_BAL_ADMIN_API_URL || 'https://bal-admin.adresse.data.gouv.fr'

export const useBALAdmin = () => {
  const getConfig = useCallback(async () => {
    const response = await fetch(`${BAL_ADMIN_API_URL}/api/bal-widget/config`)
    const data = await response.json()

    if (response.status !== 200) {
      throw new Error(data.message)
    }

    return data
  }, [])

  const getPartenairesDeLaCharte = useCallback(
    async (
      queryObject: PartenairesDeLaCharteQuery,
      page: number = 1,
      limit: number = 8,
    ): Promise<PartenaireDeLaChartType[]> => {
      const url = new URL(`${BAL_ADMIN_API_URL}/api/partenaires-de-la-charte/paginated`)
      url.searchParams.append('page', page.toString())
      url.searchParams.append('limit', limit.toString())
      addSearchParams(url, queryObject)

      const response = await fetch(url.toString())

      const responseData = await response.json()

      if (response.status !== 200) {
        throw new Error(responseData.message)
      }

      return responseData.data as PartenaireDeLaChartType[]
    },
    [],
  )

  return {
    getConfig,
    getPartenairesDeLaCharte,
  }
}
