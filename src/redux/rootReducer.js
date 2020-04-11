import { combineReducers } from "redux";
import pokemonReducer from "./modules/pokemon/pokemonReducer";

const rootReducer = combineReducers({
  pokemonReducer,
});

export default rootReducer;
