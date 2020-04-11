import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { loadPokemon, sortedPokemon } from "../../redux/modules/pokemon/pokemonList";

export function Pokedex(props) {
  const { getPokemonList, error, loading, pokemonList } = props;

  useEffect(() => {
    if (isEmpty(pokemonList)) {
      getPokemonList();
    }
  }, [pokemonList, getPokemonList]);

  if (loading) return <p>Loading</p>
  if (!isEmpty(error)) return <p>ERROR</p>

  return (
    <main className="navbar navbar-expand flex-column flex-md-row bd-navbar">
      <h1>PokemonList goes here</h1>
      {pokemonList.map(pokemon => {
        return (
          <div key={pokemon.pokedexNumber}>
            <p>{pokemon.name}</p>
          </div>
        )
      })}
    </main>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getPokemonList: loadPokemon,
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
