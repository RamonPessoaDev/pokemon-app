import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { getPokemonList } from "../services/api";
import { Pokemon } from "../types/pokemon";
import PokemonDrawer from "./PokemonDrawer";

export default function PokemonList() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      const data = await getPokemonList();
      setPokemons(data);
      setLoading(false);
    };
    fetchPokemons();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 130 },
    {
      field: "image",
      headerName: "Image",
      width: 130,
      renderCell: (params: any) => (
        <img
          src={params.row.sprites.front_default}
          alt={params.row.name}
          style={{ width: 50, height: 50 }}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 130,
      renderCell: (params: any) => (
        <Button
          variant="contained"
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedPokemon(params.row.id);
          }}
        >
          Details
        </Button>
      ),
    },
  ];

  return (
    <>
      <DataGrid
        rows={pokemons}
        columns={columns}
        loading={loading}
        onRowClick={(params) => setSelectedPokemon(params.row.id)}
        autoHeight
        sx={{
          "& .MuiDataGrid-row": {
            cursor: "pointer",
          },
        }}
      />
      <PokemonDrawer
        pokemonId={selectedPokemon}
        open={selectedPokemon !== null}
        onClose={() => setSelectedPokemon(null)}
      />
    </>
  );
}
