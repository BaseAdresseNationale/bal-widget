import { AdresseProblemFormType } from './AdresseProblemForm'

export const mailToSignalement = (
  bodyData: AdresseProblemFormType,
  publication: { client?: string; balId?: string; organization?: string },
) => `Bonjour,

Je vous contacte car mon adresse n'est pas référencée dans la Base Adresse Nationale. Voici le détail de mon signalement, mes coordonnées ainsi que la procédure à suivre afin de prendre en compte le signalement :

${bodyData.street ? `Voie : ${bodyData.street}` : ''}
${bodyData.number ? `Numéro : ${bodyData.number}` : ''}
${bodyData.message ? `Message : ${bodyData.message}` : ''}

${
  bodyData.firstName || bodyData.lastName
    ? `Coordonées de contact : ${bodyData.firstName} ${bodyData.lastName}`
    : ''
}

${
  publication.client === 'Mes Adresses'
    ? `Afin de prendre en compte ce signalement, vous pouvez vous rendre sur le site http://mes-adresses.data.gouv.fr sur la page de la Base Adresse Locale de votre commune (https://mes-adresses.data.gouv.fr/bal/${publication.balId}).`
    : publication.client === 'Moissonneur BAL'
      ? `Afin de prendre en compte ce signalement, vous pouvez vous rapprocher de l'organisation ${publication.organization} qui gère la publication de la Base Adresse Locale de votre commune.`
      : publication.client
        ? `Afin de prendre en compte ce signalement, vous pouvez vous rapprocher de l'organisation ${publication.client} qui gère la publication de la Base Adresse Locale de votre commune.`
        : `Vous pouvez prendre en compte ce signalement en vous rendant sur le site http://mes-adresses.data.gouv.fr et en créant une Base Adresse Locale pour votre commune. Pour vous aider dans cette démarche, vous pouvez consulter cet article (https://guide.mes-adresses.data.gouv.fr/creeer-une-base-adresse-locale/creer-une-nouvelle-base-adresse-locale) qui explique les étapes de la création d'une Base Adresse Locale. Vous trouverez aussi de la documentation et des tutoriels vidéos directement sur le site https://mes-adresses.data.gouv.fr. Enfin, vous pouvez vous inscrire pour suivre un de nos webinaires sur la prise en main de l'outil sur cette page : https://adresse.data.gouv.fr/formation-en-ligne.`
}

Vous pouvez prendre contact avec l'équipe d'adresse.data.gouv.fr à cette adresse : adresse@data.gouv.fr

Cordialement,
`
