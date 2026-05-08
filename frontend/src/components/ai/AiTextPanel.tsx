import {
  Alert,
  Card,
  CardContent,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import PsychologyIcon from "@mui/icons-material/Psychology";
import type { AiTextResponse } from "../../types/ai";

interface AiTextPanelProps {
  response: AiTextResponse | null;
  loading: boolean;
  error?: string;
}

export default function AiTextPanel({ response, loading, error }: AiTextPanelProps) {
  if (!loading && !error && !response) {
    return null;
  }

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid rgba(59,76,202,0.22)",
        background:
          "linear-gradient(135deg, rgba(59,76,202,0.08), rgba(255,203,5,0.18))",
      }}
    >
      <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1.2} sx={{ alignItems: "center" }}>
            <PsychologyIcon sx={{ color: "#3b4cca", fontSize: 30 }} />
            <Typography variant="h6" sx={{ fontWeight: 900 }}>
              {response?.title ?? "Explicación con IA"}
            </Typography>
          </Stack>

          {loading && (
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 3,
                border: "1px solid #e2e8f0",
                backgroundColor: "rgba(255,255,255,0.8)",
              }}
            >
              <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                <CircularProgress size={22} />
                <Typography color="text.secondary">
                  Generando explicación de los spawns...
                </Typography>
              </Stack>
            </Paper>
          )}

          {error && <Alert severity="error">{error}</Alert>}

          {!loading && response && (
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 3,
                border: "1px solid #e2e8f0",
                backgroundColor: "white",
              }}
            >
              <Typography color="text.secondary">{response.explanation}</Typography>
            </Paper>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
