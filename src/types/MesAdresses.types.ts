export interface BALMesAdresses {
  id: string
  updatedAt: string
  createdAt: string
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
