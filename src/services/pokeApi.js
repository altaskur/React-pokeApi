export const getPokemonListAwait = async () => {
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

// export const getPokemonList = () => fetch(url)
//   .then((response) => response.json())
//   .then((data) => data.results)
//   .catch((error) => {
//     console.log(error);
//     return ['no tenemos acceso a la api'];
//   });
