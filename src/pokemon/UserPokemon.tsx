import React, { useState, useEffect } from "react";
import PokemonItem from "./PokemonItem";
import "./pokemon_container.css";
import { Pokemon, AvailablePokemonProps } from "../types/types";

const UserPokemon: React.FC<AvailablePokemonProps> = ({
  initialPokemons,
  user,
}) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>(initialPokemons);

  useEffect(() => {
    // We will fetch our pokemon here
    const getPokeData = async () => {
      try {
        //fetch from users firebase db
        // const response = await fetch(url);
        // if (!response.ok) {
        //   throw new Error("Network response was not ok");
        // }

        // Fetch and set the types and abilities for each Pokémon
        const updatedPokemonList = [];

        setPokemons(updatedPokemonList);
      } catch (error) {
        console.error("Error fetching data from the PokeAPI:", error);
      }
    };

    getPokeData();
  }, []);

  return (
    <div className="outer-container">
      <h1>
        Pokemon Collection of <span style={{ color: "yellow" }}>{user}</span>
      </h1>
      <div className="pokemon-container">
        {pokemons.map((pokemon, index) => (
          <PokemonItem key={index} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default UserPokemon;
