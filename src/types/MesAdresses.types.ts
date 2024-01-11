export interface BALMesAdresses {
  _id: string
  _updated: string
  _created: string
  nom: string
  status: 'published' | 'replaced'
  sync: {
    status: 'conflict' | 'paused' | 'outdated' | 'synced'
    isPaused: boolean
  }
  nbNumeros: number
  nbNumerosCertifies: number
  isAllCertified: boolean
}
