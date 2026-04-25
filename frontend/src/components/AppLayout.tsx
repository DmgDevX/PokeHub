import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import StyleIcon from "@mui/icons-material/Style";
import { NavLink, Outlet } from "react-router-dom";

const navButtonStyles = {
  color: "white",
  fontWeight: 800,
  borderRadius: "999px",
  px: 2,
  "&.active": {
    backgroundColor: "#ffcb05",
    color: "#1f2937",
  },
};

export default function AppLayout() {
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background:
            "linear-gradient(135deg, #ef5350 0%, #d32f2f 45%, #3b4cca 100%)",
          borderBottom: "3px solid #ffcb05",
        }}
      >
        <Container maxWidth={false}>
          <Toolbar
            disableGutters
            sx={{
              minHeight: 72,
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
              <CatchingPokemonIcon sx={{ color: "#ffcb05", fontSize: 34 }} />
              <Typography
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: "1.3rem", md: "1.6rem" },
                  letterSpacing: 0.5,
                }}
              >
                PokéHub
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Button
                component={NavLink}
                to="/"
                end
                startIcon={<CatchingPokemonIcon />}
                sx={navButtonStyles}
              >
                Pokédex
              </Button>

              <Button
                component={NavLink}
                to="/tcg/cards"
                startIcon={<StyleIcon />}
                sx={navButtonStyles}
              >
                Cartas TCG
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Outlet />
    </Box>
  );
}