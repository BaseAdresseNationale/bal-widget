export enum SignalementMode {
  MES_SIGNALEMENTS = 'MES_SIGNALEMENTS',
  EMAIL = 'EMAIL',
}

export type SignalementCommuneStatus = {
  disabled: boolean
}

export enum SignalementType {
  LOCATION_TO_CREATE = 'LOCATION_TO_CREATE',
  LOCATION_TO_UPDATE = 'LOCATION_TO_UPDATE',
  LOCATION_TO_DELETE = 'LOCATION_TO_DELETE',
}
