import React, { useState, useEffect } from 'react';
import PokemonItem from './PokemonItem';
import './pokemon_container.css';
import { UserPokemonProps, Pokemon } from '../types/types';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const UserPokemon: React.FC<UserPokemonProps> = ({ user }) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const db = getFirestore();

  useEffect(() => {
    const getPokeData = async () => {
      try {
        // Reference to the 'pokemon' collection in Firestore
        const userPokemonQuery = query(collection(db, 'pokemon'), where('user', '==', user));
        const querySnapshot = await getDocs(userPokemonQuery);

        const updatedPokemonList: Pokemon[] = [];

        querySnapshot.forEach((doc) => {
          updatedPokemonList.push(doc.data() as Pokemon);
        });

        setPokemons(updatedPokemonList);
      } catch (error) {
        console.error('Error fetching data from Firestore:', error);
      }
    };

    getPokeData();
  }, [user, db]);

  return (
    <div className="outer-container">
      <h1>
        Pokemon Collection of <span style={{ color: 'yellow' }}>{user}</span>
      </h1>
      <div className="pokemon-container">
        {pokemons.map((pokemon, index) => (
          <PokemonItem key={index} pokemon={pokemon} flow='user' />
        ))}
      </div>
    </div>
  );
};

export default UserPokemon;
