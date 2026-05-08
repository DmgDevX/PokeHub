import type { ReactNode } from "react";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import PsychologyIcon from "@mui/icons-material/Psychology";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import type { AiAnalysisResponse } from "../../types/ai";

interface AiAnalysisPanelProps {
  analysis: AiAnalysisResponse | null;
  loading: boolean;
  error?: string;
}

export default function AiAnalysisPanel({
  analysis,
  loading,
  error,
}: AiAnalysisPanelProps) {
  if (!loading && !error && !analysis) {
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
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 900 }}>
                {analysis?.title ?? "Análisis con IA"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Gemini analiza los datos actuales y genera recomendaciones.
              </Typography>
            </Box>
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
                  Generando análisis estratégico...
                </Typography>
              </Stack>
            </Paper>
          )}

          {error && <Alert severity="error">{error}</Alert>}

          {!loading && analysis && (
            <Stack spacing={2}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  border: "1px solid #e2e8f0",
                  backgroundColor: "white",
                }}
              >
                <Typography sx={{ fontWeight: 900, mb: 0.5 }}>
                  Resumen
                </Typography>
                <Typography color="text.secondary">{analysis.summary}</Typography>
              </Paper>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "repeat(3, minmax(0, 1fr))",
                  },
                  gap: 2,
                }}
              >
                <AiListBlock
                  title="Puntos fuertes"
                  icon={<CheckCircleIcon sx={{ color: "#16a34a" }} />}
                  items={analysis.strengths}
                  emptyText="No se detectaron puntos fuertes claros."
                />

                <AiListBlock
                  title="Debilidades"
                  icon={<WarningAmberIcon sx={{ color: "#f59e0b" }} />}
                  items={analysis.weaknesses}
                  emptyText="No se detectaron debilidades claras."
                />

                <AiListBlock
                  title="Riesgos"
                  icon={<WarningAmberIcon sx={{ color: "#ef4444" }} />}
                  items={analysis.risks}
                  emptyText="No se detectaron riesgos importantes."
                />
              </Box>

              {analysis.recommendations.length > 0 && (
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    border: "1px solid #e2e8f0",
                    backgroundColor: "white",
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: "center", mb: 1.5 }}
                  >
                    <TipsAndUpdatesIcon sx={{ color: "#3b4cca" }} />
                    <Typography sx={{ fontWeight: 900 }}>
                      Recomendaciones
                    </Typography>
                  </Stack>

                  <Stack spacing={1.5}>
                    {analysis.recommendations.map((recommendation, index) => (
                      <Box
                        key={`${recommendation.name}-${index}`}
                        sx={{
                          p: 1.5,
                          borderRadius: 3,
                          backgroundColor: "#f8fafc",
                          border: "1px solid #e2e8f0",
                        }}
                      >
                        <Stack
                          direction={{ xs: "column", sm: "row" }}
                          spacing={1}
                          sx={{
                            justifyContent: "space-between",
                            alignItems: { xs: "flex-start", sm: "center" },
                            mb: 0.8,
                          }}
                        >
                          <Typography sx={{ fontWeight: 900 }}>
                            {recommendation.name}
                          </Typography>
                          <Chip
                            label={recommendation.role}
                            size="small"
                            sx={{
                              fontWeight: 800,
                              backgroundColor: "#ffcb05",
                              color: "#1f2937",
                            }}
                          />
                        </Stack>

                        <Typography variant="body2" color="text.secondary">
                          {recommendation.reason}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Paper>
              )}
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

interface AiListBlockProps {
  title: string;
  icon: ReactNode;
  items: string[];
  emptyText: string;
}

function AiListBlock({ title, icon, items, emptyText }: AiListBlockProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 3,
        border: "1px solid #e2e8f0",
        backgroundColor: "white",
        minHeight: 150,
      }}
    >
      <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 1 }}>
        {icon}
        <Typography sx={{ fontWeight: 900 }}>{title}</Typography>
      </Stack>

      <Divider sx={{ mb: 1 }} />

      <Stack spacing={0.8}>
        {(items.length > 0 ? items : [emptyText]).map((item, index) => (
          <Typography
            key={`${title}-${index}`}
            variant="body2"
            color="text.secondary"
          >
            • {item}
          </Typography>
        ))}
      </Stack>
    </Paper>
  );
}
