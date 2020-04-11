import { call, put, takeLatest } from "redux-saga/effects";
import { createSelector } from "reselect";
import { isUndefined } from "lodash";
import { fetchPokemonList } from "../../../api/pokemonRequests";

// Actions types
const FETCH_POKEMON_LIST = "pokemon-front/pokemon/FETCH_POKEMON_LIST";
const FETCH_POKEMON_LIST_SUCCESS =
  "pokemon-front/pokemon/FETCH_POKEMON_LIST_SUCCESS";
const FETCH_POKEMON_LIST_FAILURE =
  "pokemon-front/pokemon/FETCH_POKEMON_LIST_FAILURE";
const RESET_POKEMON_LIST = "pokemon-front/pokemon/RESET_POKEMON_LIST";

const initialState = { pokemonList: [], isLoading: false, error: {} };

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_POKEMON_LIST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_POKEMON_LIST_SUCCESS:
      return {
        ...state,
        pokemonList: action.payload.data,
        isLoading: false,
      };
    case FETCH_POKEMON_LIST_FAILURE:
      const error = isUndefined(action.payload.response)
        ? action.payload.message
        : action.payload.response.data.error;
      return {
        ...state,
        error,
        isLoading: false,
      };
    case RESET_POKEMON_LIST:
      return { ...state, ...initialState };
    default:
      return state;
  }
}

// Action Creators
export function loadPokemon() {
  return { type: FETCH_POKEMON_LIST };
}

export function loadPokemonSucceed(payload) {
  return { type: FETCH_POKEMON_LIST_SUCCESS, payload };
}

export function loadPokemonFailed(payload) {
  return { type: FETCH_POKEMON_LIST_FAILURE, payload };
}

export function resetPokemonList() {
  return { type: RESET_POKEMON_LIST };
}

// Selectors

const pokemonListSelector = (state) =>
  state.pokemonReducer.pokemonList.pokemonList;

export const sortedPokemon = createSelector(pokemonListSelector, (pokemon) =>
  pokemon.sort((a, b) => a.pokedexNumber - b.pokedexNumber)
);

// Sagas

export function* fetchPokemonListSaga() {
  try {
    const response = yield call(fetchPokemonList);
    yield put(loadPokemonSucceed(response));
  } catch (error) {
    yield put(loadPokemonFailed(error));
  }
}

export function* pokemonListSaga() {
  yield takeLatest(FETCH_POKEMON_LIST, fetchPokemonListSaga);
}
