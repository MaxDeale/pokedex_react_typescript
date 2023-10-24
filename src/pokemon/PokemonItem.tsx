import React from "react";
import "./pokeItem.css";
import { PokemonItemProps, Pokemon } from "../types/types";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const PokemonItem: React.FC<PokemonItemProps> = ({ pokemon }) => {
  const { name, image, types, abilities } = pokemon;
  const db = getFirestore();

  const handleAddPokemon = (pokemon: Pokemon): void => {
    console.log("handleAddPokemon", pokemon);

    addDoc(collection(db, "pokemon"), pokemon)
      .then((docRef) => {
        console.log("Document added with ID: ", docRef.id);
        alert(pokemon.name + " successfully added!");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

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
        <button
          className="add-pokemon-button"
          onClick={() => handleAddPokemon(pokemon)}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default PokemonItem;
