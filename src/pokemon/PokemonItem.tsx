import React from "react";
import "./pokeItem.css";
import { PokemonItemProps, Pokemon } from "../types/types";
import { getFirestore, collection, addDoc, deleteDoc, query, where, getDocs, doc } from "firebase/firestore";

const PokemonItem: React.FC<PokemonItemProps> = ({ pokemon, flow }) => {
  const { name, image, types, abilities, id } = pokemon;
  const db = getFirestore();
console.log('id', id)
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

  const handleRemovePokemon = async (pokemonName: string): Promise<void> => {
    try {
      // Find the document reference for the Pokemon with the specified name
      const pokemonQuery = query(
        collection(db, "pokemon"),
        where("name", "==", pokemonName)
      );

      const querySnapshot = await getDocs(pokemonQuery);

      if (querySnapshot.docs.length === 0) {
        console.error("No Pokemon found with the name: " + pokemonName);
        return;
      }

      const pokemonDoc = querySnapshot.docs[0];

      // Delete the document
      await deleteDoc(doc(db, "pokemon", pokemonDoc.id));

      console.log("Pokemon with name " + pokemonName + " successfully removed.");
      alert(pokemonName + " successfully removed!");
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
