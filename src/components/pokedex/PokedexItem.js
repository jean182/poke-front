import React from 'react';

const PokedexItem = ({ id, name }) => {
  return (
    <div className="card">
      <img
        id="pokemonSprite"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        className="card-img-top"
        alt="..."
      />
      <div id="pokedexItem" className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text text-muted">
          {id > 100 ? '#' + id : id > 10 ? '#0' + id : '#00' + id}
        </p>
      </div>
    </div>
  );
};

export default PokedexItem;
