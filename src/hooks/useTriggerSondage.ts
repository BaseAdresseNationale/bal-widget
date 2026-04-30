import { useContext, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ConfigContext from '../contexts/configContext'
import RouterHistoryContext from '../contexts/routerhistoryContext'

const SONDAGE_PATH = '/sondage'
const WIZZ_DURATION_MS = 1000

export function useTriggerSondage() {
  const { navigate } = useContext(RouterHistoryContext)
  const { isOpen, setIsOpen, activeSondage, dismissActiveSondage } = useContext(ConfigContext)
  const location = useLocation()
  const [isWizzing, setIsWizzing] = useState(false)
  const sondageTriggeredRef = useRef(false)
  const wasOpenOnSondageRef = useRef(false)

  // Auto-open the widget on the /sondage page when an active sondage is detected,
  // and play a wizz animation on the main button to attract attention.
  // NB: pas de cleanup `clearTimeout` ici — `navigate` n'est pas mémoïsé et change à
  // chaque render, ce qui annulerait le timeout avant qu'il ne se déclenche.
  // Le ref `sondageTriggeredRef` garantit déjà qu'on ne planifie qu'une seule fois.
  useEffect(() => {
    if (!activeSondage || sondageTriggeredRef.current || isOpen) {
      return
    }
    sondageTriggeredRef.current = true
    setIsWizzing(true)
    window.setTimeout(() => {
      setIsWizzing(false)
      setIsOpen(true)
      wasOpenOnSondageRef.current = true
      navigate(SONDAGE_PATH)
    }, WIZZ_DURATION_MS)
  }, [activeSondage, isOpen, navigate, setIsOpen])

  // Track whether the user is currently viewing the sondage page so we can
  // dismiss the active sondage when they navigate away or close the widget.
  useEffect(() => {
    const isOnSondage = location.pathname === SONDAGE_PATH

    if (isOnSondage && isOpen) {
      wasOpenOnSondageRef.current = true
      return
    }
    if (wasOpenOnSondageRef.current && (!isOpen || !isOnSondage)) {
      wasOpenOnSondageRef.current = false
      dismissActiveSondage()
    }
  }, [location.pathname, isOpen, dismissActiveSondage])

  return { isWizzing }
}
