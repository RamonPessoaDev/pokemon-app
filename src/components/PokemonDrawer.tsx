import React, { useEffect, useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { ThumbUp, ThumbDown } from "@mui/icons-material";
import {
  getPokemonDetail,
  submitPokemonComment,
  getPokemonComments,
} from "../services/api";
import { PokemonDetail, PokemonComment } from "../types/pokemon";

interface PokemonDrawerProps {
  pokemonId: number | null;
  open: boolean;
  onClose: () => void;
}

export default function PokemonDrawer({
  pokemonId,
  open,
  onClose,
}: PokemonDrawerProps) {
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [comment, setComment] = useState("");
  const [like, setLike] = useState<boolean | null>(null);
  const [comments, setComments] = useState<PokemonComment[]>([]);

  useEffect(() => {
    if (pokemonId) {
      getPokemonDetail(pokemonId).then(setPokemon);
      getPokemonComments(pokemonId.toString()).then(setComments);
    }
  }, [pokemonId]);

  const handleSubmit = async () => {
    if (pokemon && like !== null) {
      try {
        await submitPokemonComment({
          nomePokemon: pokemon.name,
          idPokemon: pokemon.id.toString(),
          comentarioPokemon: comment,
          likeDislike: like,
          gitHubId: "Test User",
        });
        getPokemonComments(pokemon.id.toString()).then(setComments);
        setComment("");
        setLike(null);
        alert("Comment submitted successfully!");
      } catch (error) {
        alert("Failed to submit comment");
      }
    }
  };

  if (!pokemon) return null;

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 400, p: 3 }}>
        <Typography variant="h5">{pokemon.name}</Typography>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />

        <Typography>
          Types: {pokemon.types.map((t) => t.type.name).join(", ")}
        </Typography>
        <Typography>Height: {pokemon.height}</Typography>
        <Typography>Weight: {pokemon.weight}</Typography>
        <Typography>Base Experience: {pokemon.base_experience}</Typography>
        <Typography>
          Abilities: {pokemon.abilities.map((a) => a.ability.name).join(", ")}
        </Typography>

        {/* Comments Section */}
        <Box sx={{ mt: 3, mb: 2 }}>
          <Typography variant="h6">Previous Comments</Typography>
          {comments.map((comment, index) => (
            <Box
              key={index}
              sx={{ mt: 1, p: 2, bgcolor: "grey.100", borderRadius: 1 }}
            >
              <Typography>{comment.comentarioPokemon}</Typography>
              <Typography variant="caption">
                {comment.likeDislike ? "👍" : "👎"} by {comment.gitHubId}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ mt: 2 }}>
          <IconButton
            onClick={() => setLike(true)}
            color={like === true ? "primary" : "default"}
          >
            <ThumbUp />
          </IconButton>
          <IconButton
            onClick={() => setLike(false)}
            color={like === false ? "primary" : "default"}
          >
            <ThumbDown />
          </IconButton>
        </Box>

        <TextField
          fullWidth
          multiline
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          label="Add your comment"
          margin="normal"
        />

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!comment || like === null}
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </Box>
    </Drawer>
  );
}
