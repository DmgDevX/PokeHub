import { Backdrop, Box, Modal, Typography } from "@mui/material";

interface PokemonLoadingModalProps {
  open: boolean;
  message?: string;
}

export default function PokemonLoadingModal({
  open,
  message = "Buscando Pokémon...",
}: PokemonLoadingModalProps) {
  return (
    <Modal
      open={open}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 250,
          sx: {
            backgroundColor: "rgba(15, 23, 42, 0.55)",
            backdropFilter: "blur(4px)",
          },
        },
      }}
    >
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          display: "grid",
          placeItems: "center",
          px: 2,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 420,
            borderRadius: 5,
            overflow: "hidden",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.98) 100%)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.22)",
            border: "1px solid rgba(255,255,255,0.7)",
          }}
        >
          {/* Cabecera Poké Ball */}
          <Box
            sx={{
              height: 14,
              background:
                "linear-gradient(90deg, #ef5350 0%, #ef5350 50%, #ffffff 50%, #ffffff 100%)",
              borderBottom: "4px solid #1f2937",
            }}
          />

          {/* Contenido */}
          <Box
            sx={{
              px: { xs: 3, md: 4 },
              py: { xs: 4, md: 4.5 },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2.5,
              textAlign: "center",
            }}
          >
            {/* Poké Ball animada */}
            <Box
              sx={{
                position: "relative",
                width: 92,
                height: 92,
                display: "grid",
                placeItems: "center",

                animation:
                  "poke-spin 1.2s linear infinite, poke-float 2s ease-in-out infinite",

                "@keyframes poke-spin": {
                  "0%": { transform: "rotate(0deg)" },
                  "100%": { transform: "rotate(360deg)" },
                },

                "@keyframes poke-float": {
                  "0%": { transform: "translateY(0px)" },
                  "50%": { transform: "translateY(-6px)" },
                  "100%": { transform: "translateY(0px)" },
                },
              }}
            >
              {/* Parte principal */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(180deg, #ef5350 0%, #ef5350 49%, #ffffff 49%, #ffffff 100%)",
                  border: "6px solid #1f2937",
                }}
              />

              {/* Línea central */}
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  height: 6,
                  backgroundColor: "#1f2937",
                }}
              />

              {/* Botón exterior */}
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  backgroundColor: "#ffffff",
                  border: "6px solid #1f2937",
                }}
              />

              {/* Botón interior */}
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: "#d1d5db",
                }}
              />
            </Box>

            {/* Texto */}
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 900,
                  color: "#1f2937",
                  mb: 0.5,
                }}
              >
                PokéHub
              </Typography>

              <Typography
                sx={{
                  fontWeight: 700,
                  color: "#3b4cca",
                  mb: 0.5,
                }}
              >
                {message}
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: "text.secondary" }}
              >
                Preparando la Pokédex y conectando con el mundo Pokémon...
              </Typography>
            </Box>

            {/* Barra animada */}
            <Box
              sx={{
                width: "100%",
                maxWidth: 260,
                height: 10,
                borderRadius: 999,
                backgroundColor: "#e5e7eb",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  width: "40%",
                  height: "100%",
                  borderRadius: 999,
                  background:
                    "linear-gradient(90deg, #ffcb05 0%, #f59e0b 100%)",
                  animation: "poke-loading 1.2s ease-in-out infinite",

                  "@keyframes poke-loading": {
                    "0%": { transform: "translateX(-120%)" },
                    "100%": { transform: "translateX(320%)" },
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}