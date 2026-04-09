import { Box, Card, CardActionArea, CardContent, Chip, Typography } from "@mui/material";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import { useNavigate } from "react-router-dom";
import type { PokemonListItem } from "../types/pokemon";

interface PokemonCardProps {
  pokemon: PokemonListItem;
}

const formatPokemonName = (name: string) =>
  name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, " ");

const formatPokemonId = (id: number) => `#${String(id).padStart(3, "0")}`;

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: 4,
        overflow: "hidden",
        border: "2px solid",
        borderColor: "rgba(0,0,0,0.08)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(248,250,252,1) 100%)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
          borderColor: "#ffcb05",
        },
      }}
    >
      <CardActionArea
        onClick={() => navigate(`/pokemon/${pokemon.name}`)}
        sx={{ height: "100%" }}
      >
        <Box
          sx={{
            position: "relative",
            minHeight: 220,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 2,
            py: 3,
            background:
              "radial-gradient(circle at top, rgba(255,203,5,0.35) 0%, rgba(59,76,202,0.08) 45%, rgba(255,255,255,1) 100%)",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 14,
              left: 14,
            }}
          >
            <Chip
              icon={<CatchingPokemonIcon />}
              label={formatPokemonId(pokemon.id)}
              size="small"
              sx={{
                fontWeight: 700,
                backgroundColor: "#ffcb05",
                color: "#1f2937",
              }}
            />
          </Box>

          <Box
            component="img"
            src={pokemon.image}
            alt={pokemon.name}
            sx={{
              width: "100%",
              maxWidth: 180,
              height: 180,
              objectFit: "contain",
              filter: "drop-shadow(0 12px 20px rgba(0,0,0,0.18))",
            }}
          />
        </Box>

        <CardContent sx={{ px: 2.5, py: 2.5 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              color: "#1f2937",
              textAlign: "center",
              letterSpacing: 0.3,
              mb: 1,
            }}
          >
            {formatPokemonName(pokemon.name)}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              color: "text.secondary",
              fontWeight: 500,
            }}
          >
            Pulsa para ver detalles, habilidades y movimientos
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}