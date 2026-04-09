import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import BoltIcon from "@mui/icons-material/Bolt";
import SportsMmaIcon from "@mui/icons-material/SportsMma";
import { useNavigate, useParams } from "react-router-dom";
import { getPokemonByName } from "../api/pokemonApi";
import type { PokemonDetail } from "../types/pokemon";

const formatPokemonId = (id: number) => `#${String(id).padStart(3, "0")}`;

const typeColors: Record<string, { bg: string; color: string }> = {
  grass: { bg: "#78c850", color: "#102a13" },
  fire: { bg: "#f08030", color: "#2f1305" },
  water: { bg: "#6890f0", color: "#081b49" },
  electric: { bg: "#f8d030", color: "#4f3d00" },
  psychic: { bg: "#f85888", color: "#4b1023" },
  ice: { bg: "#98d8d8", color: "#113333" },
  dragon: { bg: "#7038f8", color: "#f3e8ff" },
  dark: { bg: "#705848", color: "#f5f5f4" },
  fairy: { bg: "#ee99ac", color: "#4b1d28" },
  normal: { bg: "#a8a878", color: "#2f2f15" },
  fighting: { bg: "#c03028", color: "#fff1f2" },
  flying: { bg: "#a890f0", color: "#21163f" },
  poison: { bg: "#a040a0", color: "#faf5ff" },
  ground: { bg: "#e0c068", color: "#3d2d06" },
  rock: { bg: "#b8a038", color: "#332700" },
  bug: { bg: "#a8b820", color: "#213000" },
  ghost: { bg: "#705898", color: "#f5f3ff" },
  steel: { bg: "#b8b8d0", color: "#1f2937" },
};

function DetailSection({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        border: "1px solid rgba(0,0,0,0.08)",
        height: "100%",
        backgroundColor: "rgba(255,255,255,0.94)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.2,
          mb: 2,
        }}
      >
        {icon}
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          {title}
        </Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {children}
    </Paper>
  );
}

export default function PokemonDetailPage() {
  const { name } = useParams();
  const navigate = useNavigate();

  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setLoading(true);
        setError("");

        if (!name) {
          setError("No se ha indicado ningún Pokémon.");
          setLoading(false);
          return;
        }

        const data = await getPokemonByName(name);
        setPokemon(data);
      } catch {
        setError("No se pudo cargar el detalle del Pokémon.");
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, [name]);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background:
            "linear-gradient(180deg, #f8fafc 0%, #eef2ff 40%, #fff7ed 100%)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
          }}
        >
          <CircularProgress />
          <Typography color="text.secondary">Cargando detalle...</Typography>
        </Box>
      </Box>
    );
  }

  if (error || !pokemon) {
    return (
      <Container sx={{ py: 6 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
            sx={{ alignSelf: "flex-start" }}
          >
            Volver
          </Button>

          <Alert severity="error">{error || "Pokémon no encontrado."}</Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #f8fafc 0%, #eef2ff 40%, #fff7ed 100%)",
        py: { xs: 3, md: 5 },
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
            sx={{
              alignSelf: "flex-start",
              fontWeight: 700,
              borderRadius: "999px",
              px: 2,
              color: "#3b4cca",
            }}
          >
            Volver a la Pokédex
          </Button>

          <Paper
            elevation={0}
            sx={{
              overflow: "hidden",
              borderRadius: 5,
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: "0 18px 50px rgba(0,0,0,0.08)",
            }}
          >
            <Box
              sx={{
                background:
                  "linear-gradient(135deg, #ef5350 0%, #d32f2f 45%, #3b4cca 100%)",
                color: "white",
                px: { xs: 3, md: 5 },
                py: { xs: 4, md: 5 },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: 4,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ flex: 1, width: "100%" }}>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: "rgba(255,255,255,0.8)",
                      letterSpacing: 1,
                      mb: 1,
                    }}
                  >
                    {formatPokemonId(pokemon.id)}
                  </Typography>

                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 900,
                      fontSize: { xs: "2.2rem", md: "3rem" },
                      lineHeight: 1.05,
                      mb: 2,
                    }}
                  >
                    {pokemon.name}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1,
                      mb: 3,
                    }}
                  >
                    {pokemon.types.map((type) => {
                      const typeStyle = typeColors[type.key] || {
                        bg: "#e5e7eb",
                        color: "#111827",
                      };

                      return (
                        <Chip
                          key={type.key}
                          label={type.name.toUpperCase()}
                          sx={{
                            fontWeight: 800,
                            backgroundColor: typeStyle.bg,
                            color: typeStyle.color,
                          }}
                        />
                      );
                    })}
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 4,
                    }}
                  >
                    <Box>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Altura
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 800 }}>
                        {pokemon.height}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Peso
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 800 }}>
                        {pokemon.weight}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box
                  sx={{
                    width: "100%",
                    maxWidth: 320,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    component="img"
                    src={pokemon.image}
                    alt={pokemon.name}
                    sx={{
                      width: "100%",
                      maxWidth: 260,
                      height: "auto",
                      objectFit: "contain",
                      filter: "drop-shadow(0 16px 24px rgba(0,0,0,0.26))",
                    }}
                  />
                </Box>
              </Box>
            </Box>

            <Box sx={{ p: { xs: 2.5, md: 4 } }}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                  gap: 3,
                  mb: 3,
                }}
              >
                <DetailSection
                  title="Habilidades"
                  icon={<BoltIcon sx={{ color: "#f59e0b" }} />}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1,
                    }}
                  >
                    {pokemon.abilities.map((ability) => (
                      <Chip
                        key={ability}
                        label={ability}
                        sx={{
                          borderRadius: "999px",
                          fontWeight: 700,
                          backgroundColor: "#fff7ed",
                          color: "#9a3412",
                        }}
                      />
                    ))}
                  </Box>
                </DetailSection>

                <DetailSection
                  title="Tipos"
                  icon={<FitnessCenterIcon sx={{ color: "#3b4cca" }} />}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1,
                    }}
                  >
                    {pokemon.types.map((type) => {
                      const typeStyle = typeColors[type.key] || {
                        bg: "#e5e7eb",
                        color: "#111827",
                      };

                      return (
                        <Chip
                          key={type.key}
                          label={type.name}
                          sx={{
                            fontWeight: 800,
                            backgroundColor: typeStyle.bg,
                            color: typeStyle.color,
                          }}
                        />
                      );
                    })}
                  </Box>
                </DetailSection>
              </Box>

              <DetailSection
                title="Movimientos"
                icon={<SportsMmaIcon sx={{ color: "#ef4444" }} />}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                  }}
                >
                  {pokemon.moves.map((move) => (
                    <Chip
                      key={move}
                      label={move}
                      sx={{
                        borderRadius: "999px",
                        fontWeight: 600,
                        backgroundColor: "#eff6ff",
                        color: "#1d4ed8",
                      }}
                    />
                  ))}
                </Box>
              </DetailSection>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}