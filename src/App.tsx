import React from "react";
import { Container, Typography } from "@mui/material";
import PokemonList from "./components/PokemonList";

function App() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Pokemon List
      </Typography>
      <PokemonList />
    </Container>
  );
}

export default App;
