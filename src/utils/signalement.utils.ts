import { getSignalementSourceId } from '../lib/api-signalement'
import { APIDepotRevision } from '../types/APIDepot.types'
import { SignalementMode, SignalementType } from '../types/signalement.types'

const ObjectIdRE = new RegExp('^[0-9a-fA-F]{24}$')

export const getSignalementMode = (
  currentRevision: APIDepotRevision | null,
  isCommuneDisabled: boolean,
) => {
  // If the current revision has a BAL ID and it's a valid ObjectId, we can deduce that it's from Mes-adresses
  if (
    currentRevision?.context?.extras?.balId &&
    ObjectIdRE.test(currentRevision.context.extras.balId) &&
    !isCommuneDisabled
  ) {
    return SignalementMode.MES_SIGNALEMENTS
  }

  return SignalementMode.EMAIL
}

export const browseToMesSignalements = (id: string, type: SignalementType) =>
  window.open(
    `${
      process.env.REACT_APP_MES_SIGNALEMENTS_URL
    }/#/${id}?sourceId=${getSignalementSourceId()}&type=${type}`,
    '_blank',
  )
