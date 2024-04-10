import Boom from "@hapi/boom";

export function createGetApiResponseMessage(statusCode, link) {
  let response;
  switch (statusCode) {
    case 404: {
      response = Boom.notFound("🔍 L'URL demandée n'a pas été trouvée sur ce serveur.");
      break;
    }

    case 200: {
      const successMessage = `
        ✅ Succès! Voici quelques statistiques :
        - Nombre total de visites sur tous les liens : ${link.visits_count}
        - Nombre total de liens réduits sur ce serveur : ${link.links_count}
        `;
      response = { message: successMessage.trim() };
      break;
    }

    default: {
      response = Boom.badImplementation(
        "Une erreur inconnue est survenue. Veuillez réessayer ou contacter le support si le problème persiste.",
      );
    }
  }
  return response.isBoom ? response.output.payload : response;
}

import { format } from "date-fns";

export function createGetShortResponseMessage(statusCode, link) {
  let response;

  switch (statusCode) {
    case 404: {
      response = Boom.notFound(
        "🔎 L'URL demandée n'a pas été trouvée sur ce serveur. Vérifiez l'adresse et essayez à nouveau.",
      );
      break;
    }

    case 400: {
      response = Boom.badRequest("🔗 Le paramètre short est manquant.");
      break;
    }

    case 200: {
      const createdAtFormatted = link.created_at
        ? format(new Date(link.created_at), "dd/MM/yyyy HH:mm:ss")
        : "🚫 Non disponible";
      const lastVisitedAtFormatted = link.last_visited_at
        ? format(new Date(link.last_visited_at), "dd/MM/yyyy HH:mm:ss")
        : "🕒 Jamais visité";

      const successMessage = `
      ✅ Résultat de la recherche :
      🌐 Url d'origine : ${link.long}
      📅 Date de création : ${createdAtFormatted}
      🔗 Url raccourcie : ${link.short}
      👁 Nombre de visites : ${link.visits || "0"}  
      ⏰ Dernière visite : ${lastVisitedAtFormatted}
      🔑 Secret key : ${link.secret_key ? "✅ Présente" : "❌ Non disponible"}
      `.trim();

      response = {
        message: successMessage,
      };
      break;
    }

    default: {
      response = Boom.badImplementation(
        "🚨 Une erreur inconnue est survenue. Veuillez réessayer ou contacter le support si le problème persiste.",
      );
    }
  }

  return response.isBoom ? response.output.payload : response;
}

export function createGetShortStatusResponseMessage(statusCode, link) {
  let response;
  switch (statusCode) {
    case 404: {
      response = Boom.notFound(
        "L'URL demandée n'a pas été trouvée sur ce serveur. Vérifiez l'adresse et essayez à nouveau.",
      );
      break;
    }

    case 400: {
      response = Boom.badRequest("Le paramètre short est manquant.");
      break;
    }
    case 200: {
      const lastVisitedAtFormatted = link.last_visited_at
        ? format(new Date(link.last_visited_at), "dd/MM/yyyy HH:mm:ss")
        : "🕒 Jamais visité";
      const successMessage = `
      ✅ Résultat du status :
      🔗 Url raccourcie : ${link.short}
      👁 Nombre de visites : ${link.visits || "0"}  
      ⏰ Dernière visite : ${lastVisitedAtFormatted}
      `.trim();
      response = {
        message: successMessage,
      };
      break;
    }
    default: {
      response = Boom.badImplementation(
        "Une erreur inconnue est survenue. Veuillez réessayer ou contacter le support si le problème persiste.",
      );
    }
  }
  return response.isBoom ? response.output.payload : response;
}

export function createDeleteApiResponseMessage(statusCode, hasSecretKey) {
  let response;
  switch (statusCode) {
    case 404: {
      response = Boom.notFound(
        "L'URL demandée n'a pas été trouvée sur ce serveur. Vérifiez l'adresse et essayez à nouveau.",
      );
      break;
    }
    case 400: {
      const detailMessage = "Les paramètres fournis ont mal été renseignés.";
      response = Boom.badRequest(detailMessage);
      break;
    }
    case 401: {
      response = Boom.unauthorized("La secret_key fournie est incorrecte.");
      break;
    }
    case 500: {
      response = Boom.internal(
        "Une erreur interne du serveur est survenue. Veuillez réessayer plus tard.",
      );
      break;
    }
    case 200: {
      // Boom n'est généralement pas utilisé pour les réponses réussies, mais vous pouvez formater le message de succès ici.
      response = { message: "✅ Lien supprimé avec succès." };
      break;
    }
    default: {
      response = Boom.badImplementation(
        "Une erreur inconnue est survenue. Veuillez réessayer ou contacter le support si le problème persiste.",
      );
    }
  }

  // Formatter la réponse ou le message d'erreur pour inclure des informations supplémentaires.
  if (response.isBoom) {
    const { payload } = response.output;
    return `
🚨 Oups ! Un Problème est Survenu 🚨
- Code d'Erreur : ${payload.statusCode}
- Détails : ${payload.message}
    `.trim();
  } else {
    // Pour les succès, retourner directement le message.
    return `
✅ Succès
- Détails : ${response.message}
    `.trim();
  }
}

export function createPostApiResponseMessage(statusCode, uri) {
  let response;
  switch (statusCode) {
    case 400: {
      response = Boom.badRequest("Le lien est mal formé. Veuillez le corriger.");
      break;
    }
    case 404: {
      response = Boom.notFound(
        "L'URL demandée n'a pas été trouvée sur ce serveur. Vérifiez l'adresse et essayez à nouveau.",
      );
      break;
    }
    case 500: {
      response = Boom.internal(
        "Une erreur interne du serveur est survenue. Veuillez réessayer plus tard.",
      );
      break;
    }
    case 200: {
      const successMessage = `
      ✅ Lien raccourci !
      🚀 URL : ${uri}  
      `.trim();
      response = {
        message: successMessage,
      };
      break;
    }
    default: {
      response = Boom.badImplementation(
        "Une erreur inconnue est survenue. Veuillez réessayer ou contacter le support si le problème persiste.",
      );
    }
  }
  return response.isBoom ? response.output.payload : response;
}
