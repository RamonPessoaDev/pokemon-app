import axios from "axios";
import { Pokemon, PokemonDetail, PokemonComment } from "../types/pokemon";

const POKE_API = "https://pokeapi.co/api/v2";
const MOCK_API = "https://6723fb74493fac3cf24cd48c.mockapi.io/api/v1";

export const getPokemonList = async (limit = 100, offset = 0) => {
  const response = await axios.get(
    `${POKE_API}/pokemon?limit=${limit}&offset=${offset}`
  );
  const pokemonList = await Promise.all(
    response.data.results.map(async (pokemon: { url: string }) => {
      const detail = await axios.get(pokemon.url);
      return detail.data;
    })
  );
  return pokemonList;
};

export const getPokemonDetail = async (id: number): Promise<PokemonDetail> => {
  const response = await axios.get(`${POKE_API}/pokemon/${id}`);
  return response.data;
};

export const submitPokemonComment = async (comment: PokemonComment) => {
  const response = await axios.post(`${MOCK_API}/pokemon`, comment);
  return response.data;
};

export const getPokemonComments = async (pokemonId: string) => {
  try {
    const response = await axios.get(
      `${MOCK_API}/pokemon?idPokemon=${pokemonId}`
    );
    return response.data;
  } catch (error) {
    return [];
  }
};
