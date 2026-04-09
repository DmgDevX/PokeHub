import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import { useNavigate } from "react-router-dom";
import type { PokemonListItem } from "../types/pokemon";

interface PokemonCardProps {
  pokemon: PokemonListItem;
}

const formatPokemonName = (name: string) =>
  name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, " ");

const formatPokemonId = (id: number) =>
  `#${String(id).padStart(3, "0")}`;

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: 3,
        overflow: "hidden",
        border: "1.5px solid",
        borderColor: "rgba(0,0,0,0.08)",
        background:
          "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
        transition: "all 0.2s ease",
        display: "flex",
        flexDirection: "column",

        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
          borderColor: "#ffcb05",
        },
      }}
    >
      <CardActionArea
        onClick={() => navigate(`/pokemon/${pokemon.name}`)}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          height: "100%",
        }}
      >
        {/* IMAGEN */}
        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 1.5,
            py: 2,
            background:
              "radial-gradient(circle at top, rgba(255,203,5,0.3) 0%, rgba(59,76,202,0.05) 50%, #ffffff 100%)",
          }}
        >
          {/* ID */}
          <Chip
            icon={<CatchingPokemonIcon />}
            label={formatPokemonId(pokemon.id)}
            size="small"
            sx={{
              position: "absolute",
              top: 10,
              left: 10,
              fontWeight: 700,
              backgroundColor: "#ffcb05",
              color: "#1f2937",
              height: 24,
            }}
          />

          {/* Imagen */}
          <Box
            component="img"
            src={pokemon.image}
            alt={pokemon.name}
            sx={{
              width: "100%",
              maxWidth: { xs: 130, sm: 140, xl: 150 },
              height: { xs: 130, sm: 140, xl: 150 },
              objectFit: "contain",
              filter: "drop-shadow(0 10px 16px rgba(0,0,0,0.18))",
            }}
          />
        </Box>

        {/* CONTENIDO */}
        <CardContent
          sx={{
            px: 2,
            py: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 0.5,
          }}
        >
          <Typography
            sx={{
              fontWeight: 800,
              color: "#1f2937",
              textAlign: "center",
              fontSize: { xs: "1rem", xl: "1.1rem" },
              lineHeight: 1.2,
            }}
          >
            {formatPokemonName(pokemon.name)}
          </Typography>

          <Typography
            sx={{
              textAlign: "center",
              color: "text.secondary",
              fontWeight: 500,
              fontSize: "0.8rem",
              lineHeight: 1.2,
            }}
          >
            Ver detalles
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}