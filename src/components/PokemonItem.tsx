import React from "react";
import "./pokeItem.css";

interface Pokemon {
  id: number;
  name: string;
  url: string;
  types: string[];
  abilities: string[];
  image: string;
}

interface Props {
  pokemon: Pokemon;
}

const PokemonItem: React.FC<Props> = ({ pokemon }) => {
  return (
    <div className="pokemon-card">
      <div className="pokemon-details">
        <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
        <h3>{pokemon.name}</h3>
        <p>Types: {pokemon.types.join(", ")}</p>
        <p>Abilities: {pokemon.abilities.join(", ")}</p>
      </div>
    </div>
  );
};

export default PokemonItem;
