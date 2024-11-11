export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

export interface PokemonDetail extends Pokemon {
  abilities: {
    ability: {
      name: string;
    };
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
  height: number;
  weight: number;
  base_experience: number;
}

export interface PokemonComment {
  nomePokemon: string;
  idPokemon: string;
  comentarioPokemon: string;
  likeDislike: boolean;
  gitHubId: string;
}
