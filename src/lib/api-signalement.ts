export async function isSignalementDisabledForCommune(codeCommune: string): Promise<boolean> {
  const url = new URL(
    `${process.env.REACT_APP_API_SIGNALEMENT_URL}/settings/communes-disabled/${codeCommune}`,
  )

  const response = await fetch(url)

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error?.message || response.statusText)
  }

  return response.json()
}
