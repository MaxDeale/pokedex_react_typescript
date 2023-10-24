import React, { useState, useEffect } from "react";
import PokemonItem from "./PokemonItem";
import "./pokemon_container.css";
import {
  Ability,
  PokemonType,
  Pokemon,
  AvailablePokemonProps,
} from "../types/types";

const AvailablePokemon: React.FC<AvailablePokemonProps> = ({
  initialPokemons,
  user,
}) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>(initialPokemons);

  useEffect(() => {
    // We will fetch our pokemon here
    const getPokeData = async () => {
      const apiUrl: string = "https://pokeapi.co/api/v2";
      const limit: number = 52;
      const offset: number = 0;
      const url: string = `${apiUrl}/pokemon?limit=${limit}&offset=${offset}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        const pokemonList: {
          name: string;
          url: string;
          id: number;
          types: string[];
        }[] = data.results;

        // Fetch and set the types and abilities for each Pokémon
        const updatedPokemonList = await Promise.all(
          pokemonList.map(async (pokemon) => {
            const response = await fetch(pokemon.url);
            if (!response.ok) {
              throw new Error(`Error fetching data for ${pokemon.name}`);
            }
            const pokemonData = await response.json();
            const types = pokemonData.types.map(
              ({ type }: PokemonType) => type.name
            );
            const abilities = pokemonData.abilities.map(
              ({ ability }: Ability) => ability.name
            );
            const { sprites } = pokemonData;
            const image = sprites.front_shiny;
            return { ...pokemon, types, abilities, image, user };
          })
        );

        // Now that you have the updated data, you can update the state with it
        setPokemons(updatedPokemonList);
      } catch (error) {
        console.error("Error fetching data from the PokeAPI:", error);
      }
    };

    // Call the async function
    getPokeData();
  }, [user]); // Empty dependency array to run this effect only once

  return (
    <div className="outer-container">
      <h1>Available Pokemon</h1>
      <div className="pokemon-container">
        {pokemons.map((pokemon, index) => (
          <PokemonItem key={index} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default AvailablePokemon;
