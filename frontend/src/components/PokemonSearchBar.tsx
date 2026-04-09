import { Box, TextField } from "@mui/material";

interface PokemonSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function PokemonSearchBar({
  value,
  onChange,
}: PokemonSearchBarProps) {
  return (
    <Box sx={{ width: "100%" }}>
      <TextField
        fullWidth
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Busca por nombre... Ej: Pikachu"
        variant="outlined"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "999px",
            backgroundColor: "white",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            "& fieldset": {
              borderColor: "rgba(0,0,0,0.12)",
              borderWidth: "2px",
            },
            "&:hover fieldset": {
              borderColor: "#3b4cca",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#ffcb05",
            },
          },
          "& .MuiInputBase-input": {
            py: 1.6,
            px: 2,
          },
        }}
      />
    </Box>
  );
}