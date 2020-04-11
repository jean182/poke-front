import { combineReducers } from "redux";
import pokemonListReducer from "./pokemonList";
import specificPokemonReducer from "./pokemon";

const pokemonReducer = combineReducers({
  pokemonList: pokemonListReducer,
  pokemon: specificPokemonReducer,
});

export default pokemonReducer;
