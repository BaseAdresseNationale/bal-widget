import { AdresseProblemFormType } from './AdresseProblemForm'

export const mailToSignalement = (
  bodyData: AdresseProblemFormType,
  publication: { client?: string; balId?: string; organization?: string },
) => `Bonjour,

Je vous contacte car mon adresse n'est pas référencée dans la Base Adresse Nationale. Voici le détail de mon signalement, mes coordonnées ainsi que la procédure à suivre afin de prendre en compte le signalement :

${bodyData.city ? `Commune : ${bodyData.cityName}` : ''}
${bodyData.street ? `Voie : ${bodyData.street}` : ''}
${bodyData.number ? `Numéro : ${bodyData.number}` : ''}
${bodyData.message ? `Message : ${bodyData.message}` : ''}

${
  bodyData.firstName || bodyData.lastName
    ? `Coordonnées de contact : ${bodyData.firstName} ${bodyData.lastName}`
    : ''
}

${
  publication.client === 'Mes Adresses'
    ? `Afin de prendre en compte ce signalement, vous pouvez vous rendre sur le site http://mes-adresses.data.gouv.fr sur la page de la Base Adresse Locale de votre commune (https://mes-adresses.data.gouv.fr/bal/${publication.balId}).`
    : publication.client === 'Moissonneur BAL'
      ? `Afin de prendre en compte ce signalement, vous pouvez vous rapprocher de l'organisation ${publication.organization} qui gère la publication de la Base Adresse Locale de votre commune.`
      : publication.client
        ? `Afin de prendre en compte ce signalement, vous pouvez vous rapprocher de l'organisation ${publication.client} qui gère la publication de la Base Adresse Locale de votre commune.`
        : `Vous pouvez prendre en compte ce signalement en vous rendant sur le site Mes Adresses (https://mes-adresses.data.gouv.fr/) afin de créer et de publier une Base Adresse Locale pour votre commune. Pour vous aider dans cette démarche, nous vous recommandons de vous inscrire pour suivre un de nos webinaires hebdomadaires sur la prise en main de l'outil depuis cette page : https://adresse.data.gouv.fr/formation-en-ligne.\nVous pouvez également consulter cet article (https://doc.adresse.data.gouv.fr/docs/mes-adresses/creer-une-base-adresse-locale/creer-une-nouvelle-base-adresse-locale) qui explique les étapes de la création d'une Base Adresse Locale. Enfin, vous trouverez aussi de la documentation et des tutoriels vidéos directement sur le site https://mes-adresses.data.gouv.fr.`
}

Vous pouvez prendre contact avec l'équipe d'adresse.data.gouv.fr à cette adresse : adresse@data.gouv.fr

Cordialement,
`
