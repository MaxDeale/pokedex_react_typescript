import React from "react";
import "./pokeItem.css";
import { PokemonItemProps, Pokemon } from "../types/types";
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const PokemonItem: React.FC<PokemonItemProps> = ({
  pokemon,
  flow,
  onRemove,
  onAdd,
}) => {
  const { name, image, types, abilities } = pokemon;
  const db = getFirestore();

  const handleAddPokemon = (pokemon: Pokemon): void => {
    addDoc(collection(db, "pokemon"), pokemon)
      .then((docRef) => {
        // Call the onAdd function passed from the parent component
        onAdd(pokemon);
        alert(pokemon.name + " successfully added!");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  const handleRemovePokemon = async (pokemonName: string): Promise<void> => {
    try {
      // Get a reference to the "pokemon" collection
      const pokemonCollection = collection(db, "pokemon");

      // Find the document reference for the Pokemon with the specified name
      const pokemonQuery = query(
        pokemonCollection,
        where("name", "==", pokemonName)
      );
      const querySnapshot = await getDocs(pokemonQuery);

      if (querySnapshot.docs.length === 0) {
        console.error("No Pokemon found with the name: " + pokemonName);
        return;
      }

      const pokemonDoc = querySnapshot.docs[0];

      // Delete the document using its reference
      await deleteDoc(pokemonDoc.ref);

      console.log(
        "Pokemon with name " + pokemonName + " successfully removed."
      );
      alert(pokemonName + " successfully removed!");

      // Call the onRemove function passed from the parent component
      onRemove(pokemonName);
    } catch (error) {
      console.error("Error removing document: ", error);
    }
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

        {flow === "available" ? (
          <button
            className="add-pokemon-button"
            onClick={() => handleAddPokemon(pokemon)}
          >
            Add
          </button>
        ) : (
          <button
            className="add-pokemon-button"
            onClick={() => handleRemovePokemon(name)}
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default PokemonItem;
