import { useEffect } from 'react'

export const useLocationChange = () => {
  useEffect(() => {
    const oldPushState = history.pushState
    history.pushState = function pushState(...params) {
      const ret = oldPushState.apply(this, params)
      window.dispatchEvent(new Event('locationchange'))
      return ret
    }

    const oldReplaceState = history.replaceState
    history.replaceState = function replaceState(...params) {
      const ret = oldReplaceState.apply(this, params)
      window.dispatchEvent(new Event('locationchange'))
      return ret
    }

    window.addEventListener('popstate', () => {
      window.dispatchEvent(new Event('locationchange'))
    })

    return () => {
      history.pushState = oldPushState
      history.replaceState = oldReplaceState
      window.removeEventListener('popstate', () => {
        window.dispatchEvent(new Event('locationchange'))
      })
    }
  }, [])
}
