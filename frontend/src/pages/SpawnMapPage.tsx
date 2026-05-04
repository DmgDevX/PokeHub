import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Checkbox,
  Chip,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import TerrainIcon from "@mui/icons-material/Terrain";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AirIcon from "@mui/icons-material/Air";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import { getSpanishCities } from "../api/cityApi";
import { getWeatherByCityLocation } from "../api/weatherApi";
import { getSpawnPredictions } from "../api/spawnApi";
import type { CityMarker } from "../types/city";
import type { WeatherSnapshot } from "../types/weather";
import type { SpawnPrediction } from "../types/spawn";

const generationOptions = [
  { value: 1, label: "Generación I" },
  { value: 2, label: "Generación II" },
  { value: 3, label: "Generación III" },
  { value: 4, label: "Generación IV" },
  { value: 5, label: "Generación V" },
  { value: 6, label: "Generación VI" },
  { value: 7, label: "Generación VII" },
  { value: 8, label: "Generación VIII" },
  { value: 9, label: "Generación IX" },
];

const cityIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [28, 28],
  iconAnchor: [14, 28],
});

function getGeographicZoneLabel(zone: string) {
  const labels: Record<string, string> = {
    coast: "Costa",
    mountain: "Montaña",
    inland: "Interior",
    island: "Isla",
    north: "Norte húmedo",
    south: "Sur cálido",
    urban: "Urbana",
  };

  return labels[zone] ?? "Zona desconocida";
}

function getGeographicZoneDescription(zone: string) {
  const descriptions: Record<string, string> = {
    coast: "Favorece Pokémon de tipo agua y volador.",
    mountain: "Favorece Pokémon de tipo roca, tierra, hielo y lucha.",
    inland: "Favorece Pokémon de tipo tierra, normal y planta.",
    island: "Favorece Pokémon de tipo agua, volador y algunos dragón.",
    north: "Favorece Pokémon de tipo planta, agua, bicho e hielo.",
    south: "Favorece Pokémon de tipo fuego, tierra y roca.",
    urban: "Favorece Pokémon de tipo eléctrico, normal y veneno.",
  };

  return descriptions[zone] ?? "Zona sin modificadores especiales.";
}

function formatProbability(probability: number) {
  return `${Math.round(probability * 100)}%`;
}

