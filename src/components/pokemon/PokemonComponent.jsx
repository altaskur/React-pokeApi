/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

function PokemonComponent({ pokemon }) {
  if (pokemon.name) {
    return (
      <li>
        <p>{pokemon.name}</p>
        <img
          src={pokemon.sprites?.front_default}
          alt={pokemon.name}
          width="96px"
          height="96px"
        />
      </li>
    );
  }
  return null;
}
export default PokemonComponent;
