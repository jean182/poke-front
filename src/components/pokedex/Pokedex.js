import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import _ from 'lodash';

import {
  loadPokemon,
  sortedPokemon,
  loadMorePokemon,
} from '../../redux/modules/pokemon/pokemonList';
import PokedexLoader from './PokedexLoader';
import PokedexItem from './PokedexItem';

export function Pokedex(props) {
  const { getPokemonList, error, loading, pokemonList } = props;

  const [currentCount, setCurrentCount] = useState(2);

  useEffect(() => {
    if (isEmpty(pokemonList)) {
      getPokemonList();
    }
  }, [pokemonList, getPokemonList]);

  if (_.isEmpty(pokemonList) && loading) return <PokedexLoader />;
  if (!isEmpty(error)) return <p>ERROR {error}</p>;

  const handleScroll = (event) => {
    const { loadMoreActionCreator } = props;
    const element = event.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      loadMoreActionCreator(currentCount);
      setCurrentCount(currentCount + 1);
    }
  };

  return (
    <>
      <main className="navbar navbar-expand flex-column flex-md-row bd-navbar">
        <div
          class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5"
          onScroll={handleScroll}
          style={{ height: '750px', overflow: 'auto' }}
        >
          {pokemonList.map((pokemon) => {
            console.log(pokemon);
            const { pokedexNumber, name } = pokemon;
            return (
              <div key={pokedexNumber} class="col mb-4">
                <PokedexItem id={pokedexNumber} name={name} />
              </div>
            );
          })}
        </div>
        {loading && (
          <div className="text-center">
            <div
              className="spinner-border"
              style={{ width: '4rem', height: '4rem' }}
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </main>
      <p id="pokemonCount" className="ml-3">
        Displaying {pokemonList.length} pokemon of 807
      </p>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getPokemonList: loadPokemon,
      loadMoreActionCreator: loadMorePokemon,
    },
    dispatch
  );
};

const mapStateToProps = (state) => ({
  pokemonList: sortedPokemon(state),
  error: state.pokemonReducer.pokemonList.error,
  loading: state.pokemonReducer.pokemonList.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(Pokedex);
