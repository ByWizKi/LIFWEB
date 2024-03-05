const uris = [
  "https://pokeapi.co/api/v2/",
  "https://the-site-that-do-no-exists/",
  "https://httpbin.org/status/404",
];
/*
const head = (uri) =>
  fetch(uri, { method: "HEAD" })
    .then((response) => (console.log('Res', uri), response.status))
    .catch((error) => (console.log('Err', uri), error.message));

async function fetchPromiseAll(uris) {
  return await Promise.all(uris.map((uri) => head(uri)));
}

async function fetchForLoopAwait(uris) {
  const results = [];
  for (const uri of uris) {
    results.push(await head(uri));
  }
  return results;
}

async function fetchMapAwait(uris) {
  return uris.map(async (uri) => await head(uri));
}

(async () => {
  console.log('fetchPromiseAll:');
  console.log(await fetchPromiseAll(uris));

  console.log('fetchForLoopAwait:');
  console.log(await fetchForLoopAwait(uris));

  console.log('fetchMapAwait:');
  console.log(await fetchMapAwait(uris));
})();
*/
/**************************************************
 * Variante en parrallele
 **************************************************/
/*
const head = (uri) =>
  fetch(uri, { method: "HEAD" })
    .then((response) => (console.log('Res', uri), response.status))
    .catch((error) => (console.log('Err:', uri), error.message));

async function fetchForAwaitOf(uris) {
  //On creer une liste de promesse
  const promises = uris.map(uri => head(uri)); 
  const results = [];

  for await (const result of promises) {
    results.push(result);
  }

  return results;
}

(async () => {
  console.log('fetchForAwaitOf:');
  console.log(await fetchForAwaitOf(uris));
})();

/**************************************************
 *Bonus fonction promiseAll() 
 **************************************************/
// On a besoin d'un tableau de promesse en argument
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    let results = [];
    let completedPromises = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((result) => {
          results[index] = result;
          completedPromises += 1;
          if (completedPromises === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });

    if (promises.length === 0) {
      resolve(results);
    }
  });
}
// Creation d'un tableau de promesse
const head = (uri) =>
  fetch(uri, { method: "HEAD" })
    .then((response) => response.status)
    .catch((error) => error.message);

const promises = uris.map((uri) => head(uri));

// Les promesses resolu
promiseAll(promises).then(console.log);
// Err https//the-site-that-do-no-exists/
// Res https//pokeapi.co/api/v2/
