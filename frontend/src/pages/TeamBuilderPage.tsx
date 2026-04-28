import { useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import type {
  PokemonDetail,
  PokemonListItem,
  PokemonMove,
} from "../types/pokemon";
import type { PokemonTeamDraft, TeamSlot } from "../types/team";
import { getPokemonByName, getPokemonList } from "../api/pokemonApi";

const STORAGE_KEY = "pokehub_team_builder_draft";
const MAX_TEAM_SIZE = 6;
const MAX_MOVES = 4;

const typeColors: Record<string, string> = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

function createSlotId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random()}`;
}

function getEmptyTeam(): PokemonTeamDraft {
  return {
    name: "Mi equipo Pokémon",
    slots: [],
  };
}

function loadTeamFromStorage(): PokemonTeamDraft {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return getEmptyTeam();
  }

  try {
    return JSON.parse(saved) as PokemonTeamDraft;
  } catch {
    return getEmptyTeam();
  }
}

export default function TeamBuilderPage() {
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const [team, setTeam] = useState<PokemonTeamDraft>(() =>
    loadTeamFromStorage()
  );
  const [results, setResults] = useState<PokemonListItem[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [addingPokemonName, setAddingPokemonName] = useState<string | null>(
    null
  );
  const [error, setError] = useState("");

  const teamIsFull = team.slots.length >= MAX_TEAM_SIZE;

  const teamTypes = useMemo(() => {
    const uniqueTypes = new Map<string, (typeof team.slots)[number]["pokemon"]["types"][number]>();

    team.slots
      .flatMap((slot) => slot.pokemon.types)
      .forEach((type) => {
        if (!uniqueTypes.has(type.key)) {
          uniqueTypes.set(type.key, type);
        }
      });

    return Array.from(uniqueTypes.values());
  }, [team.slots]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(team));
  }, [team]);

  const handleSearch = async () => {
    const normalizedSearch = searchInputRef.current?.value.trim() ?? "";

    if (!normalizedSearch) {
      setResults([]);
      setError("Introduce el nombre de un Pokémon para buscar.");
      return;
    }

    try {
      setError("");
      setSearchLoading(true);

      const data = await getPokemonList(15, 0, normalizedSearch);
      setResults(data);
    } catch {
      setError("No se pudieron cargar los Pokémon.");
      setResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleAddPokemon = async (pokemonName: string) => {
    if (teamIsFull) {
      setError("El equipo ya tiene 6 Pokémon.");
      return;
    }

    try {
      setError("");
      setAddingPokemonName(pokemonName);

      const pokemon: PokemonDetail = await getPokemonByName(pokemonName);

      const newSlot: TeamSlot = {
        id: createSlotId(),
        pokemon,
        selectedAbility: pokemon.abilities[0] ?? "",
        selectedMoves: [],
      };

      setTeam((currentTeam) => ({
        ...currentTeam,
        slots: [...currentTeam.slots, newSlot],
      }));
    } catch {
      setError(`No se pudo añadir ${pokemonName} al equipo.`);
    } finally {
      setAddingPokemonName(null);
    }
  };

  const handleRemovePokemon = (slotId: string) => {
    setTeam((currentTeam) => ({
      ...currentTeam,
      slots: currentTeam.slots.filter((slot) => slot.id !== slotId),
    }));
  };

  const handleAbilityChange = (slotId: string, ability: string) => {
    setTeam((currentTeam) => ({
      ...currentTeam,
      slots: currentTeam.slots.map((slot) =>
        slot.id === slotId
          ? {
              ...slot,
              selectedAbility: ability,
            }
          : slot
      ),
    }));
  };

  const handleMoveSlotChange = (
    slotId: string,
    moveIndex: number,
    moveName: string
  ) => {
    setTeam((currentTeam) => ({
      ...currentTeam,
      slots: currentTeam.slots.map((slot) => {
        if (slot.id !== slotId) {
          return slot;
        }

        const nextMoves = [...slot.selectedMoves];

        if (!moveName) {
          nextMoves.splice(moveIndex, 1);

          return {
            ...slot,
            selectedMoves: nextMoves,
          };
        }

        const selectedMove = slot.pokemon.moves.find(
          (move) => move.name === moveName
        );

        if (!selectedMove) {
          return slot;
        }

        nextMoves[moveIndex] = selectedMove;

        return {
          ...slot,
          selectedMoves: nextMoves.slice(0, MAX_MOVES),
        };
      }),
    }));
  };

  const isMoveAlreadySelected = (
    selectedMoves: PokemonMove[],
    moveName: string,
    currentIndex: number
  ) => {
    return selectedMoves.some(
      (move, index) => move.name === moveName && index !== currentIndex
    );
  };

  const handleClearTeam = () => {
    setTeam(getEmptyTeam());
    setResults([]);
    setError("");

    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }

    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, md: 4 },
            borderRadius: 4,
            background:
              "linear-gradient(135deg, rgba(239,83,80,0.12), rgba(59,76,202,0.12))",
            border: "1px solid rgba(59,76,202,0.18)",
          }}
        >
          <Stack spacing={1.5}>
            <Stack
              direction="row"
              spacing={1.5}
              sx={{ alignItems: "center" }}
            >
              <CatchingPokemonIcon sx={{ color: "#d32f2f", fontSize: 38 }} />

              <Box>
                <Typography variant="h4" sx={{ fontWeight: 900 }}>
                  Team Builder
                </Typography>

                <Typography color="text.secondary">
                  Crea un equipo de hasta 6 Pokémon, elige su habilidad y
                  configura sus 4 movimientos.
                </Typography>
              </Box>
            </Stack>

            <TextField
              label="Nombre del equipo"
              value={team.name}
              onChange={(event) =>
                setTeam((currentTeam) => ({
                  ...currentTeam,
                  name: event.target.value,
                }))
              }
              sx={{ maxWidth: 420 }}
            />
          </Stack>
        </Paper>

        {error && <Alert severity="warning">{error}</Alert>}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "420px 1fr" },
            gap: 3,
            alignItems: "start",
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 4,
              border: "1px solid #e2e8f0",
              position: { lg: "sticky" },
              top: { lg: 96 },
              height: {
                xs: "auto",
                lg: "calc(100vh - 130px)",
              },
              maxHeight: {
                xs: "none",
                lg: "900px",
              },
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <Box sx={{ flexShrink: 0 }}>
              <Typography variant="h6" sx={{ fontWeight: 900, mb: 2 }}>
                Buscar Pokémon
              </Typography>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <TextField
                  fullWidth
                  label="Ej: Pikachu, Charizard..."
                  inputRef={searchInputRef}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleSearch();
                    }
                  }}
                />

                <Button
                  variant="contained"
                  startIcon={
                    searchLoading ? (
                      <CircularProgress size={18} color="inherit" />
                    ) : (
                      <SearchIcon />
                    )
                  }
                  onClick={handleSearch}
                  disabled={searchLoading}
                  sx={{
                    minWidth: 130,
                    fontWeight: 800,
                    borderRadius: 3,
                    backgroundColor: "#d32f2f",
                    "&:hover": {
                      backgroundColor: "#b71c1c",
                    },
                  }}
                >
                  Buscar
                </Button>
              </Stack>

              <Divider sx={{ my: 2 }} />
            </Box>

            <Box
              sx={{
                flex: 1,
                minHeight: 0,
                overflowY: "auto",
                pr: 0.5,
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
              }}
            >
              {results.length === 0 && !searchLoading && (
                <Typography color="text.secondary">
                  Busca un Pokémon para añadirlo al equipo.
                </Typography>
              )}

              {results.map((pokemon) => {
                const isAddingThisPokemon = addingPokemonName === pokemon.name;

                return (
                  <Card
                    key={`${pokemon.id}-${pokemon.name}`}
                    elevation={0}
                    sx={{
                      border: "1px solid #e2e8f0",
                      borderRadius: 3,
                      flexShrink: 0,
                    }}
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 2,
                        p: 1.5,
                        "&:last-child": {
                          pb: 1.5,
                        },
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={1.5}
                        sx={{ alignItems: "center", minWidth: 0 }}
                      >
                        <Box
                          component="img"
                          src={pokemon.image}
                          alt={pokemon.name}
                          sx={{
                            width: 58,
                            height: 58,
                            objectFit: "contain",
                            flexShrink: 0,
                          }}
                        />

                        <Box sx={{ minWidth: 0 }}>
                          <Typography
                            sx={{
                              fontWeight: 900,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            #{pokemon.id} {pokemon.name}
                          </Typography>

                          <Typography variant="body2" color="text.secondary">
                            Resultado de búsqueda
                          </Typography>
                        </Box>
                      </Stack>

                      <Button
                        variant="outlined"
                        startIcon={
                          isAddingThisPokemon ? (
                            <CircularProgress size={16} />
                          ) : (
                            <AddIcon />
                          )
                        }
                        disabled={teamIsFull || isAddingThisPokemon}
                        onClick={() => handleAddPokemon(pokemon.name)}
                        sx={{
                          borderRadius: 999,
                          fontWeight: 800,
                          flexShrink: 0,
                        }}
                      >
                        Añadir
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </Box>
          </Paper>

          <Stack spacing={2}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: 4,
                border: "1px solid #e2e8f0",
              }}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ justifyContent: "space-between" }}
              >
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 900 }}>
                    {team.name || "Equipo Pokémon"}
                  </Typography>

                  <Typography color="text.secondary">
                    {team.slots.length}/{MAX_TEAM_SIZE} Pokémon añadidos
                  </Typography>
                </Box>

                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<RestartAltIcon />}
                  onClick={handleClearTeam}
                  disabled={team.slots.length === 0}
                  sx={{ borderRadius: 999, fontWeight: 800 }}
                >
                  Reiniciar equipo
                </Button>
              </Stack>

              {teamTypes.length > 0 && (
                <Stack
                  direction="row"
                  sx={{ flexWrap: "wrap", gap: 1, mt: 2 }}
                >
                  {teamTypes.map((type, index) => (
                    <Chip
                      key={`${type.key}-${index}`}
                      label={type.name}
                      sx={{
                        fontWeight: 800,
                        color: "white",
                        backgroundColor: typeColors[type.key] ?? "#64748b",
                      }}
                    />
                  ))}
                </Stack>
              )}
            </Paper>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "repeat(2, minmax(0, 1fr))",
                  xl: "repeat(3, minmax(0, 1fr))",
                },
                gap: 2,
              }}
            >
              {Array.from({ length: MAX_TEAM_SIZE }).map((_, index) => {
                const slot = team.slots[index];

                if (!slot) {
                  return (
                    <Card
                      key={`empty-${index}`}
                      elevation={0}
                      sx={{
                        minHeight: 360,
                        borderRadius: 4,
                        border: "2px dashed #cbd5e1",
                        backgroundColor: "rgba(255,255,255,0.7)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                      }}
                    >
                      <CardContent>
                        <CatchingPokemonIcon
                          sx={{ fontSize: 54, color: "#cbd5e1" }}
                        />

                        <Typography
                          sx={{ fontWeight: 900 }}
                          color="text.secondary"
                        >
                          Slot {index + 1}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                          Busca un Pokémon y añádelo al equipo.
                        </Typography>
                      </CardContent>
                    </Card>
                  );
                }

                return (
                  <Card
                    key={slot.id}
                    elevation={0}
                    sx={{
                      borderRadius: 4,
                      border: "1px solid #e2e8f0",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        p: 2,
                        background:
                          "linear-gradient(135deg, rgba(239,83,80,0.14), rgba(255,203,5,0.22))",
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ justifyContent: "space-between" }}
                      >
                        <Box>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontWeight: 800 }}
                          >
                            Slot {index + 1}
                          </Typography>

                          <Typography variant="h6" sx={{ fontWeight: 900 }}>
                            #{slot.pokemon.id} {slot.pokemon.name}
                          </Typography>
                        </Box>

                        <IconButton
                          color="error"
                          onClick={() => handleRemovePokemon(slot.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Stack>

                      <Box
                        component="img"
                        src={slot.pokemon.image}
                        alt={slot.pokemon.name}
                        sx={{
                          width: "100%",
                          height: 150,
                          objectFit: "contain",
                          mt: 1,
                        }}
                      />

                      <Stack
                        direction="row"
                        sx={{
                          flexWrap: "wrap",
                          gap: 1,
                          justifyContent: "center",
                        }}
                      >
                        {slot.pokemon.types.map((type) => (
                          <Chip
                            key={type.key}
                            label={type.name}
                            size="small"
                            sx={{
                              fontWeight: 800,
                              color: "white",
                              backgroundColor:
                                typeColors[type.key] ?? "#64748b",
                            }}
                          />
                        ))}
                      </Stack>
                    </Box>

                    <CardContent>
                      <Stack spacing={2}>
                        <TextField
                          select
                          label="Habilidad"
                          value={slot.selectedAbility}
                          onChange={(event) =>
                            handleAbilityChange(slot.id, event.target.value)
                          }
                          fullWidth
                        >
                          {slot.pokemon.abilities.map((ability) => (
                            <MenuItem key={ability} value={ability}>
                              {ability}
                            </MenuItem>
                          ))}
                        </TextField>

                        <Divider />

                        <Box>
                          <Typography sx={{ fontWeight: 900, mb: 1.5 }}>
                            Set de movimientos
                          </Typography>

                          <Box
                            sx={{
                              display: "grid",
                              gridTemplateColumns: "1fr",
                              gap: 1.5,
                            }}
                          >
                            {Array.from({ length: MAX_MOVES }).map(
                              (_, moveIndex) => {
                                const selectedMove =
                                  slot.selectedMoves[moveIndex];

                                return (
                                  <Paper
                                    key={`${slot.id}-move-${moveIndex}`}
                                    elevation={0}
                                    sx={{
                                      p: 1.5,
                                      borderRadius: 3,
                                      border: selectedMove
                                        ? "2px solid rgba(59,76,202,0.45)"
                                        : "2px dashed #cbd5e1",
                                      background: selectedMove
                                        ? "linear-gradient(135deg, rgba(59,76,202,0.10), rgba(255,203,5,0.22))"
                                        : "#f8fafc",
                                    }}
                                  >
                                    <Stack
                                      direction="row"
                                      spacing={1.5}
                                      sx={{ alignItems: "center" }}
                                    >
                                      <Box
                                        sx={{
                                          width: 42,
                                          height: 42,
                                          borderRadius: "50%",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          fontWeight: 900,
                                          color: selectedMove
                                            ? "#1f2937"
                                            : "#94a3b8",
                                          backgroundColor: selectedMove
                                            ? "#ffcb05"
                                            : "#e2e8f0",
                                          border: "2px solid white",
                                          boxShadow: selectedMove
                                            ? "0 6px 14px rgba(0,0,0,0.16)"
                                            : "none",
                                          flexShrink: 0,
                                        }}
                                      >
                                        {moveIndex + 1}
                                      </Box>

                                      <TextField
                                        select
                                        fullWidth
                                        label={`Movimiento ${moveIndex + 1}`}
                                        value={selectedMove?.name ?? ""}
                                        onChange={(event) =>
                                          handleMoveSlotChange(
                                            slot.id,
                                            moveIndex,
                                            event.target.value
                                          )
                                        }
                                        sx={{
                                          "& .MuiOutlinedInput-root": {
                                            borderRadius: 3,
                                            backgroundColor: "white",
                                            fontWeight: 800,
                                          },
                                        }}
                                      >
                                        <MenuItem value="">
                                          Sin movimiento
                                        </MenuItem>

                                        {slot.pokemon.moves.map((move) => (
                                          <MenuItem
                                            key={`${slot.id}-${moveIndex}-${move.name}`}
                                            value={move.name}
                                            disabled={isMoveAlreadySelected(
                                              slot.selectedMoves,
                                              move.name,
                                              moveIndex
                                            )}
                                          >
                                            {move.name}
                                          </MenuItem>
                                        ))}
                                      </TextField>
                                    </Stack>
                                  </Paper>
                                );
                              }
                            )}
                          </Box>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                );
              })}
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}