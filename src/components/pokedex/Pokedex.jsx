import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import { getFullPokemon } from '../../services/pokeApi';
import PokemonComponent from '../pokemon/PokemonComponent';

const PAGE_SIZE = 15;
const INITIAL_OFFSET = 0;

const fetchStatus = {
  success: 'success',
  error: 'error',
  loading: 'loading',
};

function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [status, setStatus] = useState();

  const [offset, setOffset] = useState(INITIAL_OFFSET);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      if (status !== fetchStatus.success) return;
      setOffset((prev) => prev + PAGE_SIZE);
    }, { threshold: 1 });

    observer.observe(targetRef.current);

    return () => observer.disconnect();
  }, [status]);

  useEffect(() => {
    const fetchPokemons = async () => {
      setStatus(fetchStatus.loading);
      try {
        const newPokemons = await getFullPokemon(offset);
        if (offset > INITIAL_OFFSET) {
          setPokemons((prev) => [...prev, ...newPokemons]);
        } else {
          setPokemons(newPokemons);
        }
        setStatus(fetchStatus.success);
      } catch {
        setStatus(fetchStatus.error);
      }
    };
    fetchPokemons();
  }, [offset]);

  return (
    <>
      {pokemons.length > 0 && (
        <ul>
          {pokemons.map((pokemon) => (
            <li key={pokemon.id}>
              <PokemonComponent pokemon={pokemon} />
            </li>
          ))}
        </ul>
      )}
      {status === fetchStatus.loading && <p>Cargando...</p>}
      {status === fetchStatus.error && <p>Algo ha ido mal</p>}
      <div ref={targetRef} />
    </>
  );
}

export default Pokedex;
