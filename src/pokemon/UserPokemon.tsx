import React from "react";
import PokemonItem from "./PokemonItem";
import "./pokemon_container.css";
import { PokemonProps } from "../types/types";

const UserPokemon: React.FC<PokemonProps> = ({
  user,
  pokemons,
  removePokemonFromState,
}) => {
  return (
    <div className="outer-container">
      <h1>
        Pokemon Collection of <span style={{ color: "yellow" }}>{user}</span>
      </h1>
      <div className="pokemon-container">
        {pokemons.map((pokemon, index) => (
          <PokemonItem
            key={index}
            pokemon={pokemon}
            flow="user"
            onRemove={removePokemonFromState}
          />
        ))}
      </div>
    </div>
  );
};

export default UserPokemon;
