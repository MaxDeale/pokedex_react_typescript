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
  const { name, image, types, abilities } = pokemon;
  return (
    <div className="pokemon-card">
      <div className="pokemon-details">
        <img src={image} alt={name} className="pokemon-image" />
        <h3>{name}</h3>
        <p>
          {" "}
          <span>Types:</span> {types.join(", ")}
        </p>
        <p className="abilities">
          <span>Abilities:</span> {abilities.join(", ")}
        </p>
      </div>
    </div>
  );
};

export default PokemonItem;
