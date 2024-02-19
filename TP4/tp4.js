function chrono(fct) {
  // c.f. https://javascript.info/rest-parameters-spread
  return function (...args) {
    const start = Date.now();
    const res = fct(...args);
    const end = Date.now();
    console.info(`${fct.name}(...) executed in ${end - start}ms`);
    return res;
  };
}
/*------------------------------------------------
 * Exercice 1
 *------------------------------------------------*/
document.querySelector("#add_button").addEventListener("click", () => {
  const taille = document.querySelector("#input_value").value;
  ajouterBoutonDeTaille(taille);
});

function ajouterBoutonDeTaille(taille) {
  const bouton_taille = document.createElement("button");
  bouton_taille.textContent = "Appliquer la taille";
  bouton_taille.id = "button_taille";

  document.querySelector("#div_new_button").appendChild(bouton_taille);

  bouton_taille.addEventListener("click", () => {
    document.querySelector("section").style.fontSize = `${taille}px`;
    document.querySelector("#div_new_button").removeChild(bouton_taille);
  });
}

/*------------------------------------------------
 * Exercice 2
 *------------------------------------------------*/
const database = [
  { name: "Alice", age: 40, sal: 2500 },
  { name: "Bob", age: 17, sal: -1 },
  { name: "Charlie", age: 30, sal: 1800 },
  { name: "Denise", age: 12, sal: -1 },
];

const salaire = console.log(
  database.some((people) => people.sal < 0 && people.age > 18)
);
const tuple_name_age = console.log(
  Array.from(
    database.filter((people) => people.age > 18),
    (people) => people.name + ": " + people.age
  )
);

const moyenne_sal =
  database.filter((people) => people.sal > 0).reduce((a, b) => a + b.sal, 0) /
  database.filter((people) => people.sal > 0).length;

const ecart_type_sal = console.log(
  Math.sqrt(
    database
      .filter((people) => people.sal > 0)
      .reduce((acc, sal) => acc + (sal.sal - moyenne_sal) ** 2, 0) /
      database.filter((people) => people.sal > 0).length
  )
);

/*------------------------------------------------
 * Exercice 3
 *------------------------------------------------*/

function sum(array) {
  return array.reduce((a, b) => a + b, 0);
}

const test = [...Array.from({ length: 1e7 }).keys()];

console.log(sum(test));
const sum_chrono = chrono(sum);
console.log(sum_chrono(test));
setTimeout(() => sum_chrono(test), 1000);

/*------------------------------------------------
 * Exercice 4
 *------------------------------------------------*/

function once(fct) {
  return function (...args) {
    return fct(...args);
  };
}

const test_once = once((a, b) => a + b);
const print_once = console.log(test_once(1, 2));

function maybe(fct, def) {
  return function (...args) {
    const res = fct(...args);
    if (res === undefined) {
      return def(...args);
    } else {
      return res;
    }
  };
}

const test_maybe = maybe(
  (a, b) => a + b,
  (a, b) => a - b
);
const test_maybe2 = maybe(
  (a, b) => undefined,
  (a, b) => 0
);
const print_maybe = console.log(test_maybe(1, 2));
const print_maybe2 = console.log(test_maybe2(1, 2));

function memoize(fct) {
  let memo = {};
  return function (...args) {
    const key = JSON.stringify(args);
    if (key in memo) {
      console.log("its old args");
      return memo[key];
    } else {
      const res = fct(...args);
      memo[key] = res;
      console.log("its new args");
      return res;
    }
  };
}

const test_memoize = memoize((a, b) => a + b);
const print_memoize = console.log(test_memoize(1, 2));
const print_memoize2 = console.log(test_memoize(2, 1));
const print_memoize3 = console.log(test_memoize(1, 2));

function chain_iterative(n, fct) {
  return function (x) {
    let result = x;
    for (let i = 0; i < n; i++) {
      result = fct(result);
    }
    return result;
  };
}

function chain_recursive(n, fct) {
  if (n === 0) {
    return (x) => x;
  } else {
    return (x) => chain_recursive(n - 1, fct)(fct(x));
  }
}

const test_chain_iterative = chain_iterative(5, (a) => a+1);
const test_chain_recursive = chain_recursive(5, (a) => a+1);
const print_chain_iterative = console.log(test_chain_iterative(1));
const print_chain_recursive = console.log(test_chain_recursive(1));
