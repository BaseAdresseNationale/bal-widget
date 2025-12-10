export enum PartenaireDeLaCharteTypeEnum {
  COMMUNE = 'commune',
  ENTREPRISE = 'entreprise',
  ORGANISME = 'organisme',
}

export enum PartenaireDeLaCharteOrganismeTypeEnum {
  EPCI = 'epci',
  DEPARTEMENT = 'departement',
  REGION = 'region',
  AUTRE = 'autre',
}

export enum PartenaireDeLaCharteServiceEnum {
  FORMATION = 'formation',
  ACCOMPAGNEMENT_TECNIQUE = 'accompagnement technique',
  REALISATION_DE_BASES_ADRESSES_LOCALES = 'réalisation de bases adresses locales',
  MISE_A_DISPOSITION_D_OUTILS_MUTUALISES = "mise à disposition d'outils mutualisés",
  PARTAGE_D_EXPERIENCE = "partage d'expérience",
}

export type ReviewType = {
  id: string
  email: string
  isAnonymous?: boolean
  community: string
  rating: number
  comment: string
  reply?: string
  createdAt: string
  updatedAt: string
}

export type PartenaireDeLaChartType = {
  id: string
  createdAt: string
  updatedAt: string
  type: PartenaireDeLaCharteTypeEnum
  name: string
  picture: string
  contactFirstName: string
  contactLastName: string
  contactEmail: string
  services: PartenaireDeLaCharteServiceEnum[]
  codeDepartement: string[]
  codeCommune?: string
  link?: string
  charteURL?: string
  signatureDate?: string
  dataGouvOrganizationId?: string[]
  apiDepotClientId: string[]
  infos: string
  reviews?: ReviewType[]
}

export interface PartenairesDeLaCharteQuery {
  codeDepartement?: string[]
  services?: string[]
  type?: PartenaireDeLaCharteTypeEnum
  search?: string
  withoutPictures?: boolean
  shuffleResults?: boolean
}

export interface PaginatedPartenairesDeLaCharte {
  total: number
  totalCommunes: number
  totalOrganismes: number
  totalEntreprises: number
  data: PartenaireDeLaChartType[]
}
