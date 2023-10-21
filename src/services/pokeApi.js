export const getPokemonList = async () => {
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=15';
  const response = await fetch(url);
  if (!response.ok) throw new Error('Error fetching Pokemon list');
  const data = await response.json();
  if (!data) throw new Error('Error fetching Pokemon list');
  console.log(data);
  return data.results;
};

export const getPokemon = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Error: Couldn't fetch data");
  const data = await response.json();
  if (!data) throw new Error("Error: Couldn't fetch data");
  return data;
};

export const getFullPokemon = async () => {
  const pokeList = await getPokemonList();
  // map es sincrono, por lo que no podemos usarlo para hacer fetch de los datos
  const promiseList = pokeList.map(async (pokemon) => getPokemon(pokemon.url));
  // Ahora resolvemos todas las promesas con Promise.all by Manz.dev
  // https://lenguajejs.com/javascript/asincronia/promise-api/#promiseall
  return Promise.all(promiseList);
};
