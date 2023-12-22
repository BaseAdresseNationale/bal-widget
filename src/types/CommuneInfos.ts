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

export interface APIDepotRevision {
  client: {
    mandataire: string
    nom: string
    _id: string
  }
  codeCommune: string
  context: {
    nomComplet: string
    organisation: string
    extras: {
      commune: string
      codeCommune: string
      codeDepartement: string
      codePostal: string
      departement: string
      region: string
    }
  }
  createdAt: string
  current: boolean
  habilitation: {
    _id: string
    emailCommune: string
    codeCommune: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  publishedAt: string
  ready: null
  status: string
  updatedAt: string
  _id: string
}

export interface APIMoissonneurRevision {}

export interface CommuneInfosData {
  balsMesAdresses: BALMesAdresses[]
  apiDepotRevisions: APIDepotRevision[]
  apiMoissonneurRevisions: APIMoissonneurRevision[]
}
