import React from "react";
import PokemonItem from "./PokemonItem";
import "./pokemon_container.css";
import { PokemonProps } from "../types/types";

const AvailablePokemon: React.FC<PokemonProps> = ({
  pokemons,
  removePokemonFromState,
  addPokemonToState,
}) => {
  return (
    <div className="outer-container">
      <h1>Available Pokemon</h1>
      <div className="pokemon-container">
        {pokemons.map((pokemon, index) => (
          <PokemonItem
            key={index}
            pokemon={pokemon}
            flow="available"
            onRemove={removePokemonFromState}
            onAdd={addPokemonToState}
          />
        ))}
      </div>
    </div>
  );
};

export default AvailablePokemon;