export default function SpawnMapPage() {
  const [cities, setCities] = useState<CityMarker[]>([]);
  const [selectedCity, setSelectedCity] = useState<CityMarker | null>(null);
  const [weather, setWeather] = useState<WeatherSnapshot | null>(null);
  const [spawns, setSpawns] = useState<SpawnPrediction[]>([]);
  const [selectedGenerations, setSelectedGenerations] = useState<number[]>([1]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedGenerationLabels = useMemo(() => {
    return generationOptions
      .filter((generation) => selectedGenerations.includes(generation.value))
      .map((generation) => generation.label)
      .join(", ");
  }, [selectedGenerations]);

  useEffect(() => {
    const loadCities = async () => {
      try {
        setLoadingCities(true);
        setError(null);

        const data = await getSpanishCities();
        setCities(data);
      } catch {
        setError("No se pudieron cargar las ciudades españolas.");
      } finally {
        setLoadingCities(false);
      }
    };

    loadCities();
  }, []);

  useEffect(() => {
    if (!selectedCity) {
      return;
    }

    loadCityDetail(selectedCity, selectedGenerations);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGenerations]);

  const handleGenerationChange = (event: SelectChangeEvent<number[]>) => {
    const value = event.target.value;

    const generations =
      typeof value === "string" ? value.split(",").map(Number) : value;

    if (generations.length === 0) {
      return;
    }

    setSelectedGenerations(generations);
  };

  const handleCityClick = async (city: CityMarker) => {
    setSelectedCity(city);
    await loadCityDetail(city, selectedGenerations);
  };

  const loadCityDetail = async (city: CityMarker, generations: number[]) => {
    try {
      setWeather(null);
      setSpawns([]);
      setLoadingDetail(true);
      setError(null);

      const [weatherData, spawnData] = await Promise.all([
        getWeatherByCityLocation(city.name, city.latitude, city.longitude),
        getSpawnPredictions(
          city.name,
          city.latitude,
          city.longitude,
          city.geographicZone,
          generations
        ),
      ]);

      setWeather(weatherData);
      setSpawns(spawnData);
    } catch {
      setError("No se pudo obtener el clima o los Pokémon posibles.");
    } finally {
      setLoadingDetail(false);
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: "1800px",
        px: { xs: 2, md: 3, xl: 4 },
        py: { xs: 2, md: 3 },
      }}
    >
      <Stack spacing={3}>
        {/* Header */}
        <Box>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
            <PublicIcon sx={{ color: "#ef4444", fontSize: 34 }} />

            <Typography
              variant="h4"
              sx={{
                fontWeight: 900,
                fontSize: { xs: "1.7rem", md: "2.2rem" },
              }}
            >
              Simulador de spawns por clima
            </Typography>
          </Stack>

          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Selecciona una ciudad española en el mapa y descubre qué Pokémon
            podrían aparecer según el clima actual y la zona geográfica.
          </Typography>
        </Box>

        {error && <Alert severity="error">{error}</Alert>}

        {/* Filtro */}
        <Card
          sx={{
            borderRadius: 4,
            boxShadow: "0 10px 24px rgba(15, 23, 42, 0.08)",
          }}
        >
          <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
            <Stack
              direction={{ xs: "column", lg: "row" }}
              spacing={2}
              sx={{ alignItems: { xs: "stretch", lg: "center" } }}
            >
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <FilterAltIcon sx={{ color: "#3b82f6" }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 900 }}>
                    Filtro de generación
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Elige de qué generaciones quieres calcular los spawns.
                  </Typography>
                </Box>
              </Stack>

              <Box sx={{ flex: 1 }} />

              <FormControl sx={{ minWidth: { xs: "100%", lg: 340 } }}>
                <InputLabel id="generation-filter-label">
                  Generaciones
                </InputLabel>

                <Select
                  labelId="generation-filter-label"
                  multiple
                  value={selectedGenerations}
                  onChange={handleGenerationChange}
                  input={<OutlinedInput label="Generaciones" />}
                  renderValue={() => selectedGenerationLabels}
                >
                  {generationOptions.map((generation) => (
                    <MenuItem key={generation.value} value={generation.value}>
                      <Checkbox
                        checked={selectedGenerations.includes(generation.value)}
                      />
                      <ListItemText primary={generation.label} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </CardContent>
        </Card>

        {/* Layout principal: mapa | info ciudad | pokemon */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              lg: "1.35fr 0.72fr 0.88fr",
            },
            gap: 3,
            alignItems: "start",
          }}
        >
          {/* MAPA */}
          <Card
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 14px 34px rgba(15, 23, 42, 0.12)",
              height: "fit-content",
            }}
          >
            <Box
              sx={{
                height: { xs: 420, md: 560, xl: 680 },
                width: "100%",
              }}
            >
              <MapContainer
                center={[40.4168, -3.7038]}
                zoom={6}
                minZoom={5}
                maxZoom={10}
                maxBounds={[
                  [27.0, -19.5],
                  [44.5, 5.0],
                ]}
                maxBoundsViscosity={1.0}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {cities.map((city) => (
                  <Marker
                    key={`${city.name}-${city.latitude}-${city.longitude}`}
                    position={[city.latitude, city.longitude]}
                    icon={cityIcon}
                    eventHandlers={{
                      click: () => handleCityClick(city),
                    }}
                  >
                    <Popup>
                      <strong>{city.name}</strong>
                      <br />
                      {city.country}
                      <br />
                      {getGeographicZoneLabel(city.geographicZone)}
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </Box>
          </Card>

          {/* INFORMACIÓN DE LA CIUDAD */}
          <Card
            sx={{
              borderRadius: 4,
              boxShadow: "0 10px 24px rgba(15, 23, 42, 0.08)",
              height: "fit-content",
            }}
          >
            <CardContent>
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <LocationOnIcon sx={{ color: "#ef4444" }} />
                <Typography variant="h6" sx={{ fontWeight: 900 }}>
                  Ciudad seleccionada
                </Typography>
              </Stack>

              <Divider sx={{ my: 2 }} />

              {!selectedCity && !loadingDetail && (
                <Box
                  sx={{
                    borderRadius: 3,
                    backgroundColor: "#f8fafc",
                    border: "1px dashed #cbd5e1",
                    p: 3,
                    textAlign: "center",
                  }}
                >
                  <Typography sx={{ fontWeight: 800 }}>
                    Selecciona una ciudad
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    Aquí se mostrará la información de la ciudad elegida.
                  </Typography>
                </Box>
              )}

              {selectedCity && (
                <Stack spacing={2}>
                  <Box>
                    <Typography sx={{ fontWeight: 900, fontSize: "1.1rem" }}>
                      {selectedCity.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedCity.country}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      borderRadius: 3,
                      backgroundColor: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      p: 2,
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ alignItems: "center", mb: 1 }}
                    >
                      <TerrainIcon sx={{ color: "#22c55e", fontSize: 20 }} />
                      <Typography sx={{ fontWeight: 800 }}>
                        Zona geográfica
                      </Typography>
                    </Stack>

                    <Chip
                      label={getGeographicZoneLabel(selectedCity.geographicZone)}
                      color="success"
                      variant="outlined"
                      sx={{ width: "fit-content", fontWeight: 800 }}
                    />

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      {getGeographicZoneDescription(selectedCity.geographicZone)}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      borderRadius: 3,
                      backgroundColor: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      p: 2,
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ alignItems: "center", mb: 1.5 }}
                    >
                      <WbSunnyIcon sx={{ color: "#f59e0b", fontSize: 20 }} />
                      <Typography sx={{ fontWeight: 800 }}>
                        Clima actual
                      </Typography>
                    </Stack>

                    {loadingDetail && (
                      <Stack spacing={2} sx={{ alignItems: "center", py: 2.5 }}>
                        <CircularProgress size={28} />
                        <Typography color="text.secondary">
                          Cargando clima...
                        </Typography>
                      </Stack>
                    )}

                    {!loadingDetail && weather && (
                      <Stack spacing={1.3}>
                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{ alignItems: "center" }}
                        >
                          <ThermostatIcon sx={{ color: "#ef4444", fontSize: 20 }} />
                          <Typography variant="body2">
                            Temperatura: <strong>{weather.temperature} ºC</strong>
                          </Typography>
                        </Stack>

                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{ alignItems: "center" }}
                        >
                          <WaterDropIcon sx={{ color: "#3b82f6", fontSize: 18 }} />
                          <Typography variant="body2">
                            Humedad: <strong>{weather.humidity}%</strong>
                          </Typography>
                        </Stack>

                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{ alignItems: "center" }}
                        >
                          <AirIcon sx={{ color: "#64748b", fontSize: 20 }} />
                          <Typography variant="body2">
                            Viento: <strong>{weather.windSpeed} km/h</strong>
                          </Typography>
                        </Stack>

                        <Chip
                          label={weather.condition}
                          color="warning"
                          variant="outlined"
                          sx={{ width: "fit-content", fontWeight: 800, mt: 0.5 }}
                        />
                      </Stack>
                    )}
                  </Box>
                </Stack>
              )}
            </CardContent>
          </Card>

          {/* POKEMON POSIBLES */}
          <Card
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 10px 24px rgba(15, 23, 42, 0.08)",
              height: "fit-content",
            }}
          >
            <CardContent>
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <CatchingPokemonIcon sx={{ color: "#ef4444" }} />

                <Typography variant="h6" sx={{ fontWeight: 900 }}>
                  Pokémon posibles
                </Typography>
              </Stack>

              <Divider sx={{ my: 2 }} />

              {loadingDetail && (
                <Stack spacing={2} sx={{ alignItems: "center", py: 4 }}>
                  <CircularProgress size={32} />
                  <Typography color="text.secondary">
                    Calculando Pokémon posibles...
                  </Typography>
                </Stack>
              )}

              {!loadingDetail && !selectedCity && (
                <Box
                  sx={{
                    borderRadius: 3,
                    backgroundColor: "#f8fafc",
                    border: "1px dashed #cbd5e1",
                    p: 3,
                    textAlign: "center",
                  }}
                >
                  <Typography sx={{ fontWeight: 800 }}>
                    Selecciona una ciudad
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    El ranking aparecerá aquí cuando elijas una ciudad del mapa.
                  </Typography>
                </Box>
              )}

              {!loadingDetail && selectedCity && spawns.length === 0 && (
                <Box
                  sx={{
                    borderRadius: 3,
                    backgroundColor: "#f8fafc",
                    border: "1px dashed #cbd5e1",
                    p: 3,
                    textAlign: "center",
                  }}
                >
                  <Typography sx={{ fontWeight: 800 }}>
                    No hay resultados
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    Prueba cambiando la generación seleccionada.
                  </Typography>
                </Box>
              )}

              {!loadingDetail && spawns.length > 0 && (
                <Box
                  sx={{
                    maxHeight: { xs: 430, md: 560, xl: 640 },
                    overflowY: "auto",
                    pr: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,

                    scrollbarWidth: "thin",
                    scrollbarColor: "#cbd5e1 transparent",

                    "&::-webkit-scrollbar": {
                      width: 8,
                    },
                    "&::-webkit-scrollbar-track": {
                      backgroundColor: "transparent",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "#cbd5e1",
                      borderRadius: 999,
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                      backgroundColor: "#94a3b8",
                    },
                  }}
                >
                  {spawns.map((spawn, index) => {
                    const safeSpawn = spawn as SpawnPrediction & {
                      type?: string;
                    };

                    return (
                      <Box
                        key={`${safeSpawn.pokemonId ?? safeSpawn.pokemonName}-${index}`}
                        sx={{
                          border: "1px solid #e2e8f0",
                          borderRadius: 3,
                          background:
                            "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                          p: 2,
                          minHeight: 118,
                          display: "flex",
                          gap: 2,
                          alignItems: "center",
                          boxShadow: "0 4px 14px rgba(15, 23, 42, 0.06)",
                        }}
                      >
                        <Box
                          sx={{
                            width: 34,
                            height: 34,
                            borderRadius: "50%",
                            backgroundColor:
                              index === 0
                                ? "#ffcb05"
                                : index === 1
                                  ? "#e2e8f0"
                                  : index === 2
                                    ? "#fed7aa"
                                    : "#f1f5f9",
                            color: "#1f2937",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 900,
                            flexShrink: 0,
                          }}
                        >
                          {index + 1}
                        </Box>

                        <Box
                          component="img"
                          src={safeSpawn.imageUrl}
                          alt={safeSpawn.pokemonName}
                          sx={{
                            width: 76,
                            height: 76,
                            objectFit: "contain",
                            flexShrink: 0,
                          }}
                        />

                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Stack
                            direction="row"
                            spacing={1}
                            sx={{
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: 1,
                            }}
                          >
                            <Typography
                              sx={{
                                fontWeight: 900,
                                textTransform: "capitalize",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {safeSpawn.pokemonId
                                ? `#${safeSpawn.pokemonId} ${safeSpawn.pokemonName}`
                                : safeSpawn.pokemonName}
                            </Typography>

                            <Chip
                              size="small"
                              label={formatProbability(safeSpawn.probability)}
                              color="success"
                              sx={{
                                fontWeight: 900,
                                flexShrink: 0,
                              }}
                            />
                          </Stack>

                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 0.5 }}
                          >
                            {safeSpawn.reason}
                          </Typography>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>

        {loadingCities && (
          <Typography variant="body2" color="text.secondary">
            Cargando ciudades españolas...
          </Typography>
        )}
      </Stack>
    </Container>
  );
}