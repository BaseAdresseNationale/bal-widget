import { useLocation } from 'react-router-dom'

export const useSearchParams = (...params: string[]) => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  return params.map((param) => searchParams.get(param))
}
