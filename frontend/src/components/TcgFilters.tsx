import { Box, MenuItem, Paper, TextField } from "@mui/material";

interface TcgFiltersProps {
  search: string;
  rarity: string;
  category: string;
  rarities: string[];
  categories: string[];
  onSearchChange: (value: string) => void;
  onRarityChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

export default function TcgFilters({
  search,
  rarity,
  category,
  rarities,
  categories,
  onSearchChange,
  onRarityChange,
  onCategoryChange,
}: TcgFiltersProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 4,
        backgroundColor: "rgba(255,255,255,0.95)",
        boxShadow: "0 16px 40px rgba(0,0,0,0.08)",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "2fr 1fr 1fr" },
          gap: 2,
        }}
      >
        <TextField
          label="Buscar carta"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          fullWidth
        />

        <TextField
          select
          label="Rareza"
          value={rarity}
          onChange={(event) => onRarityChange(event.target.value)}
          fullWidth
        >
          <MenuItem value="">Todas</MenuItem>
          {rarities.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Categoría"
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
          fullWidth
        >
          <MenuItem value="">Todas</MenuItem>
          {categories.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Paper>
  );
}