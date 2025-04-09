export interface APIDepotRevision {
  id: string
  codeCommune: string
  publishedAt: string
  status: string
  updatedAt: string
  client: {
    chefDeFile?: string
    chefDeFileEmail?: string
    mandataire: string
    nom: string
    id: string
  }
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
    id: string
    emailCommune: string
    codeCommune: string
    createdAt: string
    updatedAt: string
  }
}
