import config from "./config";

export const fetchPokemonList = () => config.get("/pokemon/");

export const fetchPokemon = (id) => config.get(`/pokemon/${id}`);
