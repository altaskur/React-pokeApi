import React, { useState, useEffect } from 'react';
import { getPokemon } from '../../services/pokeApi';

function PokemonComponent({ url }) {
  const [pokemon, setPokemon] = useState({ name: 'Loading...', sprites: { front_default: '' } });

  useEffect(() => {
    (async () => {
      try {
        const data = await getPokemon(url);
        setPokemon(data);
      } catch (error) {
        setPokemon({ name: '', sprites: { front_default: '' } });
      }
    })();
  }, [url]);

  if (pokemon.name) {
    return (
      <section>
        <p>{pokemon.name}</p>
        <img
          src={pokemon.sprites?.front_default}
          alt={pokemon.name}
          width="96px"
          height="96px"
        />
      </section>
    );
  }
}

export default PokemonComponent;
