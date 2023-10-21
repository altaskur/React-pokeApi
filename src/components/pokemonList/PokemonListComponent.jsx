import React, { useEffect, useState } from 'react';
import './PokemonList.css';
import { getFullPokemon } from '../../services/pokeApi';
import PokemonComponent from '../pokemon/PokemonComponent';

function PokemonListComponent() {
  const [pokeList, setPokeList] = useState(['Loading...']);
  useEffect(() => {
    (async () => {
      const response = await getFullPokemon();
      setPokeList(response);
    })();
  }, []);
  return (
    <>
      <h1>Pokemon List</h1>
      <ul>
        {
          pokeList.map((pokemon) => (
            // <PokemonComponent url={pokemon.url} key={crypto.randomUUID()} />
            // <PokemonComponent url="http://error.errror" key={crypto.randomUUID()} />
            <PokemonComponent pokemon={pokemon} key={crypto.randomUUID()} />
          ))
        }
      </ul>
    </>
  );
}

export default PokemonListComponent;
