import React from 'react';

const PokedexItem = ({ id, name }) => {
  return (
    <div class="card">
      <img
        id="pokemonSprite"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        class="card-img-top"
        alt="..."
      />
      <div id="pokedexItem" class="card-body">
        <h5 class="card-title">{name}</h5>
        <p class="card-text text-muted">
          {id > 100 ? '#' + id : id > 10 ? '#0' + id : '#00' + id}
        </p>
        {/*<button id="grass" className="btn btn-info btn-sm">
          Grass
        </button>
        <button id="poison" className="btn btn-info btn-sm">
          Poison
        </button>*/}
      </div>
    </div>
  );
};

export default PokedexItem;
