# LIFWEB URL Shortener

Dépôt du projet de départ de réducteur d'URL <https://forge.univ-lyon1.fr/lifweb/lifweb-url-shortener>, voir [le sujet](http://lifweb.pages.univ-lyon1.fr/TP6-WebApp/).

⚠️ Il faut **cloner ce projet** dans votre compte <https://forge.univ-lyon1.fr/> en gardant **le même nom** `lifweb-url-shortener`. ⚠️

⚠️ Votre clone devra être **privé**. Donnez des droits d'accès `reporter` à `romuald.thion` **et** à votre chargé de TP. ⚠️

## Changelog

- 2024-04-02 (v0.1.3) : précision sur la connexion à `bd-pedago.univ-lyon1.fr`.

## Introduction

On fournit un serveur de départ réalisé en <https://hapi.dev/> avec les modules suivants :

- <https://hapi.dev/api/> (framework web)
- <https://hapi.dev/module/boom/api/> (erreurs HTTP)
- <https://hapi.dev/module/inert/api/> (fichiers statiques)
- <https://joi.dev/api/> (validation)
- <https://github.com/felixheck/laabr> (logging)
- <https://node-postgres.com/> (driver PostgreSQL)
- <https://github.com/motdotla/dotenv> (environnement)

Le projet de départ implémente une partie de routes.
Celles qui ne sont **pas** implémentées renvoient pour l'instant une [501 Not Implemented](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/501).

Une démonstration _complète_ du projet est proposée sur <https://api.lifweb.os.univ-lyon1.fr>.

## Installation

L'installation suit les mêmes étapes que [le TP5](http://lifweb.pages.univ-lyon1.fr/TP5-DevOps/#exercice-2--serveur-nodejs).
Vous pouvez utiliser <https://pnpm.io/> au lieu de <https://www.npmjs.com/>.

1. Copier le fichier `.env.sample` en `.env`.
2. Adapter le fichier `.env` à votre configuration, en particulier si vous utilisez directement PostgreSQL.
3. Installer les dépendances avec `npm install`.
4. 💣 Utiliser le script `db/links.sql` pour créer la relation `links`.
5. Exécuter `npm start` pour le développement et `npm run prod` pour la production.
6. Exécuter `npm test` pour exécuter les tests d'intégration.

Pour les tests manuels utiliser <https://httpie.io/>, e.g., `http :3000/health`.

### Base de données PostgreSQL 💣

Ce projet nécessite une base de données PostgreSQL où créer la table `links` de `db/links.sql`.
Plusieurs options :

- **En production** sur la VM cible : PostgreSQL est installé et l'utilisateur `lifweb` créé avec sa base éponyme. Utilisez-la.
- **En développement** sur votre poste de travail local :
  - _Sur une machine de l'université_ : utilisez votre compte PostgreSQL sur `bd-pedago.univ-lyon1.fr` utilisé en [LIFBDA - Bases de Données Avançées](http://lifbda.pages.univ-lyon1.fr/).
    - Le mot de passe est rappelé sur Tomuss, le login est votre numéro d'étudiant _p1234567_ et c'est aussi celui de votre base.
    - Mettre l'option `PGSSLMODE=require` dans le fichier `.env`.
    - Utiliser l'option `NODE_TLS_REJECT_UNAUTHORIZED=0` lors du lancement de Node.js pour que le driver PostgreSQL accepter les certificats auto-signés.
  - _Sur votre machine personnelle_ :
    - Soit vous utilisez `bd-pedago.univ-lyon1.fr` comme précédemment
    - Soit vous montez votre propre PostgreSQL de développement en local. Il suffit de créer vous-même l'utilisateur et la base avec `sudo -u postgres createuser lifweb -P` et `sudo -u postgres createdb lifweb -O lifweb`. Par contre, ne **mettez pas** `PGSSLMODE=require` dans le fichier `.env`.
    - Vous pouvez aussi utiliser [une image docker](https://hub.docker.com/_/postgres/) si vous savez vous en servir.

⚠️ Faites attention à ne pas _commit_ vos secrets comme le mot de passe `bd-pedago.univ-lyon1.fr` ! ⚠️

## Environnement de développement

Sur votre machine personnelle sous Windows, nous recommandons d'utiliser [WSL](https://learn.microsoft.com/en-us/windows/wsl/install).
Pour avoir un environnement semblable à celui de la VM, installer _les versions récentes_ de Node.js et PostreSQL en utilisant [le dépôt nodesource](https://github.com/nodesource/distributions) ou [NVM](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl) et le [dépôt APT PostgreSQL](https://www.postgresql.org/download/linux/ubuntu/).

Comme alternative au développement local, vous pouvez utiliser VSCode _à distance_ en le faisant s'exécuter (en partie) **depuis votre VM**, en codant à distance depuis un autre poste.
Voir [Remote Development using SSH](https://code.visualstudio.com/docs/remote/ssh).
Notez que vous pouvez le faire aussi entre Windows et une VM Linux sous WSL.

Ceci revient à considérer la VM plutôt comme une machine de développement qu'une machine de production, mais on s'en contentera.
