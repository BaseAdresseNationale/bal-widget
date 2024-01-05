import { useCallback } from 'react'

export const DATAGOUV_URL = 'https://www.data.gouv.fr/api/1'

export type DataGouvOrganization = {
  name: string
  page: string
}

export const useDataGouv = () => {
  const getDataset = useCallback(async (organisationId: string) => {
    const response = await fetch(`${DATAGOUV_URL}/datasets/${organisationId}`)
    const data = await response.json()

    if (response.status !== 200) {
      throw new Error(data.message)
    }

    return data
  }, [])

  return {
    getDataset,
  }
}
