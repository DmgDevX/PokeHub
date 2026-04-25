import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import StyleIcon from "@mui/icons-material/Style";
import { useNavigate } from "react-router-dom";
import type { TcgCard as TcgCardType } from "../types/tcg";

interface TcgCardProps {
  card: TcgCardType;
}

export default function TcgCard({ card }: TcgCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: 3,
        overflow: "hidden",
        border: "1.5px solid rgba(0,0,0,0.08)",
        background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
        transition: "all 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
          borderColor: "#ffcb05",
        },
      }}
    >
      <CardActionArea
        onClick={() => navigate(`/tcg/cards/${card.id}`)}
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <Box
          sx={{
            width: "100%",
            minHeight: 280,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
            background:
              "radial-gradient(circle at top, rgba(255,203,5,0.25) 0%, rgba(59,76,202,0.08) 55%, #ffffff 100%)",
          }}
        >
          {card.image ? (
            <Box
              component="img"
              src={card.image}
              alt={card.name}
              sx={{
                width: "100%",
                maxWidth: 210,
                objectFit: "contain",
                filter: "drop-shadow(0 12px 18px rgba(0,0,0,0.2))",
              }}
            />
          ) : (
            <StyleIcon sx={{ fontSize: 80, color: "#3b4cca" }} />
          )}
        </Box>

        <CardContent sx={{ width: "100%", textAlign: "center" }}>
          <Typography sx={{ fontWeight: 900, color: "#1f2937", mb: 1 }}>
            {card.name}
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 1, flexWrap: "wrap" }}>
            {card.rarity && (
              <Chip label={card.rarity} size="small" sx={{ fontWeight: 700 }} />
            )}

            {card.setName && (
              <Chip
                label={card.setName}
                size="small"
                sx={{
                  fontWeight: 700,
                  backgroundColor: "#eff6ff",
                  color: "#1d4ed8",
                }}
              />
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}