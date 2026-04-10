import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import PokemonCard from "../components/PokemonCard";
import PokemonSearchBar from "../components/PokemonSearchBar";
import PokemonLoadingModal from "../components/PokemonLoadingModal";
import { getPokemonList } from "../api/pokemonApi";
import type { PokemonListItem } from "../types/pokemon";

export default function PokemonListPage() {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(27);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [loadingMessage, setLoadingMessage] = useState("Cargando Pokédex...");

  const loadPokemon = async (searchValue: string, currentLimit: number) => {
    try {
      const isSearching = searchValue.trim().length > 0;

      if (isSearching) {
        setLoadingMessage("Buscando Pokémon...");
        setLoading(true);
      } else if (currentLimit === 27) {
        setLoadingMessage("Cargando Pokédex...");
        setLoading(true);
      } else {
        setLoadingMessage("Cargando más Pokémon...");
        setLoadingMore(true);
      }

      setError("");

      const data = await getPokemonList(currentLimit, 0, searchValue);
      setPokemonList(data);
    } catch {
      setError("No se pudieron cargar los Pokémon. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    if (search.trim()) return;
    loadPokemon("", limit);
  }, [limit, search]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (search.trim()) {
        loadPokemon(search, 27);
      } else if (limit === 27) {
        loadPokemon("", 27);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [search, limit]);

  const isModalOpen = loading || loadingMore;

  return (
    <>
      <PokemonLoadingModal open={isModalOpen} message={loadingMessage} />

      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          background:
            "linear-gradient(180deg, #f8fafc 0%, #eef2ff 35%, #fff7ed 100%)",
          pb: 6,
        }}
      >
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            background:
              "linear-gradient(135deg, #ef5350 0%, #d32f2f 45%, #3b4cca 100%)",
            color: "white",
            pt: { xs: 7, md: 10 },
            pb: { xs: 8, md: 10 },
            px: { xs: 2, md: 3, xl: 5 },
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Box sx={{ position: "relative", zIndex: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1.5,
                  mb: 2,
                }}
              >
                <CatchingPokemonIcon sx={{ fontSize: 34, color: "#ffcb05" }} />
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 900,
                    letterSpacing: 1,
                    textAlign: "center",
                    fontSize: { xs: "2.2rem", md: "3.2rem" },
                    textShadow: "0 3px 10px rgba(0,0,0,0.2)",
                  }}
                >
                  PokéHub
                </Typography>
              </Box>

              <Typography
                sx={{
                  textAlign: "center",
                  maxWidth: 760,
                  mx: "auto",
                  color: "rgba(255,255,255,0.92)",
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  mb: 3,
                }}
              >
                Explora tu Pokédex, descubre detalles de cada Pokémon y empieza a
                construir la base del proyecto.
              </Typography>

              <Box sx={{ maxWidth: 700, width: "100%", mx: "auto", mt: 1 }}>
                <PokemonSearchBar value={search} onChange={setSearch} />
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              position: "absolute",
              width: 240,
              height: 240,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.08)",
              top: -50,
              left: -70,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              width: 320,
              height: 320,
              borderRadius: "50%",
              background: "rgba(255,203,5,0.12)",
              bottom: -120,
              right: -100,
            }}
          />
        </Box>

        <Box
          sx={{
            mt: { xs: -4, md: -5 },
            position: "relative",
            zIndex: 3,
            px: { xs: 2, md: 3, xl: 5 },
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Paper
              elevation={0}
              sx={{
                width: "100%",
                backgroundColor: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(12px)",
                borderRadius: 5,
                p: { xs: 2.5, md: 4, xl: 5 },
                boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
                border: "1px solid rgba(255,255,255,0.6)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "space-between",
                  alignItems: { xs: "flex-start", md: "center" },
                  gap: 2,
                  mb: 3,
                }}
              >
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 900, color: "#1f2937" }}>
                    Listado de Pokémon
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {pokemonList.length} Pokémon visibles
                  </Typography>
                </Box>
              </Box>

              {error ? (
                <Alert severity="error">{error}</Alert>
              ) : pokemonList.length === 0 && !isModalOpen ? (
                <Alert severity="info">
                  No se han encontrado Pokémon con esa búsqueda.
                </Alert>
              ) : (
                <>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                      gap: { xs: 2, md: 3 },
                      alignItems: "stretch",
                    }}
                  >
                    {pokemonList.map((pokemon) => (
                      <Box key={pokemon.id} sx={{ minWidth: 0 }}>
                        <PokemonCard pokemon={pokemon} />
                      </Box>
                    ))}
                  </Box>

                  {!search.trim() && (
                    <Box
                      sx={{
                        mt: 5,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        onClick={() => setLimit((prev) => prev + 27)}
                        endIcon={<KeyboardArrowRightIcon />}
                        disabled={loadingMore}
                        sx={{
                          borderRadius: "999px",
                          px: 4,
                          py: 1.4,
                          fontWeight: 800,
                          textTransform: "none",
                          background: "linear-gradient(90deg, #3b4cca 0%, #5c6bc0 100%)",
                          boxShadow: "0 10px 24px rgba(59,76,202,0.28)",
                        }}
                      >
                        Cargar 27 más
                      </Button>
                    </Box>
                  )}
                </>
              )}
            </Paper>
          </Box>
        </Box>
      </Box>
    </>
  );
}