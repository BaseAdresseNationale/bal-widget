export interface APIDepotRevision {
  client: {
    chefDeFile?: string
    chefDeFileEmailContact?: string
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
      sourceId?: string
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
