import { useEffect, useRef, useState } from "react";
import { Alert, Box, Chip, Paper, Typography } from "@mui/material";
import StyleIcon from "@mui/icons-material/Style";
import { useSearchParams } from "react-router-dom";

import TcgCard from "../components/TcgCard";
import TcgFilters from "../components/TcgFilters";
import PokemonLoadingModal from "../components/PokemonLoadingModal";

import {
  getTcgCards,
  getTcgCategories,
  getTcgRarities,
} from "../api/tcgApi";

import type { TcgCard as TcgCardType } from "../types/tcg";

export default function TcgCardsPage() {
  const [searchParams] = useSearchParams();
  const pokemonParam = searchParams.get("pokemon") || "";

  const [cards, setCards] = useState<TcgCardType[]>([]);
  const [search, setSearch] = useState(pokemonParam);
  const [rarity, setRarity] = useState("");
  const [category, setCategory] = useState("");
  const [rarities, setRarities] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");

  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setSearch(pokemonParam);
  }, [pokemonParam]);

  useEffect(() => {
    setCards([]);
    setPage(0);
    setHasMore(false);
  }, [search, rarity, category]);

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const [raritiesData, categoriesData] = await Promise.all([
          getTcgRarities(),
          getTcgCategories(),
        ]);

        setRarities(raritiesData);
        setCategories(categoriesData);
      } catch {
        console.error("Error cargando filtros TCG");
      }
    };

    loadFilters();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      try {
        if (page === 0) {
            setLoading(true);
        } else {
            setLoadingMore(true);
        }
        setError("");

        const data = await getTcgCards({
          search,
          rarity,
          category,
          page,
        });

        setCards((prev) =>
          page === 0 ? data.cards : [...prev, ...data.cards]
        );

        setHasMore(data.hasMore);
      } catch {
        setError("No se pudieron cargar las cartas TCG.");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    }, 350);

    return () => clearTimeout(timeout);
  }, [search, rarity, category, page]);

  useEffect(() => {
    if (!hasMore || loading || loadingMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { rootMargin: "350px" }
    );

    const node = loaderRef.current;
    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [hasMore, loading, loadingMore]);

  const removeSearch = () => setSearch("");
  const removeRarity = () => setRarity("");
  const removeCategory = () => setCategory("");

  const hasActiveFilters = search.trim() || rarity || category;

  return (
    <>
      <PokemonLoadingModal open={loading} message="Cargando cartas TCG..." />

      <Box
        sx={{
          minHeight: "100vh",
          background:
            "linear-gradient(180deg, #f8fafc 0%, #eef2ff 35%, #fff7ed 100%)",
          pb: 6,
        }}
      >
        <Box
          sx={{
            background:
              "linear-gradient(135deg, #ef5350 0%, #d32f2f 45%, #3b4cca 100%)",
            color: "white",
            px: { xs: 2, md: 3, xl: 5 },
            pt: { xs: 6, md: 8 },
            pb: { xs: 7, md: 9 },
            textAlign: "center",
          }}
        >
          <StyleIcon sx={{ fontSize: 42, color: "#ffcb05", mb: 1 }} />

          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              fontSize: { xs: "2rem", md: "3rem" },
              textShadow: "0 3px 10px rgba(0,0,0,0.2)",
            }}
          >
            Cartas Pokémon TCG
          </Typography>

          <Typography
            sx={{
              maxWidth: 760,
              mx: "auto",
              mt: 2,
              color: "rgba(255,255,255,0.92)",
            }}
          >
            Busca cartas, filtra por rareza o categoría y descubre el catálogo
            TCG conectado con tu Pokédex.
          </Typography>
        </Box>

        <Box
          sx={{
            mt: { xs: -4, md: -5 },
            px: { xs: 2, md: 3, xl: 5 },
            position: "relative",
            zIndex: 2,
          }}
        >
          <Box sx={{ maxWidth: "1600px", mx: "auto" }}>
            <TcgFilters
              search={search}
              rarity={rarity}
              category={category}
              rarities={rarities}
              categories={categories}
              onSearchChange={setSearch}
              onRarityChange={setRarity}
              onCategoryChange={setCategory}
            />

            {hasActiveFilters && (
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  gap: 1,
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 800 }}>
                  Filtros activos:
                </Typography>

                {search.trim() && (
                  <Chip
                    label={`Búsqueda: ${search}`}
                    onDelete={removeSearch}
                    sx={{ fontWeight: 700 }}
                  />
                )}

                {rarity && (
                  <Chip
                    label={`Rareza: ${rarity}`}
                    onDelete={removeRarity}
                    sx={{ fontWeight: 700 }}
                  />
                )}

                {category && (
                  <Chip
                    label={`Categoría: ${category}`}
                    onDelete={removeCategory}
                    sx={{ fontWeight: 700 }}
                  />
                )}
              </Box>
            )}

            <Paper
              elevation={0}
              sx={{
                mt: 3,
                p: { xs: 2.5, md: 4, xl: 5 },
                borderRadius: 5,
                backgroundColor: "rgba(255,255,255,0.94)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 900, mb: 0.5 }}>
                Catálogo de cartas
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {cards.length} cartas cargadas
              </Typography>

              {error ? (
                <Alert severity="error">{error}</Alert>
              ) : cards.length === 0 && !loading ? (
                <Alert severity="info">No se han encontrado cartas.</Alert>
              ) : (
                <>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(240px, 1fr))",
                      gap: { xs: 2, md: 3 },
                    }}
                  >
                    {cards.map((card) => (
                      <TcgCard key={card.id} card={card} />
                    ))}
                  </Box>

                  {hasMore && (
                    <Box
                      ref={loaderRef}
                      sx={{
                        height: 90,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mt: 3,
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        {loadingMore ? "Cargando más cartas..." : "Desliza para cargar más"}
                      </Typography>
                    </Box>
                  )}
                </>
              )}
            </Paper>
          </Box>
        </Box>
      </Box>
    </>
  );
}