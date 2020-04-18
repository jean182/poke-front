import { all } from 'redux-saga/effects';
import {
  pokemonListSaga,
  pokemonListWatcherSaga,
} from './modules/pokemon/pokemonList';
import { pokemonSaga } from './modules/pokemon/pokemon';

export default function* rootSaga() {
  yield all([pokemonListSaga(), pokemonListWatcherSaga(), pokemonSaga()]);
}
