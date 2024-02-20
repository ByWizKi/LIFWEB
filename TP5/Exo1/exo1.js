/**********************************
 * LIFWEB/TP5/Exo1/exo1.js
 **********************************/

// Je utilise l'api fetch pour recuperer les liens en async
const getLinks = async () => {
  try {
    // On recupere dans le fichier json
    const linkFetchResponse = await fetch("all-bookmarks-status.json");
    if (!linkFetchResponse.ok) {
      throw new Error(`HTTP error! status: ${linkFetchResponse.status}`);
    }
    // On recupere les donnees
    const linkFetchData = await linkFetchResponse.json();

    if (!Array.isArray(linkFetchData)) {
      throw new Error("Les ne sont pas dans un tableau");
    }
    // Creation d'une liste
    const linkList = document.createElement("ul");
    linkList.className = "linkList";
    document.querySelector("body").appendChild(linkList);
    if (!linkList) {
      throw new Error("linkList n'existe pas");
    }

    linkFetchData.forEach((element) => {
      const newLi = document.createElement("li");
      const newA = document.createElement("a");
      newA.href = element.uri;
      // Test si l'url est bonne
      if (element.status === 200) {
        newA.style.color = "green";
        newA.style.textDecoration = "none";
      } else if (element.status === 404 || element.status === -1) {
        newA.style.color = "red";
        newA.style.textDecoration = "line-through";
        newA.style.pointerEvents = "none";
      }
      newA.textContent = element.title;

      // Demande de confirmation pour cliquer sur le lien
      newA.addEventListener("click", (event) => {
        if (confirm("Voulez-vous cliquer sur ce lien ?")) {
          window.location.href = newA.href;
        } else {
          event.preventDefault();
        }
      });
      // Ajout des elements dans la liste
      newLi.appendChild(newA);
      linkList.appendChild(newLi);
    });

    // Ajout d'un bouton pour supprimer la liste
    const newButton = document.createElement("button");
    newButton.textContent = "Supprimer la liste";
    linkList.appendChild(newButton);
    newButton.addEventListener("click", () => {
      linkList.remove();
    });
  } catch (error) {
    console.error("Une erreur lors de fetch", error);
  }
};

// Je recupere le bouton
const linkButton = document.querySelector("#linkButton");
linkButton.addEventListener("click", getLinks);
