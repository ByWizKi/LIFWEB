# Note TP3 et TP4 pour moi

## Exercice 0

```
function m(f) {
  function w(...a) {
    w.x.push(a);
    return f(...a);
  }

  w.x = [];
  return w;
}

const adder_decorated = m((a, b) => a + b);

console.log(adder_decorated(2, 3));
console.log(adder_decorated(3, 4));
```

1. Le decorateur m prend une fonction en argument et retourne une fonction w. La fonction w stocke les arguments dans un tableau, puis elle retourne la fonction passer en argument du decorateur. Enfin on vide le tableau et on retourne le resultat de w soit le resultat de la fonction f

2. On renomme les variables

```
function decorateur(fonctionOriginale) {
  function fonctionDecoree(...argumentsFonction) {
    fonctionDecoree.historiqueAppels.push(argumentsFonction);
    return fonctionOriginale(...argumentsFonction);
  }

  fonctionDecoree.historiqueAppels = [];
  return fonctionDecoree;
}

const additionDecoree = decorateur((a, b) => a + b);
console.log(additionDecoree(2, 3));
console.log(additionDecoree(3, 4));
```

3. L'interet de ce decorateur est de garder le comportement original de la fonction passer en argument, de plus il est possible de consulter les arguments de la fonction

## Exercice 2

### Ma solution explication :

1. Étape 1 : Création d'une div dans le fichier HTML pour stocker le nouveau bouton.
2. Étape 2 : Ajout de la gestion d'un événement sur le bouton 'Ajouter modificateur de taille'.
3. Étape 3 : Création du gestionnaire (handler) qui permet d'ajouter le nouveau bouton pour valider la taille saisie.
   
__(probleme j'utilise un id pour la gestion du deuxieme bouton)__


## Exercice 3

1. Le décorateur chrono permet de récupérer une fonction en paramètre et de l'exécuter tout en calculant le temps d'exécution de cette fonction. Elle retourne le resultat de fonction.

2. Le temps affiché au bout de 1 seconde est d'environ : 128 ms.

## Exercice 4