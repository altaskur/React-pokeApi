/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import './PokemonList.css';
import { getFullPokemon } from '../../services/pokeApi';
import PokemonComponent from '../pokemon/PokemonComponent';
import ObserverComponent from '../observer/ObserverComponent';

function PokemonListComponent() {
  const [pokeList, setPokeList] = useState(['Loading...']);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [offset, setOffset] = useState(0);

  const changeOffset = (use, set) => {
    set(use + 15);

    useEffect(() => {
      console.log('use: ', use);
    }, [use]);
  };

  useEffect(() => {
    (async () => {
      const response = await getFullPokemon();
      setPokeList(response);
      setDataLoaded(true);
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
        { dataLoaded && (
        <ObserverComponent
          executeCallback={changeOffset}
          use={offset}
          set={setOffset}
        />
        )}
      </ul>
    </>
  );
}

export default PokemonListComponent;
