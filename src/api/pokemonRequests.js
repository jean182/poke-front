import config from './config';

export const fetchPokemonList = () => config.get('/pokemon/');

export const fetchPokemon = (id) => config.get(`/pokemon/${id}`);

export const loadMorePokemonList = (limit) =>
  config.get(`/pokemon/?offset=${limit}&limit=20`);
