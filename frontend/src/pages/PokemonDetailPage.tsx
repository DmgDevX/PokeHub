import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import StyleIcon from "@mui/icons-material/Style";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import BoltIcon from "@mui/icons-material/Bolt";
import SportsMmaIcon from "@mui/icons-material/SportsMma";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useNavigate, useParams } from "react-router-dom";
import { getPokemonByName } from "../api/pokemonApi";
import PokemonLoadingModal from "../components/PokemonLoadingModal";
import type { PokemonDetail } from "../types/pokemon";

const formatPokemonId = (id: number) => `#${String(id).padStart(3, "0")}`;

const formatPokemonName = (name?: string) => {
  if (!name) return "Pokémon";
  return name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, " ");
};

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
        backgroundColor: "rgba(255,255,255,0.96)",
        height: "100%",
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

  const heightInMeters = useMemo(() => {
    if (!pokemon) return "";
    return `${(pokemon.height / 10).toFixed(1)} m`;
  }, [pokemon]);

  const weightInKg = useMemo(() => {
    if (!pokemon) return "";
    return `${(pokemon.weight / 10).toFixed(1)} kg`;
  }, [pokemon]);

  return (
    <>
      <PokemonLoadingModal
        open={loading}
        message={`Cargando datos de ${formatPokemonName(name)}...`}
      />

      {!loading && (error || !pokemon) ? (
        <Box sx={{ px: 3, py: 6 }}>
          <Box
            sx={{
              width: "100%",
              maxWidth: "1200px",
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/")}
              sx={{ alignSelf: "flex-start" }}
            >
              Volver
            </Button>

            <Alert severity="error">{error || "Pokémon no encontrado."}</Alert>
          </Box>
        </Box>
      ) : !loading && pokemon ? (
        <Box
          sx={{
            minHeight: "100vh",
            background:
              "linear-gradient(180deg, #f8fafc 0%, #eef2ff 40%, #fff7ed 100%)",
            py: { xs: 3, md: 5 },
            px: { xs: 2, md: 3, xl: 4 },
          }}
        >
          <Box sx={{ maxWidth: "1600px", mx: "auto" }}>
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
                    px: { xs: 3, md: 5, xl: 6 },
                    py: { xs: 4, md: 5, xl: 6 },
                  }}
                >
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", lg: "1.35fr 0.85fr" },
                      gap: 4,
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ minWidth: 0 }}>
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
                        variant="h2"
                        sx={{
                          fontWeight: 900,
                          fontSize: { xs: "2.2rem", md: "3rem", xl: "3.6rem" },
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
                          display: "grid",
                          gridTemplateColumns: {
                            xs: "1fr 1fr",
                            sm: "repeat(4, max-content)",
                          },
                          gap: 3,
                          alignItems: "start",
                        }}
                      >
                        <Box>
                          <Typography variant="body2" sx={{ opacity: 0.8 }}>
                            Altura
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 800 }}>
                            {heightInMeters}
                          </Typography>
                        </Box>

                        <Box>
                          <Typography variant="body2" sx={{ opacity: 0.8 }}>
                            Peso
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 800 }}>
                            {weightInKg}
                          </Typography>
                        </Box>

                        <Box>
                          <Typography variant="body2" sx={{ opacity: 0.8 }}>
                            Habilidades
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 800 }}>
                            {pokemon.abilities.length}
                          </Typography>
                        </Box>
                        <Box sx={{ mb: 3 }}>
                          <DetailSection
                            title="Cartas TCG relacionadas"
                            icon={<StyleIcon sx={{ color: "#3b4cca" }} />}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: { xs: "column", sm: "row" },
                                justifyContent: "space-between",
                                alignItems: { xs: "flex-start", sm: "center" },
                                gap: 2,
                              }}
                            >
                              <Box>
                                <Typography sx={{ fontWeight: 700, color: "#1f2937" }}>
                                  Explora cartas de {pokemon.name}
                                </Typography>

                                <Typography variant="body2" color="text.secondary">
                                  Accede al catálogo TCG filtrado por este Pokémon.
                                </Typography>
                              </Box>

                              <Button
                                variant="contained"
                                startIcon={<StyleIcon />}
                                onClick={() => navigate(`/tcg/cards?pokemon=${pokemon.name.toLowerCase()}`)}
                                sx={{
                                  fontWeight: 800,
                                  background: "linear-gradient(90deg, #3b4cca 0%, #5c6bc0 100%)",
                                  boxShadow: "0 10px 24px rgba(59,76,202,0.28)",
                                }}
                              >
                                Ver cartas
                              </Button>
                            </Box>
                          </DetailSection>
                        </Box>
                        <Box>
                          <Typography variant="body2" sx={{ opacity: 0.8 }}>
                            Movimientos
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 800 }}>
                            {pokemon.moves.length}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        width: "100%",
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
                          maxWidth: { xs: 260, md: 320, xl: 380 },
                          height: "auto",
                          objectFit: "contain",
                          filter: "drop-shadow(0 18px 28px rgba(0,0,0,0.28))",
                        }}
                      />
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ p: { xs: 2.5, md: 4, xl: 5 } }}>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
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

                  <Box sx={{ mb: 3 }}>
                    <DetailSection
                      title="Línea evolutiva"
                      icon={<AutorenewIcon sx={{ color: "#7c3aed" }} />}
                    >
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: {
                            xs: "1fr",
                            sm: "repeat(2, 1fr)",
                            lg: "repeat(3, 1fr)",
                            xl: "repeat(4, 1fr)",
                          },
                          gap: 2,
                        }}
                      >
                        {pokemon.evolutions.map((evolution) => {
                          const isCurrent = evolution.id === pokemon.id;

                          return (
                            <Paper
                              key={evolution.id}
                              onClick={() =>
                                navigate(`/pokemon/${evolution.name.toLowerCase()}`)
                              }
                              elevation={0}
                              sx={{
                                p: 2,
                                borderRadius: 3,
                                border: isCurrent
                                  ? "2px solid #ffcb05"
                                  : "1px solid rgba(0,0,0,0.08)",
                                background: isCurrent
                                  ? "linear-gradient(180deg, #fff8dc 0%, #ffffff 100%)"
                                  : "#ffffff",
                                cursor: "pointer",
                                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                                "&:hover": {
                                  transform: "translateY(-4px)",
                                  boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
                                },
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  textAlign: "center",
                                  gap: 1.2,
                                }}
                              >
                                <Box
                                  component="img"
                                  src={evolution.image}
                                  alt={evolution.name}
                                  sx={{
                                    width: 110,
                                    height: 110,
                                    objectFit: "contain",
                                  }}
                                />
                                <Typography sx={{ fontWeight: 800 }}>
                                  {evolution.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {formatPokemonId(evolution.id)}
                                </Typography>
                              </Box>
                            </Paper>
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
                        maxHeight: { xs: "none", xl: 420 },
                        overflow: "auto",
                        pr: { xl: 1 },
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
          </Box>
        </Box>
      ) : null}
    </>
  );
}