/* eslint-disable no-shadow */
/* eslint-disable no-console */
import React, { useEffect, useRef, useState } from 'react';
import './PokemonList.css';
import { getFullPokemon } from '../../services/pokeApi';
import PokemonComponent from '../pokemon/PokemonComponent';
import ObserverComponent from '../observer/ObserverComponent';

const STEP = 15;
function PokemonListComponent() {
  const [pokeList, setPokeList] = useState(['Loading...']);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [offset, setOffset] = useState(0);
  const loading = useRef(false);

  const changeOffset = () => {
    if (!loading.current) setOffset((offset) => offset + STEP);
  };

  useEffect(() => {
    (async () => {
      loading.current = true;
      console.log('offset', offset);
      const response = await getFullPokemon(offset);
      setPokeList((pokeList) => [...pokeList, ...response]);
      console.log('response', response);
      loading.current = false;
    })();
  }, [offset]);

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
            <PokemonComponent pokemon={pokemon} key={crypto.randomUUID()} />
          ))
        }
        { dataLoaded && (
        <ObserverComponent
          executeCallback={changeOffset}
        />
        )}
      </ul>
    </>
  );
}

export default PokemonListComponent;
