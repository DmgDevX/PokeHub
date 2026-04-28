import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import PokemonDetailPage from "../pages/PokemonDetailPage";
import PokemonListPage from "../pages/PokemonListPage";
import TcgCardsPage from "../pages/TcgCardsPage";
import TcgCardDetailPage from "../pages/TcgCardDetailPage";
import TeamBuilderPage from "../pages/TeamBuilderPage";
import DeckBuilderPage from "../pages/DeckBuilderPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<PokemonListPage />} />
          <Route path="/pokemon/:name" element={<PokemonDetailPage />} />
          <Route path="/tcg/cards" element={<TcgCardsPage />} />
          <Route path="/tcg/cards/:id" element={<TcgCardDetailPage />} />
          <Route path="/team-builder" element={<TeamBuilderPage />} />
          <Route path="/deck-builder" element={<DeckBuilderPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}