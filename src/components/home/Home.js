import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <main>
      <div className="container">
        <div className="jumbotron">
          <h1 className="display-4">Poke-Front</h1>
          <p className="lead">
            This is a list of Pokémon in the order dictated by the National
            Pokédex.
          </p>
          <hr className="my-4" />
          <p>
            The 896 Pokémon are organized by their number in the National
            Pokédex. The National Pokédex is subdivided into regional Pokédex
            series, each revolving around species introduced at the time of
            their respective generations along with older generations.
          </p>
          <Link className="btn btn-primary btn-lg" to="/pokedex" role="button">
            Explore
          </Link>
        </div>
      </div>
    </main>
  );
}
