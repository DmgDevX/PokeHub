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
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import StyleIcon from "@mui/icons-material/Style";
import { getTcgCards } from "../api/tcgApi";
import TcgCard from "../components/TcgCard";
import type { TcgCard as TcgCardType } from "../types/tcg";

const STORAGE_KEY = "pokehub_deck_builder_draft";
const MAX_DECK_SIZE = 60;
const MAX_PER_CARD = 4;

interface DeckCard {
  card: TcgCardType;
  quantity: number;
}

interface DeckDraft {
  name: string;
  cards: DeckCard[];
}

function getEmptyDeck(): DeckDraft {
  return {
    name: "Mi mazo Pokémon TCG",
    cards: [],
  };
}

function loadDeckFromStorage(): DeckDraft {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return getEmptyDeck();
  }

  try {
    return JSON.parse(saved) as DeckDraft;
  } catch {
    return getEmptyDeck();
  }
}

export default function DeckBuilderPage() {
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const [deck, setDeck] = useState<DeckDraft>(() => loadDeckFromStorage());
  const [results, setResults] = useState<TcgCardType[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [addingCardId, setAddingCardId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const totalCards = useMemo(() => {
    return deck.cards.reduce((total, deckCard) => total + deckCard.quantity, 0);
  }, [deck.cards]);

  const deckIsFull = totalCards >= MAX_DECK_SIZE;

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(deck));
  }, [deck]);

  const handleSearch = async () => {
    const normalizedSearch = searchInputRef.current?.value.trim() ?? "";

    if (!normalizedSearch) {
      setResults([]);
      setError("Introduce el nombre de una carta o Pokémon para buscar.");
      return;
    }

    try {
      setError("");
      setSearchLoading(true);

      const data = await getTcgCards({
        search: normalizedSearch,
        page: 0,
      });

      setResults(data.cards);
    } catch {
      setError("No se pudieron cargar las cartas TCG.");
      setResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleAddCard = (card: TcgCardType) => {
    if (deckIsFull) {
      setError("El mazo ya tiene 60 cartas.");
      return;
    }

    setError("");
    setAddingCardId(card.id);

    setDeck((currentDeck) => {
      const existingCard = currentDeck.cards.find(
        (deckCard) => deckCard.card.id === card.id
      );

      if (existingCard) {
        if (existingCard.quantity >= MAX_PER_CARD) {
          setError("No puedes añadir más de 4 copias de la misma carta.");
          return currentDeck;
        }

        return {
          ...currentDeck,
          cards: currentDeck.cards.map((deckCard) =>
            deckCard.card.id === card.id
              ? {
                  ...deckCard,
                  quantity: deckCard.quantity + 1,
                }
              : deckCard
          ),
        };
      }

      return {
        ...currentDeck,
        cards: [
          ...currentDeck.cards,
          {
            card,
            quantity: 1,
          },
        ],
      };
    });

    setAddingCardId(null);
  };

  const handleQuantityChange = (cardId: string, delta: number) => {
    setDeck((currentDeck) => {
      const currentCard = currentDeck.cards.find(
        (deckCard) => deckCard.card.id === cardId
      );

      if (!currentCard) {
        return currentDeck;
      }

      const nextQuantity = currentCard.quantity + delta;
      const nextTotal = totalCards + delta;

      if (nextQuantity > MAX_PER_CARD) {
        setError("No puedes tener más de 4 copias de la misma carta.");
        return currentDeck;
      }

      if (nextTotal > MAX_DECK_SIZE) {
        setError("El mazo no puede superar las 60 cartas.");
        return currentDeck;
      }

      setError("");

      return {
        ...currentDeck,
        cards: currentDeck.cards
          .map((deckCard) =>
            deckCard.card.id === cardId
              ? {
                  ...deckCard,
                  quantity: nextQuantity,
                }
              : deckCard
          )
          .filter((deckCard) => deckCard.quantity > 0),
      };
    });
  };

  const handleRemoveCard = (cardId: string) => {
    setDeck((currentDeck) => ({
      ...currentDeck,
      cards: currentDeck.cards.filter((deckCard) => deckCard.card.id !== cardId),
    }));
  };

  const handleClearDeck = () => {
    setDeck(getEmptyDeck());
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
              "linear-gradient(135deg, rgba(59,76,202,0.12), rgba(255,203,5,0.22))",
            border: "1px solid rgba(59,76,202,0.18)",
          }}
        >
          <Stack spacing={1.5}>
            <Stack
              direction="row"
              spacing={1.5}
              sx={{ alignItems: "center" }}
            >
              <StyleIcon sx={{ color: "#3b4cca", fontSize: 38 }} />

              <Box>
                <Typography variant="h4" sx={{ fontWeight: 900 }}>
                  Deck Builder
                </Typography>

                <Typography color="text.secondary">
                  Crea un mazo Pokémon TCG virtual, busca cartas y controla el
                  número de copias.
                </Typography>
              </Box>
            </Stack>

            <TextField
              label="Nombre del mazo"
              value={deck.name}
              onChange={(event) =>
                setDeck((currentDeck) => ({
                  ...currentDeck,
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
                Buscar cartas
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
                    backgroundColor: "#3b4cca",
                    "&:hover": {
                      backgroundColor: "#26348f",
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
                  Busca cartas para añadirlas al mazo.
                </Typography>
              )}

              {results.map((card) => {
                const isAddingThisCard = addingCardId === card.id;
                const deckCard = deck.cards.find(
                  (item) => item.card.id === card.id
                );

                return (
                  <Card
                    key={card.id}
                    elevation={0}
                    sx={{
                      border: "1px solid #e2e8f0",
                      borderRadius: 3,
                      flexShrink: 0,
                    }}
                  >
                    <CardContent
                      sx={{
                        p: 1.5,
                        "&:last-child": {
                          pb: 1.5,
                        },
                      }}
                    >
                      <Stack spacing={1.5}>
                        <Stack
                          direction="row"
                          spacing={1.5}
                          sx={{ alignItems: "center", minWidth: 0 }}
                        >
                          <Box
                            component="img"
                            src={card.image ?? ""}
                            alt={card.name}
                            sx={{
                              width: 64,
                              height: 90,
                              objectFit: "contain",
                              flexShrink: 0,
                              borderRadius: 1.5,
                              backgroundColor: "#f8fafc",
                            }}
                          />

                          <Box sx={{ minWidth: 0, flex: 1 }}>
                            <Typography
                              sx={{
                                fontWeight: 900,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {card.name}
                            </Typography>

                            <Stack
                              direction="row"
                              sx={{ flexWrap: "wrap", gap: 0.8, mt: 0.8 }}
                            >
                              {card.rarity && (
                                <Chip
                                  label={card.rarity}
                                  size="small"
                                  sx={{ fontWeight: 700 }}
                                />
                              )}

                              {card.category && (
                                <Chip
                                  label={card.category}
                                  size="small"
                                  sx={{
                                    fontWeight: 700,
                                    backgroundColor: "#eff6ff",
                                    color: "#1d4ed8",
                                  }}
                                />
                              )}
                            </Stack>

                            {deckCard && (
                              <Typography
                                variant="body2"
                                sx={{ color: "#3b4cca", fontWeight: 800, mt: 1 }}
                              >
                                En mazo: x{deckCard.quantity}
                              </Typography>
                            )}
                          </Box>
                        </Stack>

                        <Button
                          variant="outlined"
                          startIcon={
                            isAddingThisCard ? (
                              <CircularProgress size={16} />
                            ) : (
                              <AddIcon />
                            )
                          }
                          disabled={
                            deckIsFull ||
                            isAddingThisCard ||
                            (deckCard?.quantity ?? 0) >= MAX_PER_CARD
                          }
                          onClick={() => handleAddCard(card)}
                          sx={{
                            borderRadius: 999,
                            fontWeight: 800,
                          }}
                        >
                          Añadir
                        </Button>
                      </Stack>
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
                    {deck.name || "Mazo Pokémon TCG"}
                  </Typography>

                  <Typography color="text.secondary">
                    {totalCards}/{MAX_DECK_SIZE} cartas añadidas
                  </Typography>
                </Box>

                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<RestartAltIcon />}
                  onClick={handleClearDeck}
                  disabled={deck.cards.length === 0}
                  sx={{ borderRadius: 999, fontWeight: 800 }}
                >
                  Reiniciar mazo
                </Button>
              </Stack>

              <Box sx={{ mt: 2 }}>
                <Box
                  sx={{
                    height: 12,
                    borderRadius: 999,
                    backgroundColor: "#e2e8f0",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      width: `${Math.min(
                        (totalCards / MAX_DECK_SIZE) * 100,
                        100
                      )}%`,
                      height: "100%",
                      background:
                        totalCards === MAX_DECK_SIZE
                          ? "linear-gradient(90deg, #22c55e, #16a34a)"
                          : "linear-gradient(90deg, #3b4cca, #ffcb05)",
                    }}
                  />
                </Box>
              </Box>
            </Paper>

            {deck.cards.length === 0 ? (
              <Card
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
                  <StyleIcon sx={{ fontSize: 54, color: "#cbd5e1" }} />

                  <Typography sx={{ fontWeight: 900 }} color="text.secondary">
                    Mazo vacío
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Busca cartas y añádelas para empezar a construir tu mazo.
                  </Typography>
                </CardContent>
              </Card>
            ) : (
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
                {deck.cards.map(({ card, quantity }) => (
                  <Card
                    key={card.id}
                    elevation={0}
                    sx={{
                      borderRadius: 4,
                      border: "1px solid #e2e8f0",
                      overflow: "hidden",
                    }}
                  >
                    <CardContent>
                      <Stack spacing={1.5}>
                        <TcgCard card={card} />

                        <Paper
                          elevation={0}
                          sx={{
                            p: 1.5,
                            borderRadius: 3,
                            backgroundColor: "#f8fafc",
                            border: "1px solid #e2e8f0",
                          }}
                        >
                          <Stack
                            direction="row"
                            spacing={1}
                            sx={{
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <IconButton
                              onClick={() => handleQuantityChange(card.id, -1)}
                            >
                              <RemoveIcon />
                            </IconButton>

                            <Chip
                              label={`x${quantity}`}
                              sx={{
                                fontWeight: 900,
                                fontSize: "1rem",
                                backgroundColor: "#ffcb05",
                                color: "#1f2937",
                              }}
                            />

                            <IconButton
                              disabled={
                                quantity >= MAX_PER_CARD || deckIsFull
                              }
                              onClick={() => handleQuantityChange(card.id, 1)}
                            >
                              <AddIcon />
                            </IconButton>

                            <IconButton
                              color="error"
                              onClick={() => handleRemoveCard(card.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Stack>
                        </Paper>
                      </Stack>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}