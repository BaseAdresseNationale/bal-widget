import { SignalementCommuneStatus } from '../types/signalement.types'

export const getSignalementSourceId = (): string => {
  const sourceId = process.env.REACT_APP_MES_SIGNALEMENTS_SOURCE_ID
  if (!sourceId) {
    throw new Error('REACT_APP_MES_SIGNALEMENTS_SOURCE_ID is not defined')
  }

  return sourceId
}

export async function getSignalementCommuneStatus(
  codeCommune: string,
): Promise<SignalementCommuneStatus> {
  const url = new URL(
    `${process.env.REACT_APP_API_SIGNALEMENT_URL}/settings/commune-status/${codeCommune}`,
  )

  url.searchParams.append('sourceId', getSignalementSourceId())

  const response = await fetch(url)

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error?.message || response.statusText)
  }

  return response.json()
}
