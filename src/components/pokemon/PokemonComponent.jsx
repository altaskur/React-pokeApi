import React, { useState } from 'react';

function PokemonComponent({ pokemon }) {
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
