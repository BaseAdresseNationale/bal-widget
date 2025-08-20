import { useCallback } from 'react'

export const BAL_ADMIN_API_URL =
  process.env.REACT_APP_BAL_ADMIN_API_URL || 'https://bal-admin.adresse.data.gouv.fr'

export const useBALAdmin = () => {
  const balWidgetUrl = `${BAL_ADMIN_API_URL}/api/bal-widget`

  const getConfig = useCallback(async () => {
    const response = await fetch(`${balWidgetUrl}/config`)
    const data = await response.json()

    if (response.status !== 200) {
      throw new Error(data.message)
    }

    return data
  }, [])

  return {
    getConfig,
  }
}
