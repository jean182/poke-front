import { call, delay, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { createSelector } from 'reselect';
import { isUndefined } from 'lodash';
import {
  fetchPokemonList,
  loadMorePokemonList,
} from '../../../api/pokemonRequests';

// Actions types
const FETCH_POKEMON_LIST = 'pokemon-front/pokemon/FETCH_POKEMON_LIST';
const FETCH_POKEMON_LIST_SUCCESS =
  'pokemon-front/pokemon/FETCH_POKEMON_LIST_SUCCESS';
const FETCH_POKEMON_LIST_FAILURE =
  'pokemon-front/pokemon/FETCH_POKEMON_LIST_FAILURE';
const RESET_POKEMON_LIST = 'pokemon-front/pokemon/RESET_POKEMON_LIST';
const LOAD_MORE_POKEMON = 'pokemon-frontend/pokemon/LOAD_MORE_POKEMON';
const LOAD_MORE_POKEMON_SUCCEED =
  'pokemon-frontend/pokemon/LOAD_MORE_POKEMON_SUCCEED';
const LOAD_MORE_POKEMON_FAILED =
  'pokemon-frontend/pokemon/LOAD_MORE_POKEMON_FAILED';

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
    case LOAD_MORE_POKEMON:
      return {
        ...state,
        isLoading: true,
      };
    case LOAD_MORE_POKEMON_SUCCEED:
      const newPokemonList = action.payload.data.results;
      const { pokemonList } = state;
      return {
        ...state,
        pokemonList: [...pokemonList, ...newPokemonList],
        isLoading: false,
      };
    case LOAD_MORE_POKEMON_FAILED:
      return {
        ...state,
        error: action.payload,
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

export function loadMorePokemon(payload) {
  return { type: LOAD_MORE_POKEMON, payload };
}

export function loadMorePokemonSucceed(payload) {
  return { type: LOAD_MORE_POKEMON_SUCCEED, payload };
}

export function loadMorePokemonFailed(payload) {
  return { type: LOAD_MORE_POKEMON_FAILED, payload };
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

export function* loadMorePokemonListSaga(action) {
  const { payload } = action;
  try {
    const response = yield call(loadMorePokemonList, payload);
    yield delay(1000);
    yield put(loadMorePokemonSucceed(response));
  } catch (error) {
    yield put(loadMorePokemonFailed(error.message));
  }
}

export function* pokemonListWatcherSaga() {
  yield takeLatest(FETCH_POKEMON_LIST, fetchPokemonListSaga);
  yield takeEvery(LOAD_MORE_POKEMON, loadMorePokemonListSaga);
}
