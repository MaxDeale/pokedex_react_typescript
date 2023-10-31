import { Auth } from "firebase/auth";

export {};

//AUTHENTICATION
export interface AuthProps {
  auth: Auth;
  setIsRegistered: (isRegistered: boolean) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setUser: (user: string) => void;
}

//POKEMON
export interface Ability {
  ability: {
    name: string;
  };
}

export interface PokemonType {
  type: {
    name: string;
  };
}

export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  abilities: string[];
  image: string;
  user: string;
}
export interface PokemonItemProps {
  pokemon: Pokemon;
  flow: string;
  onRemove?: Function;
  onAdd?: Function;
}

export interface PokemonProps {
  pokemons: Pokemon[];
  user: string;
  //makes this an optional property
  removePokemonFromState?: Function;
  addPokemonToState?: Function;
}
