import React from "react";
import "./pokeItem.css";
import { PokemonItemProps, Pokemon } from "../types/types";
import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { toast } from "react-toastify";

const PokemonItem: React.FC<PokemonItemProps> = ({
  pokemon,
  flow,
  onRemove,
  onAdd,
}) => {
  const { name, image, types, abilities, user: userEmail } = pokemon;
  const db = getFirestore();

  const [owned, setIsOwned] = useState(false);

  const addPokemonSuccessNotification = (pokemon) => {
    toast.success(`${pokemon} added to your collection`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const removePokemonSuccessNotification = (pokemon) => {
    toast.success(`${pokemon} removed from your collection`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  useEffect(() => {
    const checkIfPokemonInCollection = async (
      pokemonName: string
    ): Promise<void> => {
      // Reference the user's "pokemon" subcollection
      const userPokemonCollection = collection(db, "pokemon");

      // Query to find the specific Pokemon document by its name and user
      const q = query(
        userPokemonCollection,
        where("name", "==", pokemonName),
        where("user", "==", userEmail)
      );

      // Get the documents that match the query
      const querySnapshot = await getDocs(q);

      setIsOwned(!querySnapshot.empty);
    };
    checkIfPokemonInCollection(name);
  }, [db, name, userEmail]);

  const handleAddPokemon = (pokemon: Pokemon): void => {
    addDoc(collection(db, "pokemon"), pokemon)
      .then(() => {
        // Call the onAdd function passed from the parent component
        onAdd(pokemon);
        addPokemonSuccessNotification(pokemon.name);
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

      await deleteDoc(pokemonDoc.ref);
      removePokemonSuccessNotification(pokemonName);

      // Call the onRemove function passed from the parent component
      onRemove(pokemonName);
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  const isAvailableFlow: boolean = flow === "available";
  const isUserFlow: boolean = flow === "user";
  const addText: string = !owned ? "add" : "owned";

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

        {isAvailableFlow && (
          <button
            className="add-pokemon-button"
            onClick={() => handleAddPokemon(pokemon)}
            disabled={owned}
          >
            {addText}
          </button>
        )}
        {isUserFlow && (
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
