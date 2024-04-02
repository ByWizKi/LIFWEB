import fetch from "node-fetch";
import https from "node:https";

const uri = "https://lifweb-12207446.lifweb.os.univ-lyon1.fr";

async function test1() {
  try {
    // Utilisation de node-fetch avec un agent https pour ignorer les erreurs de certificat SSL
    const response = await fetch(uri, {
      method: "GET",
      agent: new https.Agent({ rejectUnauthorized: false }),
    });
    const data = await response.text();
    console.log(`Reponse du serveur pour la requete sans parametre ${data}`);
  } catch (error) {
    console.log(error);
  }
}

/*
Renvoie hello world
*/

await test1();

async function test2() {
  try {
    const response = await fetch(`${uri}/todo`, {
      method: "GET",
    });
    if (!response.ok) {
      console.error("Erreur de requête todo:", response.status, response.statusText);
      return;
    }
    const data = await response.text();
    console.log(`Reponse du serveur pour la requete todo ${data}`);
  } catch (error) {
    console.log(error);
  }
}
/*
Renvoie requete non implemente 501
*/
await test2();

async function test3() {
  try {
    const response = await fetch(`${uri}/echo`, {
      method: "GET",
    });
    if (!response.ok) {
      console.error("Erreur de requête echo:", response.status, response.statusText);
      return;
    }
    const data = await response.text();
    console.log(`Reponse du serveur pour la requete echo ${data}`);
  } catch (error) {
    console.log(error);
  }
}
/*
Renvoie un texte vide
*/
await test3();

async function test4() {
  try {
    const response = await fetch(`${uri}/echo`, {
      method: "POST",
      boby: "toto",
    });
    if (!response.ok) {
      console.error("Erreur de requête echo post:", response.status, response.statusText);
      return;
    }
    const data = response.text();
    console.log(`Reponse du serveur pour la requete echo post ${data}`);
  } catch (error) {
    console.log(error);
  }
}
/*
Renvoie un promise
*/
await test4();
async function test5() {
  try {
    const response = await fetch(`${uri}/health`, {
      method: "GET",
    });
    if (!response.ok) {
      console.error("Erreur de requête health:", response.status, response.statusText);
      return;
    }
    const data = await response.text();
    console.log(`Reponse du serveur pour la requete health ${data}`);
  } catch (error) {
    console.log(error);
  }
}
/*
 Renvoie l'etat du serveur
*/

await test5();

async function test6() {
  try {
    const response = await fetch(`${uri}/nothing-here`, {
      method: "GET",
    });

    if (!response.ok) {
      console.error("Erreur de requête nothing-here:", response.status, response.statusText);
      return;
    }
    const data = await response.text();
    console.log(`Reponse du serveur pour la requete nothing-here ${data}`);
  } catch (error) {
    console.log(error);
  }
}
/*
Renvoie une erreur 404
*/
await test6();

/* lorsque je ferme le serveur toutes les requetes
 renvoie bad gateway, normale etant donne que nous avons ferme le serveur */
