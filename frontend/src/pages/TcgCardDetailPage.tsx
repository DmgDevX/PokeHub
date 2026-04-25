import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Paper,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StyleIcon from "@mui/icons-material/Style";
import BrushIcon from "@mui/icons-material/Brush";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import CategoryIcon from "@mui/icons-material/Category";
import { useNavigate, useParams } from "react-router-dom";
import PokemonLoadingModal from "../components/PokemonLoadingModal";
import { getTcgCardById } from "../api/tcgApi";
import type { TcgCardDetail } from "../types/tcg";

export default function TcgCardDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [card, setCard] = useState<TcgCardDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCard = async () => {
      try {
        setLoading(true);
        setError("");

        if (!id) {
          setError("No se ha indicado ninguna carta.");
          return;
        }

        const data = await getTcgCardById(id);
        setCard(data);
      } catch {
        setError("No se pudo cargar el detalle de la carta.");
      } finally {
        setLoading(false);
      }
    };

    loadCard();
  }, [id]);

  const infoChipStyles = {
    fontWeight: 900,
    backgroundColor: "#ffcb05",
    color: "#1f2937",
    border: "2px solid rgba(255,255,255,0.9)",
    boxShadow: "0 8px 18px rgba(0,0,0,0.18)",
  };

  return (
    <>
      <PokemonLoadingModal open={loading} message="Cargando carta TCG..." />

      <Box
        sx={{
          minHeight: "100vh",
          background:
            "linear-gradient(180deg, #f8fafc 0%, #eef2ff 35%, #fff7ed 100%)",
          py: { xs: 3, md: 5 },
          px: { xs: 2, md: 3, xl: 5 },
        }}
      >
        <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/tcg/cards")}
            sx={{ mb: 3, color: "#3b4cca", fontWeight: 800 }}
          >
            Volver a cartas TCG
          </Button>

          {error || !card ? (
            !loading && (
              <Alert severity="error">
                {error || "Carta no encontrada."}
              </Alert>
            )
          ) : (
            <Paper
              elevation={0}
              sx={{
                overflow: "hidden",
                borderRadius: 5,
                boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
              }}
            >
              <Box
                sx={{
                  background:
                    "linear-gradient(135deg, #ef5350 0%, #d32f2f 45%, #3b4cca 100%)",
                  color: "white",
                  p: { xs: 3, md: 5 },
                }}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "0.8fr 1.2fr" },
                    gap: 4,
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    {card.image ? (
                      <Box
                        component="img"
                        src={card.image}
                        alt={card.name}
                        sx={{
                          width: "100%",
                          maxWidth: 340,
                          borderRadius: 3,
                          filter:
                            "drop-shadow(0 18px 28px rgba(0,0,0,0.3))",
                        }}
                      />
                    ) : (
                      <StyleIcon sx={{ fontSize: 120, color: "#ffcb05" }} />
                    )}
                  </Box>

                  <Box>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 900,
                        fontSize: { xs: "2rem", md: "3rem" },
                        mb: 2,
                        textShadow: "0 3px 10px rgba(0,0,0,0.2)",
                      }}
                    >
                      {card.name}
                    </Typography>

                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                      {card.rarity && (
                        <Chip label={card.rarity} sx={infoChipStyles} />
                      )}

                      {card.category && (
                        <Chip
                          label={card.category}
                          sx={{
                            ...infoChipStyles,
                            backgroundColor: "#ffffff",
                            color: "#3b4cca",
                          }}
                        />
                      )}

                      {card.setName && (
                        <Chip
                          label={card.setName}
                          sx={{
                            ...infoChipStyles,
                            backgroundColor: "#1f2937",
                            color: "#ffffff",
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ p: { xs: 3, md: 5 } }}>
                <Typography variant="h5" sx={{ fontWeight: 900, mb: 3 }}>
                  Información de la carta
                </Typography>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                    gap: 2,
                    mb: 4,
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2.5,
                      borderRadius: 4,
                      backgroundColor: "#fff7ed",
                      border: "1px solid #fed7aa",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CollectionsBookmarkIcon sx={{ color: "#ea580c" }} />
                      <Typography sx={{ fontWeight: 900 }}>
                        Colección
                      </Typography>
                    </Box>

                    <Typography color="text.secondary" sx={{ mt: 1 }}>
                      {card.setName || "No disponible"}
                    </Typography>
                  </Paper>

                  <Paper
                    elevation={0}
                    sx={{
                      p: 2.5,
                      borderRadius: 4,
                      backgroundColor: "#eff6ff",
                      border: "1px solid #bfdbfe",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CategoryIcon sx={{ color: "#2563eb" }} />
                      <Typography sx={{ fontWeight: 900 }}>
                        Categoría
                      </Typography>
                    </Box>

                    <Typography color="text.secondary" sx={{ mt: 1 }}>
                      {card.category || "No disponible"}
                    </Typography>
                  </Paper>

                  <Paper
                    elevation={0}
                    sx={{
                      p: 2.5,
                      borderRadius: 4,
                      backgroundColor: "#f0fdf4",
                      border: "1px solid #bbf7d0",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <BrushIcon sx={{ color: "#16a34a" }} />
                      <Typography sx={{ fontWeight: 900 }}>
                        Ilustrador
                      </Typography>
                    </Box>

                    <Typography color="text.secondary" sx={{ mt: 1 }}>
                      {card.illustrator || "No disponible"}
                    </Typography>
                  </Paper>
                </Box>

                {card.types.length > 0 && (
                  <>
                    <Typography variant="h6" sx={{ fontWeight: 900, mb: 1.5 }}>
                      Tipos
                    </Typography>

                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                      {card.types.map((type) => (
                        <Chip
                          key={type}
                          label={type}
                          sx={{
                            fontWeight: 900,
                            backgroundColor: "#3b4cca",
                            color: "white",
                            border: "2px solid #ffcb05",
                          }}
                        />
                      ))}
                    </Box>
                  </>
                )}
              </Box>
            </Paper>
          )}
        </Box>
      </Box>
    </>
  );
}